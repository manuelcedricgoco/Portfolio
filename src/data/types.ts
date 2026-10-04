export const PROJECT_FILTERS = ['All', 'Web', 'Management Systems', 'Monitoring Systems', 'Academic Projects'] as const;

export type ProjectFilter = (typeof PROJECT_FILTERS)[number];
export type ProjectCategory = Exclude<ProjectFilter, 'All'>;

/** Which wireframe the screenshot placeholder draws until real screenshots are added. */
export type ProjectVisualKind = 'dashboard' | 'events' | 'map';

export type Project = {
  /** URL segment and screenshot folder name: /projects/<slug> ↔ src/assets/images/projects/<slug>/ */
  slug: string;
  shortTitle: string;
  title: string;
  /** Short project type shown on cards, e.g. "Management System" */
  type: string;
  visual: ProjectVisualKind;
  /** One-sentence description used on the project card */
  summary: string;
  /** Longer description used at the top of the case study */
  overview: string;
  categories: ProjectCategory[];
  technologies: string[];
  /** Three short points shown on the card */
  highlights: string[];
  /** Full feature list shown in the case study */
  features: string[];
  /** Only list security practices that the repository actually implements */
  security?: string[];
  problem: string;
  solution: string;
  role: string;
  challenges: string[];
  learned: string[];
  github: string;
  demo?: string;
};

export type SkillIconKey = 'monitor' | 'server' | 'smartphone' | 'wrench';

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  icon: SkillIconKey;
  items: string[];
};

export type ServiceIconKey = 'globe' | 'layers' | 'layout-dashboard' | 'palette' | 'smartphone';

export type Service = {
  title: string;
  description: string;
  icon: ServiceIconKey;
  /** Project slugs that demonstrate this area */
  examples?: string[];
  /** Shown instead of examples when there is no project yet */
  status?: string;
};

export type JourneyItem = {
  period: string;
  title: string;
  description: string;
};

export type Profile = {
  name: string;
  initials: string;
  role: string;
  badge: string;
  headline: string;
  intro: string;
  closing: string;
  location: string;
  /** Public contact email. Leave empty to hide it (and the mailto flow) until you add one. */
  email: string;
  github: string;
  githubUsername: string;
  /** Full LinkedIn profile URL. Leave empty to hide it. */
  linkedin: string;
  focus: string[];
  education: {
    degree: string;
    /** Short form used in the hero code panel, e.g. "BSIT" */
    short: string;
    level: string;
    campus: string;
    status: string;
  };
  currentlyLearning: string[];
  about: {
    title: string;
    paragraphs: string[];
  };
  contact: {
    title: string;
    text: string;
  };
};
