"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error" | "not-configured";
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Handles the contact form submission.
 *
 * - Validates input server-side (never trust the client alone).
 * - Rejects the submission silently-successfully if the honeypot field was
 *   filled in (a bot tell), without leaking that detection to the client.
 * - Sends via Resend if RESEND_API_KEY + CONTACT_TO_EMAIL are configured.
 *   If they aren't, returns "not-configured" so the UI can fall back to a
 *   plain mailto link instead of pretending the message was sent.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("company") ?? "").trim();

  // Bots that fill every field will trip the honeypot. Report success
  // without actually sending anything, so we don't tip them off.
  if (honeypot) {
    return { status: "success" };
  }

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "invalid";
  if (!message || message.length < 5) fieldErrors.message = "required";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  if (!apiKey || !toEmail) {
    // No mail service wired up — let the UI fall back to mailto.
    return { status: "not-configured" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return { status: "error" };
    }

    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
