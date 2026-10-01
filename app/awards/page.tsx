import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import EmptyState from "@/components/empty-state";
import { getAwards } from "@/lib/db";

export const metadata: Metadata = {
  title: "Awards — Recognition",
  description:
    "Awards and recognition received by Tashpreet Kaur, presented as archival artifacts.",
};

export default async function AwardsPage() {
  const awards = await getAwards(true);

  return (
    <>
      <PageHero number="005" title="Recognition" note="Awards">
        Moments when the work was acknowledged. Presented as archival artifacts — each one
        a marker of encouragement along the journey.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        {awards.length === 0 ? (
          <EmptyState
            number="00"
            title="The wall awaits its first artifact"
            note="No awards yet. When recognition finds its way here, it will be documented with care."
          />
        ) : (
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {awards.map((award, i) => (
              <li key={award.id} className="bg-ivory dark:bg-night">
                <Reveal delay={i * 80} className="h-full">
                  <article className="flex h-full flex-col p-8 md:p-10">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent dark:text-ember">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-5xl font-light text-line select-none">
                        {award.year}
                      </span>
                    </div>
                    <h2 className="mt-8 font-display text-2xl font-light tracking-tight text-ink dark:text-bone md:text-3xl">
                      {award.title}
                    </h2>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                      {award.organization}
                    </p>
                    {award.description && (
                      <p className="mt-5 leading-relaxed text-soft dark:text-ash">
                        {award.description}
                      </p>
                    )}
                    {award.relatedWork && (
                      <p className="mt-auto pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                        Related work — {award.relatedWork}
                      </p>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
