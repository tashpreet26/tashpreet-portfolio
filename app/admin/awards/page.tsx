import type { Metadata } from "next";
import ItemList, { type AdminListItem } from "@/components/admin/item-list";
import { deleteAwardAction, duplicateAwardAction } from "@/lib/actions";
import { getAwards } from "@/lib/db";

export const metadata: Metadata = { title: "Awards — Admin", robots: { index: false } };

export default async function AdminAwardsPage() {
  const awards = await getAwards();

  const items: AdminListItem[] = awards.map((a) => ({
    id: a.id,
    title: a.title,
    meta: [a.organization, a.year].filter(Boolean).join(" — ") || "Award",
    status: a.status,
    updatedAt: a.updatedAt,
    previewHref: a.status === "published" ? "/awards" : undefined,
  }));

  return (
    <ItemList
      title="Awards"
      count={awards.length}
      newHref="/admin/awards/new"
      newLabel="New award"
      editHref={(id) => `/admin/awards/${id}/edit`}
      duplicateAction={duplicateAwardAction}
      deleteAction={deleteAwardAction}
      items={items}
    />
  );
}
