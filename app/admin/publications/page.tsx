import type { Metadata } from "next";
import ItemList, { type AdminListItem } from "@/components/admin/item-list";
import { deletePublicationAction, duplicatePublicationAction } from "@/lib/actions";
import { getPublications } from "@/lib/db";

export const metadata: Metadata = { title: "Publications — Admin", robots: { index: false } };

export default async function AdminPublicationsPage() {
  const publications = await getPublications();

  const items: AdminListItem[] = publications.map((p) => ({
    id: p.id,
    title: p.title,
    meta: [p.venue, p.year].filter(Boolean).join(" — ") || "Publication",
    status: p.status,
    updatedAt: p.updatedAt,
    previewHref: p.status === "published" ? `/publications/${p.slug}` : undefined,
  }));

  return (
    <ItemList
      title="Publications"
      count={publications.length}
      newHref="/admin/publications/new"
      newLabel="New publication"
      editHref={(id) => `/admin/publications/${id}/edit`}
      duplicateAction={duplicatePublicationAction}
      deleteAction={deletePublicationAction}
      items={items}
    />
  );
}
