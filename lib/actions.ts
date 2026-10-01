"use server";

import { promises as fs } from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as db from "./db";
import * as auth from "./auth";
import type { Link, Settings } from "./types";

async function requireAdmin(): Promise<void> {
  const ok = await auth.getSession();
  if (!ok) redirect("/admin/login");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function strArray(formData: FormData, key: string): string[] {
  const raw = str(formData, key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
  } catch {
    /* fall through */
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function linkArray(formData: FormData, key: string): Link[] {
  const raw = str(formData, key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (l): l is Link =>
          l && typeof l.label === "string" && typeof l.url === "string"
      );
    }
  } catch {
    /* fall through */
  }
  return [];
}

/* -------------------------------- Auth -------------------------------- */

export type AuthState = { error: string | null };

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const password = str(formData, "password");
  const settings = await db.getSettings();
  const ok = await auth.verifyPassword(password, settings.passwordHash);
  if (!ok) {
    return { error: "Incorrect password. The archive remains sealed." };
  }
  await auth.setSessionCookie();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await auth.clearSessionCookie();
  redirect("/admin/login");
}

/* ------------------------------ Projects ------------------------------ */

export type SaveState = { ok: boolean; error?: string | null; slug?: string };

export async function saveProjectAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return { ok: false, error: "A title is required." };
  const status = str(formData, "status") === "published" ? "published" : "draft";
  const slug =
    str(formData, "slug") || db.slugify(title);
  const orderRaw = Number(str(formData, "order"));
  const project = await db.saveProject({
    id: id || undefined,
    slug,
    title,
    status,
    year: str(formData, "year"),
    role: str(formData, "role"),
    researchArea: str(formData, "researchArea"),
    summary: str(formData, "summary"),
    problem: str(formData, "problem"),
    method: str(formData, "method"),
    results: str(formData, "results"),
    learnings: str(formData, "learnings"),
    technologies: strArray(formData, "technologies"),
    image: str(formData, "image"),
    links: linkArray(formData, "links"),
    publicationIds: strArray(formData, "publicationIds"),
    order: Number.isFinite(orderRaw) ? orderRaw : 999,
  });
  revalidatePath("/", "layout");
  return { ok: true, slug: project.slug };
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.deleteProject(id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/projects");
}

export async function duplicateProjectAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.duplicateProject(id);
  revalidatePath("/admin/projects");
}

/* ------------------------------ Research ------------------------------ */

export async function saveResearchAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return { ok: false, error: "A title is required." };
  const status = str(formData, "status") === "published" ? "published" : "draft";
  const slug = str(formData, "slug") || db.slugify(title);
  const orderRaw = Number(str(formData, "order"));
  const research = await db.saveResearch({
    id: id || undefined,
    slug,
    title,
    status,
    question: str(formData, "question"),
    whyItMatters: str(formData, "whyItMatters"),
    approach: str(formData, "approach"),
    work: str(formData, "work"),
    results: str(formData, "results"),
    learnings: str(formData, "learnings"),
    projectIds: strArray(formData, "projectIds"),
    publicationIds: strArray(formData, "publicationIds"),
    order: Number.isFinite(orderRaw) ? orderRaw : 999,
  });
  revalidatePath("/", "layout");
  return { ok: true, slug: research.slug };
}

export async function deleteResearchAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.deleteResearch(id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/research");
}

export async function duplicateResearchAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.duplicateResearch(id);
  revalidatePath("/admin/research");
}

/* ---------------------------- Publications ---------------------------- */

export async function savePublicationAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return { ok: false, error: "A title is required." };
  const status = str(formData, "status") === "published" ? "published" : "draft";
  const slug = str(formData, "slug") || db.slugify(title);
  const publication = await db.savePublication({
    id: id || undefined,
    slug,
    title,
    status,
    year: str(formData, "year"),
    venue: str(formData, "venue"),
    authors: strArray(formData, "authors"),
    abstract: str(formData, "abstract"),
    doi: str(formData, "doi"),
    researchIds: strArray(formData, "researchIds"),
    projectIds: strArray(formData, "projectIds"),
  });
  revalidatePath("/", "layout");
  return { ok: true, slug: publication.slug };
}

export async function deletePublicationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.deletePublication(id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/publications");
}

export async function duplicatePublicationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.duplicatePublication(id);
  revalidatePath("/admin/publications");
}

/* ------------------------------- Awards ------------------------------- */

export async function saveAwardAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return { ok: false, error: "A title is required." };
  const status = str(formData, "status") === "published" ? "published" : "draft";
  const slug = str(formData, "slug") || db.slugify(title);
  const award = await db.saveAward({
    id: id || undefined,
    slug,
    title,
    status,
    year: str(formData, "year"),
    organization: str(formData, "organization"),
    description: str(formData, "description"),
    relatedWork: str(formData, "relatedWork"),
  });
  revalidatePath("/", "layout");
  return { ok: true, slug: award.slug };
}

export async function deleteAwardAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.deleteAward(id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/awards");
}

export async function duplicateAwardAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.duplicateAward(id);
  revalidatePath("/admin/awards");
}

/* ----------------------------- Education ------------------------------ */

