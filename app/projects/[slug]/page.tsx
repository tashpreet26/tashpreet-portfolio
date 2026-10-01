import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import { ArrowLeft, ArrowUpRight, ExternalIcon } from "@/components/icons";
import { getProjectBySlug, getProjects, getPublicationById, getResearchById } from "@/lib/db";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects(false);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, false);
  if (!project) return { title: "Project — Not found" };
  return {
    title: `${project.title} — Project`,
    description: project.summary,
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

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const [allProjects, publicationList] = await Promise.all([
    getProjects(true),
    Promise.all(project.publicationIds.map((id) => getPublicationById(id))),
  ]);

  const index = allProjects.findIndex((p) => p.id === project.id);
  const number = String(index + 1).padStart(2, "0");
  const connectedPublications = publicationList.filter(
    (p): p is NonNullable<typeof p> => p !== undefined && p.status === "published"
  );

  const prev = index > 0 ? allProjects[index - 1] : null;
  const next = index < allProjects.length - 1 ? allProjects[index + 1] : null;

  return (
    <article className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-44">
      <Reveal>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-accent dark:hover:text-ember"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All projects
        </Link>
      </Reveal>

      <Reveal delay={80}>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
          Exhibit / {number}
          {project.year ? ` — ${project.year}` : ""}
        </p>
        <h1 className="mt-6 max-w-5xl font-display text-4xl font-light leading-[1.05] tracking-tight text-ink dark:text-bone sm:text-5xl md:text-7xl">
          {project.title}
        </h1>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
          {project.researchArea && <span>{project.researchArea}</span>}
          {project.role && <span>{project.role}</span>}
          {project.technologies.length > 0 && (
            <span className="normal-case tracking-normal">{project.technologies.join(" · ")}</span>
          )}
        </div>
      </Reveal>

      {project.image && (
        <Reveal delay={200}>
          <figure className="mt-14">
            <div className="archive-grid absolute -inset-4" aria-hidden />
            <div className="relative border border-line bg-paper dark:bg-coal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`Visual for ${project.title}`}
                className="max-h-[70vh] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Fig. {number} — {project.title}
            </figcaption>
          </figure>
        </Reveal>
      )}

      <div className="mt-16">
        <Section label="Overview">{project.summary}</Section>
        <Section label="The problem">{project.problem}</Section>
        <Section label="Method">{project.method}</Section>
        <Section label="Results">{project.results}</Section>
        <Section label="What was learned">{project.learnings}</Section>

        {project.links.length > 0 && (
          <div className="border-t border-line py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
              Links
            </p>
            <ul className="mt-6 space-y-3">
              {project.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 font-display text-xl font-light text-ink dark:text-bone"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-ember" />
                    {link.label}
                    <ExternalIcon className="h-4 w-4 text-muted transition-colors group-hover:text-accent dark:group-hover:text-ember" />
                  </a>
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

      {/* Prev / next */}
      <nav className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2" aria-label="More projects">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group bg-ivory p-8 transition-colors hover:bg-paper dark:bg-night dark:hover:bg-coal">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">← Previous exhibit</span>
            <span className="mt-3 block font-display text-2xl font-light text-ink dark:text-bone">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="group bg-ivory p-8 text-right transition-colors hover:bg-paper dark:bg-night dark:hover:bg-coal">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">Next exhibit →</span>
            <span className="mt-3 block font-display text-2xl font-light text-ink dark:text-bone">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
