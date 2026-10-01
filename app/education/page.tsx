import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import EmptyState from "@/components/empty-state";
import { getEducation } from "@/lib/db";

export const metadata: Metadata = {
  title: "Education — Foundations",
  description:
    "The academic foundations of Tashpreet Kaur — degrees, institutions, and the training that shaped her methods.",
};

export default async function EducationPage() {
  const education = await getEducation(true);

  return (
    <>
      <PageHero number="008" title="Education" note="Foundations">
        The training that shaped the methods. Degrees and institutions, documented as they
        are earned.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
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
                  <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-ink dark:text-bone md:text-3xl">
                    {entry.title}
                  </h2>
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
      </section>
    </>
  );
}
