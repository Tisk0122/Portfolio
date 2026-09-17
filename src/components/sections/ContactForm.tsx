"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/Button";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

/**
 * A contact form with no third-party mail service and no API key required.
 * On submit it validates the fields, then hands off to a `mailto:` link
 * pre-filled with the name/email/message, opening the visitor's own mail
 * client. This is honest about what it does — it's not a silent server-side
 * send, so there's nothing to be "not configured".
 */
export function ContactForm({ fallbackEmail }: { fallbackEmail?: string }) {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sent, setSent] = useState(false);

  if (!fallbackEmail) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = String(new FormData(form).get("name") ?? "").trim();
    const email = String(new FormData(form).get("email") ?? "").trim();
    const message = String(new FormData(form).get("message") ?? "").trim();

    const nextErrors: FieldErrors = {
      name: !name,
      email: !email || !EMAIL_RE.test(email),
      message: !message || message.length < 5,
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const subject = `Portfolio contact from ${name}`;
    const body = `${message}\n\n---\nFrom: ${name} <${email}>`;
    const mailtoUrl = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    setSent(true);
    formRef.current?.reset();
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left"
    >
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[var(--fg-muted)]">
            {t.contact.formName}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={errors.name}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          />
          {errors.name ? <p className="mt-1 text-xs text-red-400">{t.contact.formNameRequired}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[var(--fg-muted)]">
            {t.contact.formEmail}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={errors.email}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          />
          {errors.email ? <p className="mt-1 text-xs text-red-400">{t.contact.formEmailInvalid}</p> : null}
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-[var(--fg-muted)]">
            {t.contact.formMessage}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            aria-invalid={errors.message}
            className="w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
          />
          {errors.message ? (
            <p className="mt-1 text-xs text-red-400">{t.contact.formMessageRequired}</p>
          ) : null}
        </div>

        <Button type="submit" className="mt-1 w-full">
          <Send size={16} aria-hidden="true" />
          {t.contact.formSubmit}
        </Button>

        {sent ? (
          <p role="status" className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
            <CheckCircle2 size={14} className="text-[var(--accent)]" aria-hidden="true" />
            {t.contact.formSuccess}
          </p>
        ) : null}
      </div>
    </form>
  );
}
