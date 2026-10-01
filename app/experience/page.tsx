import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import { getEducation, getProjects, getResearch } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experience — The journey so far",
  description:
    "The academic journey of Tashpreet Kaur — from Bhopal to the present, told as a cinematic timeline.",
};

const CHAPTERS = [
  { id: "origin", label: "Origin", title: SITE.location, note: "Where the archive begins" },
  { id: "education", label: "Education", title: "Foundations", note: "The training years" },
  { id: "projects", label: "Projects", title: "The Exhibition", note: "Work made tangible" },
  { id: "research", label: "Research", title: "Inquiry", note: "Questions in progress" },
  { id: "next", label: "Next Chapter", title: "Unwritten", note: "The story continues" },
];

export default async function ExperiencePage() {
  const [education, projects, research] = await Promise.all([
    getEducation(true),
    getProjects(true),
    getResearch(true),
  ]);

  const counts: Record<string, number> = {
    origin: 1,
    education: education.length,
    projects: projects.length,
    research: research.length,
    next: 0,
  };

  return (
    <>
      <PageHero number="007" title="The Journey" note="Experience">
        A cinematic timeline — scroll through the chapters that make up the story so far.
        For a fresher, this is a short film. It will get longer.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <ol className="relative">
          {CHAPTERS.map((chapter, i) => (
            <li key={chapter.id} className="relative border-l border-line pb-24 pl-10 last:pb-0 md:pl-16">
              {/* Node marker */}
              <span className="absolute -left-[7px] top-2 flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-3.5 w-3.5 rounded-full border-2 border-accent bg-ivory dark:border-ember dark:bg-night" />
                {i < CHAPTERS.length - 1 && (
                  <span className="absolute left-1/2 top-3.5 h-24 w-px -translate-x-1/2 bg-line" aria-hidden />
                )}
              </span>

              <Reveal delay={i * 60}>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                  Chapter {String(i + 1).padStart(2, "0")} — {chapter.label}
                </p>
                <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-ink dark:text-bone md:text-5xl">
                  {chapter.title}
                </h2>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  {chapter.note}
                </p>
              </Reveal>

              <Reveal delay={i * 60 + 120}>
                <div className="mt-8">
                  {chapter.id === "origin" && (
                    <p className="max-w-xl leading-relaxed text-soft dark:text-ash">
                      Born in Bhopal, India. One coordinate from which everything in this
                      archive traces its origin.
                    </p>
                  )}
                  {chapter.id === "education" &&
                    (education.length === 0 ? (
                      <p className="max-w-xl leading-relaxed text-soft dark:text-ash">
                        The foundations are being laid — entries will appear here as the
                        academic journey unfolds.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {education.map((e) => (
                          <li key={e.id} className="flex flex-wrap items-baseline gap-x-6">
                            <span className="font-mono text-xs text-muted">{e.period}</span>
                            <span className="font-display text-xl font-light text-ink dark:text-bone">
                              {e.title}
                            </span>
                            <span className="text-sm text-muted">{e.institution}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  {chapter.id === "projects" &&
                    (projects.length === 0 ? (
                      <p className="max-w-xl leading-relaxed text-soft dark:text-ash">
                        The exhibition is being curated — the first install is on its way.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {projects.map((p) => (
                          <li key={p.id} className="flex flex-wrap items-baseline gap-x-6">
                            <span className="font-mono text-xs text-muted">{p.year}</span>
                            <span className="font-display text-xl font-light text-ink dark:text-bone">
                              {p.title}
                            </span>
                            <span className="text-sm text-muted">{p.researchArea}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  {chapter.id === "research" &&
                    (research.length === 0 ? (
                      <p className="max-w-xl leading-relaxed text-soft dark:text-ash">
                        The first question is forming — research areas will be documented as
                        they take shape.
                      </p>
                    ) : (
                      <ul className="space-y-4">
                        {research.map((r) => (
                          <li key={r.id} className="flex flex-wrap items-baseline gap-x-6">
                            <span className="font-display text-xl font-light text-ink dark:text-bone">
                              {r.title}
                            </span>
                            <span className="text-sm text-muted">Open question</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  {chapter.id === "next" && (
                    <p className="max-w-xl font-display text-2xl font-light italic leading-snug text-soft dark:text-ash">
                      “The next chapter is unwritten — and that is the most exciting part.”
                    </p>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 pt-28 md:px-10">
        <SectionHeading number="007.A" title="By the numbers" note="The archive at a glance" />
        <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {[
            ["Education", education.length],
            ["Projects", projects.length],
            ["Research areas", research.length],
            ["Open questions", research.length],
          ].map(([label, count]) => (
            <div key={label as string} className="bg-ivory p-8 text-center dark:bg-night">
              <p className="font-display text-5xl font-light text-ink dark:text-bone">
                {String(count).padStart(2, "0")}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
