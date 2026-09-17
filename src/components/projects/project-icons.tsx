import { Sparkles, JapaneseYen, Palette, ShieldHalf, type LucideIcon } from "lucide-react";
import type { Project } from "@/lib/types";

export const PROJECT_ICONS: Record<Project["symbol"], LucideIcon> = {
  sparkle: Sparkles,
  yen: JapaneseYen,
  palette: Palette,
  shield: ShieldHalf,
};
