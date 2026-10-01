import type { Metadata } from "next";
import ItemList, { type AdminListItem } from "@/components/admin/item-list";
import { deleteEducationAction, duplicateEducationAction } from "@/lib/actions";
import { getEducation } from "@/lib/db";

export const metadata: Metadata = { title: "Education — Admin", robots: { index: false } };

export default async function AdminEducationPage() {
  const education = await getEducation();

  const items: AdminListItem[] = education.map((e) => ({
    id: e.id,
    title: e.title,
    meta: [e.institution, e.period].filter(Boolean).join(" — ") || "Education",
    status: e.status,
    updatedAt: e.updatedAt,
    previewHref: e.status === "published" ? "/education" : undefined,
  }));

  return (
    <ItemList
      title="Education"
      count={education.length}
      newHref="/admin/education/new"
      newLabel="New education"
      editHref={(id) => `/admin/education/${id}/edit`}
      duplicateAction={duplicateEducationAction}
      deleteAction={deleteEducationAction}
      items={items}
    />
  );
}
