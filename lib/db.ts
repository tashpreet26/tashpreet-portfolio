import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type {
  Award,
  DB,
  Education,
  MediaItem,
  Project,
  Publication,
  Research,
  Settings,
} from "./types";
import { defaultSettings } from "./site";

const DB_PATH = path.join(process.cwd(), "data", "db.json");

function emptyDB(): DB {
  return {
    projects: [],
    research: [],
    publications: [],
    awards: [],
    education: [],
    media: [],
    settings: defaultSettings,
  };
}

let cache: DB | null = null;
let queue: Promise<void> = Promise.resolve();

export async function readDB(): Promise<DB> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<DB>;
    cache = {
      ...emptyDB(),
      ...parsed,
      settings: { ...defaultSettings, ...(parsed.settings ?? {}) },
    };
  } catch {
    cache = emptyDB();
  }
  return cache;
}

export async function writeDB(db: DB): Promise<void> {
  cache = db;
  const snapshot = JSON.stringify(db, null, 2);
  queue = queue.then(async () => {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    const tmp = `${DB_PATH}.tmp`;
    await fs.writeFile(tmp, snapshot, "utf8");
    await fs.rename(tmp, DB_PATH);
  });
  return queue;
}

export function uid(): string {
  return crypto.randomUUID();
}

export function slugify(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
  return slug || "untitled";
}

function sortByOrder<T extends { order: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.order - b.order);
}

/* ------------------------------ Projects ------------------------------ */

export async function getProjects(publishedOnly = false): Promise<Project[]> {
  const db = await readDB();
  const items = db.projects.filter((p) => !publishedOnly || p.status === "published");
  return sortByOrder(items);
}

export async function getProjectBySlug(
  slug: string,
  publishedOnly = true
): Promise<Project | undefined> {
  const db = await readDB();
  return db.projects.find(
    (p) => p.slug === slug && (!publishedOnly || p.status === "published")
  );
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const db = await readDB();
  return db.projects.find((p) => p.id === id);
}

