"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const bootLines = [
  "tisk@portfolio:~$ ./build --release",
  "compiling [core] [hero] [projects] [skills] ...",
  "wiring 3d-engine \u2713  loading i18n \u2713  mounting theme \u2713",
  "system ready \u2014 welcome.",
];

type Phase = "pending" | "playing" | "done";

/**
 * Brief terminal-style boot overlay shown once per session on page load.
 * Types a few lines, pauses, then fades out. Skipped entirely when the user
 * prefers reduced motion or has already seen it this session, and it never
 * blocks pointer input.
 */
export function TerminalBoot() {
  const [phase, setPhase] = useState<Phase>("pending");
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || sessionStorage.getItem("tisk-booted")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    sessionStorage.setItem("tisk-booted", "1");
    setPhase("playing");

    const timers: ReturnType<typeof setTimeout>[] = [];
    let line = 1;
    const reveal = () => {
      if (line <= bootLines.length) {
        setVisibleLines(line);
        line += 1;
        timers.push(setTimeout(reveal, 320));
      } else {
        timers.push(setTimeout(() => setPhase("done"), 420));
      }
    };
    timers.push(setTimeout(reveal, 120));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase === "playing" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[95] flex items-center justify-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          aria-hidden="true"
        >
          <pre className="max-w-full overflow-hidden px-6 font-mono text-xs leading-7 text-[var(--fg-muted)] sm:text-sm">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <span key={i} className="block overflow-hidden whitespace-nowrap">
                {line}
              </span>
            ))}
            <span className="inline-flex items-center gap-1">
              <span className="text-[var(--accent)]">$</span>
              <span className="inline-block h-[1em] w-[0.55ch] animate-[cursor-blink_1s_steps(2,start)_infinite] bg-[var(--accent)]" />
            </span>
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}