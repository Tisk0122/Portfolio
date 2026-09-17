import type { Certification } from "@/lib/types";

export const certifications: Certification[] = [
  {
    name: { ja: "基本情報技術者試験", en: "Fundamental Information Technology Engineer Exam" },
    status: "acquired",
  },
  {
    name: { ja: "情報セキュリティマネジメント試験", en: "Information Security Management Exam" },
    status: "acquired",
  },
  {
    name: { ja: "応用情報技術者試験", en: "Applied Information Technology Engineer Exam" },
    status: "learning",
  },
];
