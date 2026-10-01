import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AwardForm from "@/components/admin/award-form";
import { getAwardById } from "@/lib/db";

export const metadata: Metadata = { title: "Edit award — Admin", robots: { index: false } };

export default async function EditAwardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const award = await getAwardById(id);
  if (!award) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Awards — Edit entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        {award.title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        Last updated {new Date(award.updatedAt).toLocaleString()}
      </p>
      <div className="mt-8">
        <AwardForm award={award} />
      </div>
    </div>
  );
}
