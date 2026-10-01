import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { getProjectById, getProjects, getPublicationById, getResearch, getResearchBySlug } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const research = await getResearch(false);
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const research = await getResearchBySlug(slug, false);
  if (!research) return { title: "Research — Not found" };
  return {
    title: `${research.title} — Research`,
    description: research.question || research.whyItMatters,
  };
}

function Section({ label, children }: { label: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="border-t border-line py-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        {label}
      </p>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-soft dark:text-ash">
        {children}
      </p>
    </div>
  );
}

export default async function ResearchDetailPage({ params }: Props) {
  const { slug } = await params;
  const research = await getResearchBySlug(slug);
  if (!research) notFound();

  const [allResearch, projects, publications] = await Promise.all([
    getResearch(true),
    getProjects(false),
    Promise.all(research.publicationIds.map((id) => getPublicationById(id))),
  ]);

  const index = allResearch.findIndex((r) => r.id === research.id);
  const number = String(index + 1).padStart(2, "0");
  const connectedProjects = projects.filter((p) => research.projectIds.includes(p.id));
  const connectedPublications = publications.filter(
    (p): p is NonNullable<typeof p> => p !== undefined && p.status === "published"
  );

  return (
    <article className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
      <Reveal>
        <Link
          href="/research"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent dark:hover:text-ember"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All research
        </Link>
      </Reveal>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)]">
        <div>
          <Reveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
              Research / {number}
            </p>
            <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-ink dark:text-bone sm:text-5xl md:text-6xl">
              {research.title}
            </h1>
          </Reveal>
        </div>
        <div>
          <Reveal delay={160}>
            <p className="font-display text-2xl font-light italic leading-snug text-soft dark:text-ash">
              {research.question}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16">
        <Section label="Why it matters">{research.whyItMatters}</Section>
        <Section label="The approach">{research.approach}</Section>
        <Section label="The work">{research.work}</Section>
        <Section label="Results">{research.results}</Section>
        <Section label="What I learned">{research.learnings}</Section>

        {connectedProjects.length > 0 && (
          <div className="border-t border-line py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
              Connected projects
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
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent dark:group-hover:text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {connectedPublications.length > 0 && (
          <div className="border-t border-line py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
              Related publications
            </p>
            <ul className="mt-6 space-y-3">
              {connectedPublications.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/publications/${p.slug}`}
                    className="group inline-flex items-center gap-3 font-display text-xl font-light text-ink dark:text-bone"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-ember" />
                    {p.title}
                    <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent dark:group-hover:text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
