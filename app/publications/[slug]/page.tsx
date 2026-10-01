import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import { ArrowLeft, ExternalIcon } from "@/components/icons";
import { getProjectById, getPublicationBySlug, getPublications, getResearchById } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const publications = await getPublications(false);
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug, false);
  if (!publication) return { title: "Publication — Not found" };
  return {
    title: `${publication.title} — Publication`,
    description: publication.abstract,
  };
}

export default async function PublicationDetailPage({ params }: Props) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);
  if (!publication) notFound();

  const [allPublications, projects, researchList] = await Promise.all([
    getPublications(true),
    Promise.all(publication.projectIds.map((id) => getProjectById(id))),
    Promise.all(publication.researchIds.map((id) => getResearchById(id))),
  ]);

  const index = allPublications.findIndex((p) => p.id === publication.id);
  const number = String(index + 1).padStart(2, "0");
  const connectedProjects = projects.filter(
    (p): p is NonNullable<typeof p> => p !== undefined && p.status === "published"
  );
  const connectedResearch = researchList.filter(
    (r): r is NonNullable<typeof r> => r !== undefined && r.status === "published"
  );

  return (
    <article className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
      <Reveal>
        <Link
          href="/publications"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent dark:hover:text-ember"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All publications
        </Link>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
        <div>
          <Reveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
              Publication / {number}
              {publication.year ? ` — ${publication.year}` : ""}
            </p>
            <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-ink dark:text-bone sm:text-5xl">
              {publication.title}
            </h1>
          </Reveal>
        </div>
        <div>
          <Reveal delay={160}>
            <p className="font-mono text-sm leading-relaxed text-muted">
              {publication.venue}
            </p>
            {publication.authors.length > 0 && (
              <p className="mt-3 font-display text-xl font-light text-soft dark:text-ash">
                {publication.authors.join(" · ")}
              </p>
            )}
            {publication.doi && (
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:border-accent hover:text-accent dark:text-ash dark:hover:border-ember dark:hover:text-ember"
              >
                DOI: {publication.doi} <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            )}
          </Reveal>
        </div>
      </div>

      {publication.abstract && (
        <Reveal delay={200}>
          <div className="mt-16 border-t border-line py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
              Abstract
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-soft dark:text-ash">
              {publication.abstract}
            </p>
          </div>
        </Reveal>
      )}

      {(connectedProjects.length > 0 || connectedResearch.length > 0) && (
        <div className="border-t border-line py-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
            Related work
          </p>
          <ul className="mt-6 space-y-3">
            {connectedProjects.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group inline-flex items-center gap-3 font-display text-xl font-light text-ink dark:text-bone"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-ember" />
                  {p.title}
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Project</span>
                </Link>
              </li>
            ))}
            {connectedResearch.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/research/${r.slug}`}
                  className="group inline-flex items-center gap-3 font-display text-xl font-light text-ink dark:text-bone"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-ember" />
                  {r.title}
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Research</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
