import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--bg)] hover:brightness-110 hover:-translate-y-0.5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]",
  secondary:
    "bg-transparent border border-[var(--border)] text-[var(--fg)] hover:border-[var(--accent)] hover:-translate-y-0.5",
  ghost: "bg-transparent text-[var(--fg-muted)] hover:text-[var(--fg)]",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", children, className, ...rest } = props;
  const classes = clsx(base, variants[variant], className);

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorRest } = rest as ButtonAsLink;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noreferrer noopener" {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
