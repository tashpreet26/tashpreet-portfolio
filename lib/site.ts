import type { Settings } from "./types";

export const SITE = {
  name: "Tashpreet Kaur",
  archiveTitle: "The Archive of Inquiry",
  location: "Bhopal, India",
  coordinates: "23.2599° N — 77.4126° E",
  origin: "Bhopal, India",
  role: "Fresher · Aspiring Researcher",
} as const;

export const defaultSettings: Settings = {
  siteTitle: "Tashpreet Kaur",
  tagline: "The Archive of Inquiry",
  email: "",
  location: "Bhopal, India",
  bio: "Tashpreet Kaur is a young researcher from Bhopal, India, standing at the beginning of her academic journey. This archive collects her questions, projects, and experiments as they take shape — a record of curiosity in progress.",
  portrait: "",
  skills: [],
  socials: [],
  passwordHash: "",
};

export interface NavSection {
  number: string;
  label: string;
  href: string;
  note: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { number: "001", label: "Archive", href: "/", note: "The beginning" },
  { number: "002", label: "Research", href: "/research", note: "An index of questions" },
  { number: "003", label: "Projects", href: "/projects", note: "The exhibition" },
  { number: "004", label: "Publications", href: "/publications", note: "A literary archive" },
  { number: "005", label: "Awards", href: "/awards", note: "Recognition" },
  { number: "006", label: "About", href: "/about", note: "The person behind the questions" },
  { number: "007", label: "Experience", href: "/experience", note: "The journey so far" },
  { number: "008", label: "Education", href: "/education", note: "Foundations" },
  { number: "009", label: "CV", href: "/cv", note: "Curriculum vitae" },
  { number: "010", label: "Contact", href: "/contact", note: "Correspondence" },
];