export async function saveProject(
  data: Omit<Project, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Project> {
  const db = await readDB();
  const now = new Date().toISOString();
  if (data.id) {
    const idx = db.projects.findIndex((p) => p.id === data.id);
    if (idx >= 0) {
      const updated: Project = { ...db.projects[idx], ...data, id: data.id, updatedAt: now };
      db.projects[idx] = updated;
      await writeDB(db);
      return updated;
    }
  }
  const project: Project = { ...data, id: uid(), createdAt: now, updatedAt: now } as Project;
  db.projects.push(project);
  await writeDB(db);
  return project;
}

export async function deleteProject(id: string): Promise<void> {
  const db = await readDB();
  db.projects = db.projects.filter((p) => p.id !== id);
  await writeDB(db);
}

export async function duplicateProject(id: string): Promise<Project | undefined> {
  const db = await readDB();
  const source = db.projects.find((p) => p.id === id);
  if (!source) return undefined;
  const now = new Date().toISOString();
  const copy: Project = {
    ...source,
    id: uid(),
    title: `${source.title} (copy)`,
    slug: slugify(`${source.title}-copy`),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  db.projects.push(copy);
  await writeDB(db);
  return copy;
}

/* ------------------------------ Research ------------------------------ */

export async function getResearch(publishedOnly = false): Promise<Research[]> {
  const db = await readDB();
  const items = db.research.filter((r) => !publishedOnly || r.status === "published");
  return sortByOrder(items);
}

export async function getResearchBySlug(
  slug: string,
  publishedOnly = true
): Promise<Research | undefined> {
  const db = await readDB();
  return db.research.find(
    (r) => r.slug === slug && (!publishedOnly || r.status === "published")
  );
}

export async function getResearchById(id: string): Promise<Research | undefined> {
  const db = await readDB();
  return db.research.find((r) => r.id === id);
}

export async function saveResearch(
  data: Omit<Research, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Research> {
  const db = await readDB();
  const now = new Date().toISOString();
  if (data.id) {
    const idx = db.research.findIndex((r) => r.id === data.id);
    if (idx >= 0) {
      const updated: Research = { ...db.research[idx], ...data, id: data.id, updatedAt: now };
      db.research[idx] = updated;
      await writeDB(db);
      return updated;
    }
  }
  const research: Research = { ...data, id: uid(), createdAt: now, updatedAt: now } as Research;
  db.research.push(research);
  await writeDB(db);
  return research;
}

export async function deleteResearch(id: string): Promise<void> {
  const db = await readDB();
  db.research = db.research.filter((r) => r.id !== id);
  await writeDB(db);
}

export async function duplicateResearch(id: string): Promise<Research | undefined> {
  const db = await readDB();
  const source = db.research.find((r) => r.id === id);
  if (!source) return undefined;
  const now = new Date().toISOString();
  const copy: Research = {
    ...source,
    id: uid(),
    title: `${source.title} (copy)`,
    slug: slugify(`${source.title}-copy`),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  db.research.push(copy);
  await writeDB(db);
  return copy;
}

/* ---------------------------- Publications ---------------------------- */

export async function getPublications(publishedOnly = false): Promise<Publication[]> {
  const db = await readDB();
  const items = db.publications.filter(
    (p) => !publishedOnly || p.status === "published"
  );
  return [...items].sort((a, b) => b.year.localeCompare(a.year));
}

export async function getPublicationBySlug(
  slug: string,
  publishedOnly = true
): Promise<Publication | undefined> {
  const db = await readDB();
  return db.publications.find(
    (p) => p.slug === slug && (!publishedOnly || p.status === "published")
  );
}

export async function getPublicationById(id: string): Promise<Publication | undefined> {
  const db = await readDB();
  return db.publications.find((p) => p.id === id);
}

export async function savePublication(
  data: Omit<Publication, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Publication> {
  const db = await readDB();
  const now = new Date().toISOString();
  if (data.id) {
    const idx = db.publications.findIndex((p) => p.id === data.id);
    if (idx >= 0) {
      const updated: Publication = {
        ...db.publications[idx],
        ...data,
        id: data.id,
        updatedAt: now,
      };
      db.publications[idx] = updated;
      await writeDB(db);
      return updated;
    }
  }
  const publication: Publication = {
    ...data,
    id: uid(),
    createdAt: now,
    updatedAt: now,
  } as Publication;
  db.publications.push(publication);
  await writeDB(db);
  return publication;
}

export async function deletePublication(id: string): Promise<void> {
  const db = await readDB();
  db.publications = db.publications.filter((p) => p.id !== id);
  await writeDB(db);
}

export async function duplicatePublication(id: string): Promise<Publication | undefined> {
  const db = await readDB();
  const source = db.publications.find((p) => p.id === id);
  if (!source) return undefined;
  const now = new Date().toISOString();
  const copy: Publication = {
    ...source,
    id: uid(),
    title: `${source.title} (copy)`,
    slug: slugify(`${source.title}-copy`),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  db.publications.push(copy);
  await writeDB(db);
  return copy;
}

/* ------------------------------- Awards ------------------------------- */

export async function getAwards(publishedOnly = false): Promise<Award[]> {
  const db = await readDB();
  const items = db.awards.filter((a) => !publishedOnly || a.status === "published");
  return [...items].sort((a, b) => b.year.localeCompare(a.year));
}

export async function getAwardBySlug(
  slug: string,
  publishedOnly = true
): Promise<Award | undefined> {
  const db = await readDB();
  return db.awards.find(
    (a) => a.slug === slug && (!publishedOnly || a.status === "published")
  );
}

export async function getAwardById(id: string): Promise<Award | undefined> {
  const db = await readDB();
  return db.awards.find((a) => a.id === id);
}

export async function saveAward(
  data: Omit<Award, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Award> {
  const db = await readDB();
  const now = new Date().toISOString();
  if (data.id) {
    const idx = db.awards.findIndex((a) => a.id === data.id);
    if (idx >= 0) {
      const updated: Award = { ...db.awards[idx], ...data, id: data.id, updatedAt: now };
      db.awards[idx] = updated;
      await writeDB(db);
      return updated;
    }
  }
  const award: Award = { ...data, id: uid(), createdAt: now, updatedAt: now } as Award;
  db.awards.push(award);
  await writeDB(db);
  return award;
}

export async function deleteAward(id: string): Promise<void> {
  const db = await readDB();
  db.awards = db.awards.filter((a) => a.id !== id);
  await writeDB(db);
}

export async function duplicateAward(id: string): Promise<Award | undefined> {
  const db = await readDB();
  const source = db.awards.find((a) => a.id === id);
  if (!source) return undefined;
  const now = new Date().toISOString();
  const copy: Award = {
    ...source,
    id: uid(),
    title: `${source.title} (copy)`,
    slug: slugify(`${source.title}-copy`),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };
  db.awards.push(copy);
  await writeDB(db);
  return copy;
}

/* ----------------------------- Education ------------------------------ */

export async function getEducation(publishedOnly = false): Promise<Education[]> {
  const db = await readDB();
  const items = db.education.filter((e) => !publishedOnly || e.status === "published");
  return sortByOrder(items);
}

export async function getEducationById(id: string): Promise<Education | undefined> {
  const db = await readDB();
  return db.education.find((e) => e.id === id);
}

export async function saveEducation(
  data: Omit<Education, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Education> {
  const db = await readDB();
  const now = new Date().toISOString();
  if (data.id) {
    const idx = db.education.findIndex((e) => e.id === data.id);
    if (idx >= 0) {
      const updated: Education = {
        ...db.education[idx],
        ...data,
        id: data.id,
        updatedAt: now,
      };
      db.education[idx] = updated;
      await writeDB(db);
      return updated;
    }
  }
  const education: Education = {
    ...data,
    id: uid(),
    createdAt: now,
    updatedAt: now,
  } as Education;
  db.education.push(education);
  await writeDB(db);
  return education;
}

export async function deleteEducation(id: string): Promise<void> {
  const db = await readDB();
  db.education = db.education.filter((e) => e.id !== id);
  await writeDB(db);
}

/* ------------------------------ Settings ------------------------------ */

export async function getSettings(): Promise<Settings> {
  const db = await readDB();
  return db.settings;
}

export async function saveSettings(settings: Settings): Promise<void> {
  const db = await readDB();
  db.settings = settings;
  await writeDB(db);
}

/* ------------------------------- Media -------------------------------- */

export async function getMedia(): Promise<MediaItem[]> {
  const db = await readDB();
  return [...db.media].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
}

export async function saveMediaItem(item: MediaItem): Promise<void> {
  const db = await readDB();
  db.media.push(item);
  await writeDB(db);
}

export async function deleteMediaItem(id: string): Promise<void> {
  const db = await readDB();
  db.media = db.media.filter((m) => m.id !== id);
  await writeDB(db);
}

/* ------------------------------- Search ------------------------------- */

export interface SearchResults {
  projects: Project[];
  research: Research[];
  publications: Publication[];
  awards: Award[];
}

export async function searchAll(query: string): Promise<SearchResults> {
  const db = await readDB();
  const q = query.toLowerCase().trim();
  if (!q) return { projects: [], research: [], publications: [], awards: [] };
  const match = (...fields: (string | undefined)[]) =>
    fields.some((f) => f && f.toLowerCase().includes(q));
  return {
    projects: db.projects.filter(
      (p) =>
        p.status === "published" &&
        match(p.title, p.summary, p.researchArea, p.role, p.problem)
    ),
    research: db.research.filter(
      (r) =>
        r.status === "published" && match(r.title, r.question, r.whyItMatters, r.approach)
    ),
    publications: db.publications.filter(
      (p) =>
        p.status === "published" && match(p.title, p.venue, p.abstract, p.authors.join(" "))
    ),
    awards: db.awards.filter(
      (a) =>
        a.status === "published" && match(a.title, a.organization, a.description)
    ),
  };
}
