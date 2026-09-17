"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Home,
  User,
  FolderGit2,
  Wrench,
  Award,
  Lightbulb,
  Newspaper,
  Mail,
  Github,
  Moon,
  Sun,
  Languages,
  Search,
  Command,
  CornerDownLeft,
  ArrowRight,
  ArrowUp,
  Copy,
  Check,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { socialLinks, contactEmail } from "@/data/social";

type ItemGroup = "navigate" | "actions" | "visit";

interface PaletteItem {
  id: string;
  group: ItemGroup;
  label: string;
  hint: string;
  keywords: string;
  icon: LucideIcon;
  run: () => void;
}

const GROUP_ORDER: ItemGroup[] = ["navigate", "visit", "actions"];

export const COMMAND_PALETTE_EVENT = "tisk:open-command-palette";

/** Open the palette from anywhere (used by the header trigger button). */
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
}

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.15 } },
};

export function CommandPalette() {
  const router = useRouter();
  const { t, locale, toggleLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const activeItemRef = useRef<HTMLLIElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, open);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Global ⌘K / Ctrl+K hotkey, plus the programmatic trigger (header button).
  useEffect(() => {
    const isTypingTarget = (target: EventTarget | null) =>
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
        return;
      }
      // `?` as a lightweight "help" shortcut to summon the palette.
      if (event.key === "?" && !isTypingTarget(event.target)) {
        event.preventDefault();
        toggle();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, onOpen);
    };
  }, [toggle]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Focus the input right after the dialog mounts/animates.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const github = socialLinks.find((link) => link.label.toLowerCase() === "github")?.url;
  const githubLabel = t.contact.github;

  const copyEmail = useCallback(async () => {
    const email = contactEmail;
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  }, []);

  const items = useMemo<PaletteItem[]>(() => {
    const nav = [
      { id: "home", label: t.nav.home, href: "/", icon: Home },
      { id: "about", label: t.nav.about, href: "/#about", icon: User },
      { id: "projects", label: t.nav.projects, href: "/#projects", icon: FolderGit2 },
      { id: "skills", label: t.nav.skills, href: "/#skills", icon: Wrench },
      { id: "certifications", label: t.nav.certifications, href: "/#certifications", icon: Award },
      { id: "philosophy", label: t.nav.philosophy, href: "/#philosophy", icon: Lightbulb },
      { id: "blog", label: t.nav.blog, href: "/blog", icon: Newspaper },
      { id: "contact", label: t.nav.contact, href: "/#contact", icon: Mail },
    ].map((item) => ({
      id: `nav-${item.id}`,
      group: "navigate" as const,
      label: item.label,
      hint: item.href.split("#")[1] ? `/#${item.href.split("#")[1]}` : "/",
      keywords: `go ${item.id} jump navigate ${item.label}`,
      icon: item.icon,
      run: () => {
        close();
        router.push(item.href);
      },
    }));

    const visit: PaletteItem[] = [];
    if (github) {
      visit.push({
        id: "github",
        group: "visit",
        label: `${githubLabel} — ${github.replace(/^https?:\/\//, "")}`,
        hint: "github",
        keywords: "github code repository source",
        icon: Github,
        run: () => {
          close();
          window.open(github, "_blank", "noopener,noreferrer");
        },
      });
    }
    if (contactEmail) {
      const email = contactEmail;
      visit.push({
        id: "email",
        group: "visit",
        label: email,
        hint: "mailto",
        keywords: "email mail contact",
        icon: Mail,
        run: () => {
          close();
          window.location.href = `mailto:${email}`;
        },
      });
    }

    const actions: PaletteItem[] = [
      {
        id: "theme",
        group: "actions" as const,
        label: theme === "dark" ? t.common.lightMode : t.common.darkMode,
        hint: "theme",
        keywords: `theme dark light ${theme === "dark" ? "light" : "dark"} appearance mode`,
        icon: theme === "dark" ? Sun : Moon,
        run: () => {
          toggleTheme();
        },
      },
      {
        id: "lang",
        group: "actions" as const,
        label: locale === "ja" ? t.common.english : t.common.japanese,
        hint: "lang",
        keywords: `language locale ${locale === "ja" ? "english en" : "japanese ja"}`,
        icon: Languages,
        run: () => {
          toggleLocale();
        },
      },
    ];

    if (contactEmail) {
      actions.push({
        id: "copy-email",
        group: "actions" as const,
        label: copiedEmail ? t.contact.emailCopied : t.contact.copy,
        hint: copiedEmail ? "copied" : "clipboard",
        keywords: "email address copy clipboard paste mail",
        icon: copiedEmail ? Check : Copy,
        run: () => {
          copyEmail();
        },
      });
    }

    actions.push({
      id: "top",
      group: "actions" as const,
      label: t.common.backToTop,
      hint: "scroll",
      keywords: "back to top scroll up top begin beginning",
      icon: ArrowUp,
      run: () => {
        close();
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      },
    });

    return [...nav, ...visit, ...actions];
  }, [t, locale, theme, github, githubLabel, copiedEmail, copyEmail, close, router, reducedMotion, toggleTheme, toggleLocale]);

  const results = useMemo<{ group: ItemGroup; items: PaletteItem[] }[]>(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
        )
      : items;
    return GROUP_ORDER.map((group) => ({
      group,
      items: filtered.filter((item) => item.group === group),
    })).filter((section) => section.items.length > 0);
  }, [items, query]);

  const flat = useMemo(() => results.flatMap((section) => section.items), [results]);

  // Clamp during render rather than in an effect so the highlighted row is
  // always in range even if the list shrinks (e.g. after filtering).
  const safeIndex = flat.length === 0 ? -1 : Math.min(activeIndex, flat.length - 1);

  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "nearest" });
  }, [safeIndex]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((safeIndex + 1) % Math.max(flat.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((safeIndex - 1 + flat.length) % Math.max(flat.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = flat[safeIndex];
      if (item) item.run();
    }
  };

  const runGroup = (group: ItemGroup): string =>
    group === "navigate" ? "Navigate" : group === "visit" ? "Visit" : "Actions";

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          ref={dialogRef}
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl"
            onKeyDown={onKeyDown}
          >
            <label className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3.5">
              <Search size={16} className="shrink-0 text-[var(--fg-muted)]" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder={reducedMotion ? "Search…" : "Type a command or search…"}
                autoComplete="off"
                spellCheck={false}
                role="combobox"
                aria-expanded="true"
                aria-controls="command-palette-list"
                aria-activedescendant={flat[safeIndex] ? `palette-item-${flat[safeIndex].id}` : undefined}
                className="w-full bg-transparent text-sm text-[var(--fg)] outline-none placeholder:text-[var(--fg-muted)]"
              />
              <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--fg-muted)] sm:flex">
                <Command size={10} aria-hidden="true" />K
              </kbd>
            </label>

            <ul
              id="command-palette-list"
              ref={listRef}
              role="listbox"
              className="max-h-[45vh] overflow-y-auto p-2"
            >
              {flat.length === 0 && (
                <li className="px-3 py-8 text-center font-mono text-sm text-[var(--fg-muted)]">
                  <span className="text-[var(--accent)]">$</span> no results for{" "}
                  <span className="text-[var(--accent)]">&ldquo;{query}&rdquo;</span>
                </li>
              )}

              {results.map((section) => (
                <li key={section.group}>
                  <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                    {runGroup(section.group)}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {section.items.map((item) => {
                      const globalIndex = flat.findIndex((f) => f.id === item.id);
                      const active = globalIndex === safeIndex;
                      const Icon = item.icon;
                      return (
                        <li key={item.id} ref={active ? activeItemRef : undefined}>
                          <button
                            type="button"
                            id={`palette-item-${item.id}`}
                            role="option"
                            aria-selected={active}
                            onClick={item.run}
                            onMouseMove={() => setActiveIndex(globalIndex)}
                            className={clsx(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                              active
                                ? "bg-[var(--accent)]/10 text-[var(--fg)]"
                                : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                            )}
                          >
                            <Icon
                              size={15}
                              className={clsx(
                                "shrink-0",
                                active ? "text-[var(--accent)]" : "text-[var(--fg-muted)]"
                              )}
                              aria-hidden="true"
                            />
                            <span className="flex-1 truncate">{item.label}</span>
                            <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-[var(--fg-muted)]">
                              {item.hint}
                              {active && <ArrowRight size={12} className="text-[var(--accent)]" />}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2 font-mono text-[10px] text-[var(--fg-muted)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={10} aria-hidden="true" />
                  open
                </span>
                <span className="flex items-center gap-1">
                  <span>&uarr;</span>
                  <span>&darr;</span>
                  navigate
                </span>
                <span>esc close</span>
              </div>
              <span className="hidden sm:inline">Tisk CLI</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}