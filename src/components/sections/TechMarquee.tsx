import { skillCategories } from "@/data/skills";

const items = skillCategories.flatMap((category) => category.skills);

/**
 * A slow infinite marquee of the technology stack that sits right beneath
 * the hero. Purely decorative — frozen (static) when the user prefers
 * reduced motion.
 */
export function TechMarquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-[var(--border)] py-4"
      aria-hidden="true"
    >
      <div className="flex w-max motion-safe:animate-[marquee_32s_linear_infinite] motion-safe:hover:[animation-play-state:paused]">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((skill, i) => (
              <span
                key={`${half}-${skill}-${i}`}
                className="mx-6 flex items-center gap-6 whitespace-nowrap font-mono text-sm text-[var(--fg-muted)]"
              >
                {skill}
                <span className="text-[9px] text-[var(--accent)]/60">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Edge fade so the strip bleeds away at both sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
    </div>
  );
}