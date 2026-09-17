import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="py-28 sm:py-36" role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <Container className="max-w-3xl">
        {/* Indeterminate progress bar tinted with the accent color */}
        <div className="mb-10 h-0.5 w-40 overflow-hidden rounded-full bg-[var(--surface)]">
          <div className="h-full w-1/2 rounded-full bg-[var(--accent)] motion-safe:animate-[loading-bar_1.1s_ease-in-out_infinite]" />
        </div>

        <div className="h-4 w-32 rounded bg-[var(--surface)]" />
        <div className="mt-10 flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-[var(--surface)] motion-safe:animate-pulse" />
          <div className="h-8 w-48 rounded bg-[var(--surface)] motion-safe:animate-pulse" />
        </div>
        <div className="mt-6 h-4 w-full rounded bg-[var(--surface)] motion-safe:animate-pulse" />
        <div className="mt-2 h-4 w-2/3 rounded bg-[var(--surface)] motion-safe:animate-pulse" />
      </Container>
    </div>
  );
}