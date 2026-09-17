export type Locale = "ja" | "en";

export type Localized<T = string> = {
  ja: T;
  en: T;
};

export type ProjectStatus = "live" | "in-development" | "coming-soon";

export interface ProjectDetailSection {
  ja: string;
  en: string;
}

export interface ProjectLinks {
  demo?: string;
  github?: string;
}

export interface Project {
  slug: string;
  order: number;
  name: string;
  tagline: Localized;
  description: Localized;
  status: ProjectStatus;
  features: Localized<string[]>;
  tech: string[];
  links: ProjectLinks;
  accentColor: string;
  symbol: "sparkle" | "yen" | "palette" | "shield";
  detail?: {
    overview?: ProjectDetailSection;
    whyIBuiltIt?: ProjectDetailSection;
    features?: ProjectDetailSection;
    technology?: ProjectDetailSection;
    design?: ProjectDetailSection;
    technicalPoints?: ProjectDetailSection;
    challenges?: ProjectDetailSection;
    privacy?: ProjectDetailSection;
    whatILearned?: ProjectDetailSection;
  };
}

export interface SkillCategory {
  id: string;
  title: Localized;
  skills: string[];
}

export interface Certification {
  name: Localized;
  status: "acquired" | "learning";
}