export async function saveEducationAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const id = str(formData, "id");
  const title = str(formData, "title");
  if (!title) return { ok: false, error: "A title is required." };
  const status = str(formData, "status") === "published" ? "published" : "draft";
  const slug = str(formData, "slug") || db.slugify(title);
  const orderRaw = Number(str(formData, "order"));
  const education = await db.saveEducation({
    id: id || undefined,
    slug,
    title,
    status,
    institution: str(formData, "institution"),
    period: str(formData, "period"),
    description: str(formData, "description"),
    order: Number.isFinite(orderRaw) ? orderRaw : 999,
  });
  revalidatePath("/", "layout");
  return { ok: true, slug: education.slug };
}

export async function deleteEducationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (id) await db.deleteEducation(id);
  revalidatePath("/", "layout");
  revalidatePath("/admin/education");
}

export async function duplicateEducationAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  const db_ = await db.readDB();
  const source = db_.education.find((e) => e.id === id);
  if (!source) return;
  const now = new Date().toISOString();
  db_.education.push({
    ...source,
    id: db.uid(),
    title: `${source.title} (copy)`,
    slug: db.slugify(`${source.title}-copy`),
    status: "draft",
    createdAt: now,
    updatedAt: now,
  });
  await db.writeDB(db_);
  revalidatePath("/admin/education");
}

/* ------------------------------ Settings ------------------------------ */

export async function saveSettingsAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const current = await db.getSettings();
  const next: Settings = {
    siteTitle: str(formData, "siteTitle") || current.siteTitle,
    tagline: str(formData, "tagline"),
    email: str(formData, "email"),
    location: str(formData, "location"),
    bio: str(formData, "bio"),
    portrait: str(formData, "portrait"),
    skills: strArray(formData, "skills"),
    socials: linkArray(formData, "socials"),
    passwordHash: current.passwordHash,
  };
  await db.saveSettings(next);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function changePasswordAction(
  _prev: SaveState,
  formData: FormData
): Promise<SaveState> {
  await requireAdmin();
  const currentPassword = str(formData, "currentPassword");
  const newPassword = str(formData, "newPassword");
  const confirm = str(formData, "confirmPassword");
  const settings = await db.getSettings();
  const currentOk = await auth.verifyPassword(currentPassword, settings.passwordHash);
  if (!currentOk) return { ok: false, error: "Current password is incorrect." };
  if (newPassword.length < 8) return { ok: false, error: "New password must be at least 8 characters." };
  if (newPassword !== confirm) return { ok: false, error: "New passwords do not match." };
  await db.saveSettings({ ...settings, passwordHash: auth.hashPassword(newPassword) });
  return { ok: true };
}

/* ------------------------------- Media -------------------------------- */

export type UploadState = { url: string | null; error: string | null };

const ALLOWED_EXTENSIONS = [
  ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg",
  ".pdf", ".mp4", ".webm", ".doc", ".docx", ".txt",
];
const MAX_SIZE = 25 * 1024 * 1024; // 25MB

export async function uploadMediaAction(
  _prev: UploadState,
  formData: FormData
): Promise<UploadState> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { url: null, error: "No file provided." };
  }
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { url: null, error: "Unsupported file type." };
  }
  if (file.size > MAX_SIZE) {
    return { url: null, error: "File too large (max 25MB)." };
  }
  const id = db.uid();
  const safeName = `${id}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, safeName), buffer);
  await db.saveMediaItem({
    id,
    name: file.name,
    url: `/uploads/${safeName}`,
    type: file.type || "application/octet-stream",
    size: file.size,
    uploadedAt: new Date().toISOString(),
  });
  revalidatePath("/admin/media");
  return { url: `/uploads/${safeName}`, error: null };
}

export async function deleteMediaAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = str(formData, "id");
  if (!id) return;
  const media = await db.getMedia();
  const item = media.find((m) => m.id === id);
  if (item) {
    const filePath = path.join(process.cwd(), "public", item.url);
    await fs.unlink(filePath).catch(() => undefined);
  }
  await db.deleteMediaItem(id);
  revalidatePath("/admin/media");
}

/* --------------------- Status-specific save actions --------------------- */

function withStatus(
  action: (prev: SaveState, formData: FormData) => Promise<SaveState>,
  status: "draft" | "published"
) {
  return async (prev: SaveState, formData: FormData): Promise<SaveState> => {
    formData.set("status", status);
    return action(prev, formData);
  };
}

export const saveProjectDraftAction = withStatus(saveProjectAction, "draft");
export const saveProjectPublishAction = withStatus(saveProjectAction, "published");

export const saveResearchDraftAction = withStatus(saveResearchAction, "draft");
export const saveResearchPublishAction = withStatus(saveResearchAction, "published");

export const savePublicationDraftAction = withStatus(savePublicationAction, "draft");
export const savePublicationPublishAction = withStatus(savePublicationAction, "published");

export const saveAwardDraftAction = withStatus(saveAwardAction, "draft");
export const saveAwardPublishAction = withStatus(saveAwardAction, "published");

export const saveEducationDraftAction = withStatus(saveEducationAction, "draft");
export const saveEducationPublishAction = withStatus(saveEducationAction, "published");
