import type { LucideIcon } from "lucide-react";

export type SectionId = "home" | "experience" | "projects" | "tech-stack" | "contact";

export type NavItem = {
  id: SectionId;
  label: string;
};

export type HeroStat = {
  label: string;
  value: string;
};

export type ActionLink = {
  label: string;
  url: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
  disabled?: boolean;
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  focus: string[];
};

export type ProjectImage = {
  src: string;
  alt: string;
  label: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  build: string;
  architecture: string[];
  techStack: string[];
  results: string[];
  images: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  expandable?: boolean;
};

export type StackGroup = {
  title: string;
  items: string[];
};

export type PortfolioContent = {
  name: string;
  title: string;
  intro: string;
  location: string;
  availability: string;
  navItems: NavItem[];
  heroStats: HeroStat[];
  heroActions: ActionLink[];
  socialLinks: ActionLink[];
  contactActions: ActionLink[];
  experience: ExperienceItem[];
  projects: Project[];
  stackGroups: StackGroup[];
  profileImage: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
};
