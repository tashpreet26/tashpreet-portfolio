import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import SectionHeading from "@/components/section-heading";
import EmptyState from "@/components/empty-state";
import { getEducation, getResearch, getSettings } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — The person behind the questions",
  description:
    "Tashpreet Kaur is a young researcher from Bhopal, India, at the beginning of her academic journey. This is the story so far.",
};

export default async function AboutPage() {
  const [settings, education, research] = await Promise.all([
    getSettings(),
    getEducation(true),
    getResearch(true),
  ]);

  return (
    <>
      <PageHero number="006" title="The Person Behind the Questions" note="About">
        An honest account — a fresher at the beginning of an academic journey, building an
        archive of inquiry one question at a time.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Portrait */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="archive-grid absolute -inset-4" aria-hidden />
              <div className="relative flex aspect-[4/5] items-center justify-center border border-line bg-paper dark:bg-coal">
                {settings.portrait ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={settings.portrait}
                    alt={`Portrait of ${settings.siteTitle}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <span className="font-display text-8xl font-light text-line select-none">
                      {settings.siteTitle
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      Portrait — pending
                    </p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Fig. 003 — The archivist
              </p>
            </div>
          </Reveal>

          {/* Bio + metadata */}
          <div>
            <Reveal delay={100}>
              <p className="font-display text-2xl font-light leading-relaxed text-ink dark:text-bone md:text-3xl">
                {settings.bio}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <dl className="mt-12 divide-y divide-line border-t border-line">
                {[
                  ["Origin", SITE.location],
                  ["Status", SITE.role],
                  ["Research areas", String(research.length).padStart(2, "0")],
                  ["Education", String(education.length).padStart(2, "0")],
                ].map(([term, value]) => (
                  <div key={term} className="flex items-baseline justify-between gap-6 py-4">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                      {term}
                    </dt>
                    <dd className="text-right font-display text-lg font-light text-ink dark:text-bone">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-36">
        <SectionHeading number="007" title="Foundations" note="Education" />
        <div className="mt-16">
          {education.length === 0 ? (
            <EmptyState
              number="00"
              title="Foundations being laid"
              note="Education entries will be documented here as the academic journey unfolds."
            />
          ) : (
            <ol className="relative border-l border-line pl-8 md:pl-12">
              {education.map((entry, i) => (
                <li key={entry.id} className="relative pb-16 last:pb-0">
                  <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-ivory md:-left-[53px] dark:border-ember dark:bg-night" />
                  <Reveal delay={i * 80}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent dark:text-ember">
                      {entry.period}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-light tracking-tight text-ink dark:text-bone md:text-3xl">
                      {entry.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {entry.institution}
                    </p>
                    {entry.description && (
                      <p className="mt-4 max-w-2xl leading-relaxed text-soft dark:text-ash">
                        {entry.description}
                      </p>
                    )}
                  </Reveal>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* Skills index */}
      <section className="border-t border-line bg-paper dark:bg-coal">
        <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-36">
          <SectionHeading number="008" title="Instruments" note="Skills index" />
          <div className="mt-16">
            {settings.skills.length === 0 ? (
              <EmptyState
                number="00"
                title="The toolkit is growing"
                note="Skills will be indexed here as they are learned and practiced."
              />
            ) : (
              <ul className="divide-y divide-line border-t border-line">
                {settings.skills.map((skill, i) => (
                  <Reveal key={skill} delay={i * 40}>
                    <li className="group flex items-baseline gap-6 py-5">
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl font-light tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-3xl dark:text-bone">
                        {skill}
                      </span>
                      <span className="ml-auto h-px flex-1 bg-line opacity-0 transition-opacity group-hover:opacity-100" />
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
