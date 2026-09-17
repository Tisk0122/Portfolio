"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { t } = useLanguage();
  const [whoami, setWhoami] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] py-10">
      <Container className="flex flex-col gap-5">
        <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-[var(--fg-muted)] sm:flex-row sm:text-left">
          <p>
            © {year} Taisuke Tokuda (Tisk). {t.footer.rights}
          </p>
          <p>{t.footer.builtWith}</p>
        </div>

        {/* Terminal easter egg: `> whoami` */}
        <div className="flex flex-col items-center text-center">
          <button
            type="button"
            onClick={() => setWhoami((open) => !open)}
            aria-expanded={whoami}
            className="font-mono text-xs text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            <span className="text-[var(--accent)]">$</span> whoami
          </button>
          <AnimatePresence initial={false}>
            {whoami && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="mt-2 font-mono text-xs text-[var(--fg-muted)]"
              >
                tisk: {t.footer.whoamiAns}
              </motion.p>
            )}
          </AnimatePresence>
          <span className="sr-only" role="status" aria-live="polite">
            {whoami ? t.footer.whoamiAns : ""}
          </span>
        </div>
      </Container>
    </footer>
  );
}