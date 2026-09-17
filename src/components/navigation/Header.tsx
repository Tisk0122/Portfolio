"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, MotionConfig, type Variants } from "framer-motion";
import { Menu, X, Moon, Sun, Languages, ArrowUpRight, Command } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { openCommandPalette } from "@/components/navigation/CommandPalette";
import type { Dictionary } from "@/locales/dictionary";

type NavKey = keyof Dictionary["nav"] & (
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "certifications"
  | "philosophy"
  | "blog"
  | "contact"
);

const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "projects", href: "/#projects" },
  { key: "skills", href: "/#skills" },
  { key: "certifications", href: "/#certifications" },
  { key: "philosophy", href: "/#philosophy" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/#contact" },
];

// Easings used across the whole navigation for a consistent feel.
const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 320, damping: 30 } as const;

const menuListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

export function Header() {
  const { t, locale, toggleLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<NavKey>("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(drawerRef, menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // Close the mobile menu on Escape, browser back/forward, or in-page hash
  // navigation, and return focus to the button that opened it, so keyboard
  // users never lose their place.
  useEffect(() => {
    if (!menuOpen) return;

    const closeMenu = () => {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", closeMenu);
    window.addEventListener("hashchange", closeMenu);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", closeMenu);
      window.removeEventListener("hashchange", closeMenu);
    };
  }, [menuOpen]);

  // Scroll-spy: highlight whichever section is currently in view.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => {
      const selector = item.key === "home" ? "#home" : `#${item.href.split("#")[1]}`;
      return document.querySelector(selector);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const match = NAV_ITEMS.find((item) =>
              item.key === "home" ? id === "home" : item.href === `/#${id}`
            );
            if (match) setActiveKey(match.key);
          }
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (key: NavKey) => key === activeKey;

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--bg)]"
      >
        {t.common.skipToContent}
      </a>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-[var(--border)] bg-[var(--bg)]/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10"
        >
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="group flex items-center gap-1 font-mono text-lg font-semibold tracking-tight text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">{"<"}</span>
            Tisk
            <span className="text-[var(--accent)]">.</span>
            <span className="inline-block text-[var(--accent)] transition-transform duration-300 group-hover:translate-y-0.5">
              {"/>"}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.key);
              return (
                <li key={item.key} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={clsx(
                      "relative z-10 block rounded-full px-4 py-2 text-sm transition-colors",
                      active
                        ? "font-medium text-[var(--bg)]"
                        : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                    )}
                  >
                    {t.nav[item.key]}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              className="hidden h-10 items-center gap-2 rounded-full border border-[var(--border)] px-3.5 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)] md:flex"
              aria-label="Command palette"
            >
              <Command size={13} aria-hidden="true" />
              <span>K</span>
            </button>
            <button
              type="button"
              onClick={toggleLocale}
              className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
              aria-label={locale === "ja" ? t.common.english : t.common.japanese}
            >
              <Languages size={14} aria-hidden="true" />
              <span>{locale === "ja" ? "EN" : "JP"}</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
              aria-label={theme === "dark" ? t.common.lightMode : t.common.darkMode}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="flex"
                >
                  {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)] lg:hidden"
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="flex"
                >
                  {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={drawerRef}
            id="mobile-menu"
            className="fixed inset-0 z-[70] flex lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label={t.nav.close}
              onClick={() => {
                setMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.35 } },
              }}
            />

            {/* Panel — slides in and supports swipe-to-close */}
            <motion.div
              className="relative ml-auto flex h-full w-[85%] max-w-[320px] flex-col border-l border-[var(--border)] bg-[var(--bg)] shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.25 }}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x > 90 || info.velocity.x > 500) {
                  setMenuOpen(false);
                  menuButtonRef.current?.focus();
                }
              }}
            >
              <div className="flex h-16 items-center justify-between border-b border-[var(--border)] px-6">
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.4 } }}
                  className="font-mono text-lg font-semibold text-[var(--fg)]"
                >
                  Tisk<span className="text-[var(--accent)]">.</span>
                </motion.span>
                <motion.button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    menuButtonRef.current?.focus();
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  aria-label={t.nav.close}
                  autoFocus
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1, transition: { delay: 0.15, duration: 0.35, ease: EASE_OUT } }}
                >
                  <X size={18} aria-hidden="true" />
                </motion.button>
              </div>

              <motion.ul
                className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-6 py-8"
                variants={menuListVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_ITEMS.map((item, index) => {
                  const active = isActive(item.key);
                  return (
                    <motion.li key={item.key} variants={menuItemVariants} className="group">
                      <Link
                        href={item.href}
                        onClick={() => {
                          setMenuOpen(false);
                          menuButtonRef.current?.focus();
                        }}
                        className={clsx(
                          "flex items-baseline gap-4 rounded-lg px-3 py-3 transition-colors",
                          active ? "bg-[var(--accent)]/10 text-[var(--accent)]" : "text-[var(--fg)] hover:text-[var(--accent)]"
                        )}
                      >
                        <span
                          className={clsx(
                            "font-mono text-xs transition-colors",
                            active ? "text-[var(--accent)]" : "text-[var(--fg-muted)] group-hover:text-[var(--accent)]"
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-2xl font-medium tracking-tight">
                          {t.nav[item.key]}
                        </span>
                        {active && (
                          <motion.span
                            layoutId="mobile-nav-arrow"
                            transition={SPRING}
                            className="flex items-center text-[var(--accent)]"
                          >
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </motion.span>
                        )}
                      </Link>
                      <div
                        className={clsx(
                          "ml-16 h-px w-10 origin-left rounded-full bg-[var(--border)] transition-all duration-300",
                          active ? "w-16 bg-[var(--accent)]" : "group-hover:w-16 group-hover:bg-[var(--accent)]"
                        )}
                      />
                    </motion.li>
                  );
                })}
              </motion.ul>

<motion.button
                type="button"
                onClick={openCommandPalette}
                className="mx-6 mb-6 flex items-center justify-between rounded-xl border border-dashed border-[var(--border)] px-4 py-3 font-mono text-xs text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.38, duration: 0.4, ease: EASE_OUT } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <span className="flex items-center gap-2">
                  <Command size={13} aria-hidden="true" />
                  {locale === "ja" ? "クイックジャンプ" : "Quick jump"}
                </span>
                <span className="flex items-center gap-0.5 text-[10px]">
                  <kbd className="rounded border border-[var(--border)] px-1">Ctrl</kbd>
                  <kbd className="rounded border border-[var(--border)] px-1">K</kbd>
                </span>
              </motion.button>

              <motion.div
                className="flex items-center justify-between border-t border-[var(--border)] px-8 py-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.4, ease: EASE_OUT } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                <span className="font-mono text-xs text-[var(--fg-muted)]">
                  {locale === "ja" ? "© 2026 Taisuke Tokuda" : "© 2026 Taisuke Tokuda"}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--fg-muted)]" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] motion-safe:animate-pulse" />
                  <span>online</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}