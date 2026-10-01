import type { Metadata } from "next";
import ItemList, { type AdminListItem } from "@/components/admin/item-list";
import { deleteResearchAction, duplicateResearchAction } from "@/lib/actions";
import { getResearch } from "@/lib/db";

export const metadata: Metadata = { title: "Research — Admin", robots: { index: false } };

export default async function AdminResearchPage() {
  const research = await getResearch();

  const items: AdminListItem[] = research.map((r) => ({
    id: r.id,
    title: r.title,
    meta: r.question ? r.question.slice(0, 60) : "Research area",
    status: r.status,
    updatedAt: r.updatedAt,
    previewHref: r.status === "published" ? `/research/${r.slug}` : undefined,
  }));

  return (
    <ItemList
      title="Research"
      count={research.length}
      newHref="/admin/research/new"
      newLabel="New research"
      editHref={(id) => `/admin/research/${id}/edit`}
      duplicateAction={duplicateResearchAction}
      deleteAction={deleteResearchAction}
      items={items}
    />
  );
}
