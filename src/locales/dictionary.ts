export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    certifications: string;
    philosophy: string;
    contact: string;
    menu: string;
    close: string;
  };
  hero: {
    roles: string[];
    tagline: string;
    subtagline: string;
    ctaProjects: string;
    ctaAbout: string;
    scrollHint: string;
    commandHint: string;
  };
  about: {
    title: string;
    kicker: string;
    body: string[];
    badge: string;
    statProjects: string;
    statSkills: string;
    statCerts: string;
  };
  projects: {
    title: string;
    kicker: string;
    intro: string;
    viewProject: string;
    liveDemo: string;
    viewGithub: string;
    comingSoonTitle: string;
    comingSoonBody: string;
    statusLive: string;
    statusDev: string;
    statusComingSoon: string;
    backToProjects: string;
    notFoundTitle: string;
    notFoundBody: string;
    prevProject: string;
    nextProject: string;
  };
  detail: {
    overview: string;
    whyIBuiltIt: string;
    features: string;
    technology: string;
    design: string;
    technicalPoints: string;
    challenges: string;
    privacy: string;
    whatILearned: string;
    techStack: string;
    links: string;
  };
  skills: {
    title: string;
    kicker: string;
    intro: string;
  };
  certifications: {
    title: string;
    kicker: string;
    intro: string;
    acquired: string;
    learning: string;
    learningNote: string;
  };
  philosophy: {
    title: string;
    kicker: string;
    quote: string;
    quoteSub: string;
    points: { title: string; body: string }[];
  };
  contact: {
    title: string;
    kicker: string;
    message: string;
    github: string;
    email: string;
    emailUnavailable: string;
    copy: string;
    emailCopied: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    whoamiAns: string;
  };
  common: {
    japanese: string;
    english: string;
    darkMode: string;
    lightMode: string;
    skipToContent: string;
    backToTop: string;
    pressQuestion: string;
  };
  error: {
    title: string;
    body: string;
    retry: string;
  };
}
