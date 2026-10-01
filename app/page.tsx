import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import ResearchMap from "@/components/research-map";
import EmptyState from "@/components/empty-state";
import Magnetic from "@/components/magnetic";
import { ArrowUpRight, MapPinIcon } from "@/components/icons";
import { getAwards, getProjects, getPublications, getResearch, getSettings } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Archive 001 — A beginning shaped by curiosity",
  description:
    "The Archive of Inquiry — the personal archive of Tashpreet Kaur, a young researcher from Bhopal, India. Questions, projects, and experiments at the beginning of a research career.",
};

export default async function HomePage() {
  const [projects, research, publications, awards, settings] = await Promise.all([
    getProjects(true),
    getResearch(true),
    getPublications(true),
    getAwards(true),
    getSettings(),
  ]);

  const counts = {
    research: research.length,
    projects: projects.length,
    publications: publications.length,
    awards: awards.length,
  };

  return (
    <>
      <Hero counts={counts} />

      <Marquee
        items={[
          "Research",
          "Projects",
          "Questions",
          "Publications",
          "Awards",
          "Education",
          "Skills",
          "Experiments",
        ]}
      />

      {/* ------------------------- The Living Archive ------------------------- */}
      <section id="archive" className="mx-auto max-w-[1600px] scroll-mt-24 px-5 py-28 md:px-10 md:py-40">
        <SectionHeading number="002" title="The Living Archive" note="An interconnected index" />
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-soft dark:text-ash">
            Every entry in this archive is connected. A question becomes a project; a project
            becomes a publication; a publication becomes recognition. Explore the map —{" "}
            <span className="text-ink dark:text-bone">
              each node is a room in the exhibition.
            </span>
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-16">
          <ResearchMap />
        </Reveal>
      </section>

      {/* ------------------------------ Origin ------------------------------ */}
      <section className="border-y border-line bg-paper dark:bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
          <div className="grid gap-16 md:grid-cols-2 md:gap-10">
            <div>
              <SectionHeading number="00" title="Origin" note="Where it begins" />
              <Reveal delay={200}>
                <p className="mt-8 font-display text-3xl font-light leading-snug text-ink dark:text-bone md:text-4xl">
                  One point from which{" "}
                  <span className="italic text-accent dark:text-ember">the archive begins.</span>
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-6 max-w-md leading-relaxed text-soft dark:text-ash">
                  Born in Bhopal, India — a city of lakes and quiet ambition. Everything in
                  this archive traces back to that single coordinate: the questions, the
                  projects, the experiments still taking shape.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  <MapPinIcon className="h-4 w-4 text-accent dark:text-ember" />
                  {SITE.coordinates}
                </p>
              </Reveal>
            </div>

            {/* Abstract geographic visual */}
            <Reveal delay={250}>
              <div className="relative flex h-full min-h-[320px] items-center justify-center border border-line bg-ivory dark:bg-night">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full max-w-md"
                  role="img"
                  aria-label="Abstract map showing Bhopal as the origin point of the archive"
                >
                  <circle cx="110" cy="150" r="90" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 5" className="text-ink dark:text-bone" />
                  <circle cx="110" cy="150" r="55" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 5" className="text-ink dark:text-bone" />
                  <circle cx="110" cy="150" r="4" fill="var(--color-accent)" className="dark:fill-ember" />
                  <circle cx="110" cy="150" r="10" fill="none" stroke="var(--color-accent)" strokeOpacity="0.5" className="dark:stroke-ember" />
                  <path
                    d="M110 150 C 180 120, 260 130, 330 90"
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeDasharray="1 6"
                    strokeLinecap="round"
                    className="dark:stroke-ember"
                  />
                  <circle cx="330" cy="90" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" className="dark:stroke-ember" />
                  <text x="110" y="185" textAnchor="middle" className="fill-ink font-mono text-[10px] uppercase tracking-[0.3em] dark:fill-bone">
                    Bhopal
                  </text>
                  <text x="330" y="70" textAnchor="middle" className="fill-muted font-mono text-[9px] uppercase tracking-[0.25em]">
                    The journey
                  </text>
                </svg>
                <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  Fig. 002 — Origin
                </span>
                <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  Not to scale
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------- Selected works --------------------------- */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading number="003" title="Selected Works" note="From the exhibition" />
          {projects.length > 0 && (
            <Reveal delay={200}>
              <Link
                href="/projects"
                className="link-underline inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-soft hover:text-ink dark:text-ash dark:hover:text-bone"
              >
                All exhibits <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-16">
          {projects.length === 0 ? (
            <EmptyState
              number="00"
              title="The gallery is being curated"
              note="No exhibits yet. New work will appear here as it leaves the studio."
            />
          ) : (
            <ul className="divide-y divide-line border-t border-line">
              {projects.slice(0, 3).map((project, i) => (
                <li key={project.id}>
                  <Reveal delay={i * 100}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group grid items-baseline gap-2 py-8 md:grid-cols-[80px_1fr_auto] md:gap-8"
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-display text-2xl font-light tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-4xl dark:text-bone">
                          {project.title}
                        </span>
                        <span className="mt-2 block text-sm text-muted">
                          {project.researchArea}
                          {project.year ? ` — ${project.year}` : ""}
                        </span>
                      </span>
                      <ArrowUpRight className="hidden h-6 w-6 justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block dark:group-hover:text-ember" />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ------------------------------ Research ------------------------------ */}
      <section className="border-y border-line bg-paper dark:bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading number="004" title="Questions in Progress" note="Research areas" />
            {research.length > 0 && (
              <Reveal delay={200}>
                <Link
                  href="/research"
                  className="link-underline inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-soft hover:text-ink dark:text-ash dark:hover:text-bone"
                >
                  All research <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            )}
          </div>

          <div className="mt-16">
            {research.length === 0 ? (
              <EmptyState
                number="00"
                title="The inquiry is loading"
                note="Research areas will be documented here as questions find their methods."
              />
            ) : (
              <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
                {research.slice(0, 4).map((area, i) => (
                  <li key={area.id} className="bg-paper dark:bg-coal">
                    <Reveal delay={i * 80} className="h-full">
                      <Link
                        href={`/research/${area.slug}`}
                        className="group flex h-full flex-col p-8 transition-colors hover:bg-ivory dark:hover:bg-night"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent dark:text-ember">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-4 font-display text-2xl font-light tracking-tight text-ink dark:text-bone">
                          {area.title}
                        </span>
                        <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                          {area.question}
                        </span>
                        <span className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-soft group-hover:text-accent dark:text-ash dark:group-hover:text-ember">
                          Read the inquiry →
                        </span>
                      </Link>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------- What comes next --------------------------- */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
        <SectionHeading number="005" title="What Comes Next" note="The next chapter" />
        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10">
          <Reveal delay={150}>
            <p className="font-display text-3xl font-light leading-snug text-ink dark:text-bone md:text-4xl">
              This is not the story of an established career.{" "}
              <span className="italic text-accent dark:text-ember">
                This is the beginning of one.
              </span>
            </p>
            <p className="mt-8 max-w-md leading-relaxed text-soft dark:text-ash">
              The archive is young. What comes next is a set of questions looking for their
              methods — areas of study still being mapped, skills still being built, and a
              research direction that will take shape one experiment at a time.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <ul className="divide-y divide-line border-t border-line">
              {research.slice(0, 3).map((area) => (
                <li key={area.id} className="py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Open question
                  </p>
                  <p className="mt-2 font-display text-xl font-light text-ink dark:text-bone">
                    {area.question || area.title}
                  </p>
                </li>
              ))}
              <li className="py-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  The direction
                </p>
                <p className="mt-2 font-display text-xl font-light text-ink dark:text-bone">
                  From Bhopal to wherever the questions lead.
                </p>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="mt-24 flex justify-center">
            <Magnetic>
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 border border-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:bg-ink hover:text-ivory dark:border-bone dark:text-bone dark:hover:bg-bone dark:hover:text-night"
              >
                Meet the person behind the questions
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </>
  );
}
