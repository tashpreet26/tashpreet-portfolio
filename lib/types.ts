export type Status = "draft" | "published";

export interface Link {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  status: Status;
  year: string;
  role: string;
  researchArea: string;
  summary: string;
  problem: string;
  method: string;
  results: string;
  learnings: string;
  technologies: string[];
  image: string;
  links: Link[];
  publicationIds: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Research {
  id: string;
  slug: string;
  title: string;
  status: Status;
  question: string;
  whyItMatters: string;
  approach: string;
  work: string;
  results: string;
  learnings: string;
  projectIds: string[];
  publicationIds: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Publication {
  id: string;
  slug: string;
  title: string;
  status: Status;
  year: string;
  venue: string;
  authors: string[];
  abstract: string;
  doi: string;
  researchIds: string[];
  projectIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Award {
  id: string;
  slug: string;
  title: string;
  status: Status;
  year: string;
  organization: string;
  description: string;
  relatedWork: string;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  slug: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  status: Status;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Settings {
  siteTitle: string;
  tagline: string;
  email: string;
  location: string;
  bio: string;
  portrait: string;
  skills: string[];
  socials: Link[];
  passwordHash: string;
}

export interface DB {
  projects: Project[];
  research: Research[];
  publications: Publication[];
  awards: Award[];
  education: Education[];
  media: MediaItem[];
  settings: Settings;
}
