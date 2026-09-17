"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/Button";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => null,
});

/**
 * Terminal-style typewriter: cycles through a list of roles by typing,
 * pausing, deleting, then moving to the next word. Falls back to a static
 * word when the user prefers reduced motion.
 */
function Typewriter({ words }: { words: string[] }) {
  const reducedMotion = useReducedMotion();
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    // Reduced motion or a single word needs no animation — the initial
    // state already shows words[0]. The parent remounts this on locale
    // change (key), so the static case stays in sync too.
    if (reducedMotion || words.length <= 1) return;

    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = (len: number) => {
      const word = words[index % words.length];
      setText(word.slice(0, Math.max(0, len)));

      if (len < 0) {
        index += 1;
        timer = setTimeout(() => tick(0), 350);
      } else if (len === word.length) {
        timer = setTimeout(() => tick(len - 1), 1800);
      } else if (len > word.length) {
        timer = setTimeout(() => tick(len - 1), 35);
      } else {
        timer = setTimeout(() => tick(len + 1), 72);
      }
    };

    timer = setTimeout(() => tick(0), 350);
    return () => clearTimeout(timer);
  }, [words, reducedMotion]);

  return (
    <span aria-live="polite">
      {text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] rounded-[2px] bg-[var(--accent)] motion-safe:animate-[cursor-blink_1s_steps(2,start)_infinite]"
      />
    </span>
  );
}

export function Hero() {
  const { t, locale } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Fade + drift the hero text out as the user scrolls into the next section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
      </div>

      <motion.div
        style={reducedMotion ? undefined : { opacity: heroOpacity, y: heroY }}
        className="relative flex w-full max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 rounded-full border border-[var(--border)] bg-[var(--bg)]/40 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--fg-muted)] backdrop-blur-sm"
        >
          <Typewriter key={locale} words={t.hero.roles} />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-semibold tracking-tight text-[var(--fg)] sm:text-6xl"
        >
          <span className="bg-gradient-to-r from-[var(--fg)] via-[var(--accent)] to-[var(--fg)] bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[shimmer_8s_linear_infinite]">
            Taisuke Tokuda
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-1 font-mono text-xl text-[var(--accent)] sm:text-2xl"
        >
          Tisk
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36 }}
          className="mt-6 max-w-xl text-lg text-[var(--fg)] sm:text-xl"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-2 max-w-xl text-sm text-[var(--fg-muted)] sm:text-base"
        >
          {t.hero.subtagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.52 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/#projects" variant="primary">
            {t.hero.ctaProjects}
          </Button>
          <Button href="/#about" variant="secondary">
            {t.hero.ctaAbout}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-[var(--fg-muted)]"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{t.hero.scrollHint}</span>
        <ChevronDown size={16} className="motion-safe:animate-bounce" />
        <span className="mt-1 hidden items-center gap-1.5 font-mono text-[10px] text-[var(--fg-muted)] sm:flex">
          {t.hero.commandHint}
          <kbd className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 text-[9px]">
            ?
          </kbd>
        </span>
      </motion.div>
    </section>
  );
}