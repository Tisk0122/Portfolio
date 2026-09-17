"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface GithubStarsProps {
  /** Full GitHub repo URL, e.g. https://github.com/owner/repo */
  repoUrl: string;
  className?: string;
}

function parseOwnerRepo(repoUrl: string): string | null {
  try {
    const { pathname } = new URL(repoUrl);
    const [owner, repo] = pathname.replace(/^\/+/, "").split("/");
    if (!owner || !repo) return null;
    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
}

// Simple in-memory cache so navigating between pages doesn't refetch.
const starCache = new Map<string, number | null>();

/**
 * Shows a live star count pulled from the GitHub REST API at render time.
 * Fails silently (renders nothing) if the API is unreachable or rate-limited,
 * rather than showing a stale or fabricated number.
 */
export function GithubStars({ repoUrl, className }: GithubStarsProps) {
  const ownerRepo = parseOwnerRepo(repoUrl);
  const [stars, setStars] = useState<number | null>(
    ownerRepo ? (starCache.get(ownerRepo) ?? null) : null
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!ownerRepo) return;
    if (starCache.has(ownerRepo)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStars(starCache.get(ownerRepo) ?? null);
      return;
    }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${ownerRepo}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { stargazers_count?: number }) => {
        if (cancelled) return;
        const count = typeof data.stargazers_count === "number" ? data.stargazers_count : null;
        starCache.set(ownerRepo, count);
        setStars(count);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [ownerRepo]);

  if (!ownerRepo || failed || stars === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] text-[var(--fg-muted)] ${className ?? ""}`}
      title="GitHub stars"
    >
      <Star size={12} aria-hidden="true" />
      {stars.toLocaleString()}
    </span>
  );
}
