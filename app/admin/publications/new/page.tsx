import type { Metadata } from "next";
import PublicationForm from "@/components/admin/publication-form";
import { getProjects, getResearch } from "@/lib/db";

export const metadata: Metadata = { title: "New publication — Admin", robots: { index: false } };

export default async function NewPublicationPage() {
  const [research, projects] = await Promise.all([getResearch(), getProjects()]);

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Publications — New entry
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        New publication
      </h1>
      <p className="mt-2 text-sm text-muted">
        Only add publications that actually exist — never fabricate entries.
      </p>
      <div className="mt-8">
        <PublicationForm publication={null} research={research} projects={projects} />
      </div>
    </div>
  );
}
