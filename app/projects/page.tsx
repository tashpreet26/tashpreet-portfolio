import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import EmptyState from "@/components/empty-state";
import { ArrowUpRight } from "@/components/icons";
import { getProjects } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects — The exhibition",
  description:
    "Projects by Tashpreet Kaur, presented as a vertical exhibition of experiments and builds.",
};

export default async function ProjectsPage() {
  const projects = await getProjects(true);

  return (
    <>
      <PageHero number="003" title="Projects" note="The exhibition">
        A vertical exhibition. Each project is an exhibit — a question made tangible through
        building, testing, and documenting.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        {projects.length === 0 ? (
          <EmptyState
            number="00"
            title="The gallery is being curated"
            note="No exhibits yet. New work will be installed here as it leaves the studio."
          />
        ) : (
          <ul>
            {projects.map((project, i) => (
              <li key={project.id} className="border-t border-line last:border-b">
                <Reveal delay={80}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group relative grid gap-6 py-12 md:grid-cols-[120px_minmax(0,1fr)_auto] md:items-center md:gap-10 md:py-16"
                  >
                    <span
                      className="text-outline font-display text-6xl font-light leading-none select-none md:text-8xl"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.3em] text-accent dark:text-ember">
                        Exhibit {String(i + 1).padStart(2, "0")}
                        {project.year ? ` — ${project.year}` : ""}
                      </span>
                      <span className="mt-3 block font-display text-3xl font-light tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-5xl dark:text-bone">
                        {project.title}
                      </span>
                      <span className="mt-4 block max-w-xl leading-relaxed text-muted">
                        {project.summary}
                      </span>
                      <span className="mt-4 block font-mono text-[10px] uppercase tracking-[0.25em] text-soft dark:text-ash">
                        {project.researchArea}
                        {project.role ? ` · ${project.role}` : ""}
                      </span>
                    </span>
                    <span className="hidden h-14 w-14 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent md:flex dark:group-hover:border-ember dark:group-hover:text-ember">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
