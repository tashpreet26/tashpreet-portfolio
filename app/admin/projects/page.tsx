import type { Metadata } from "next";
import Link from "next/link";
import ItemList, { type AdminListItem } from "@/components/admin/item-list";
import { deleteProjectAction, duplicateProjectAction } from "@/lib/actions";
import { getProjects } from "@/lib/db";

export const metadata: Metadata = { title: "Projects — Admin", robots: { index: false } };

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  const items: AdminListItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    meta: [p.researchArea, p.year].filter(Boolean).join(" — ") || "Project",
    status: p.status,
    updatedAt: p.updatedAt,
    previewHref: p.status === "published" ? `/projects/${p.slug}` : undefined,
  }));

  return (
    <ItemList
      title="Projects"
      count={projects.length}
      newHref="/admin/projects/new"
      newLabel="New project"
      editHref={(id) => `/admin/projects/${id}/edit`}
      duplicateAction={duplicateProjectAction}
      deleteAction={deleteProjectAction}
      items={items}
    />
  );
}
