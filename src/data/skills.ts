import type { SkillCategory } from "@/lib/types";

/**
 * Only list skills you actually have real experience with.
 * Edit freely — this list drives both the Skills section and the
 * floating skill nodes in the 3D scene.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: { ja: "フロントエンド", en: "Frontend" },
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    id: "programming",
    title: { ja: "プログラミング言語", en: "Programming" },
    skills: ["Python", "Java", "C", "C++", "Swift", "SwiftUI"],
  },
  {
    id: "backend",
    title: { ja: "バックエンド / インフラ", en: "Backend / Infrastructure" },
    skills: ["Node.js", "Firebase", "SQL", "Vercel", "API"],
  },
  {
    id: "development",
    title: { ja: "開発環境", en: "Development" },
    skills: ["Git", "GitHub", "Linux"],
  },
  {
    id: "creative",
    title: { ja: "3D / クリエイティブ", en: "3D / Creative" },
    skills: ["Three.js", "WebGL", "React Three Fiber"],
  },
];
