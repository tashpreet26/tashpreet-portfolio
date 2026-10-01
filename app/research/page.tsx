import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import ResearchMap from "@/components/research-map";
import EmptyState from "@/components/empty-state";
import { ArrowUpRight } from "@/components/icons";
import { getResearch } from "@/lib/db";

export const metadata: Metadata = {
  title: "Research — An index of questions",
  description:
    "Research areas and open questions documented by Tashpreet Kaur — the intellectual center of the archive.",
};

export default async function ResearchPage() {
  const research = await getResearch(true);

  return (
    <>
      <PageHero number="002" title="Research" note="An index of questions">
        The intellectual center of the archive. Each area begins with a question — documented
        honestly, from the first spark of curiosity to the work still in progress.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <ResearchMap />
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
            <span>002.A</span>
            <span className="h-px flex-1 bg-line" />
            <span className="text-muted">Documented areas</span>
          </div>
        </Reveal>

        <div className="mt-12">
          {research.length === 0 ? (
            <EmptyState
              number="00"
              title="The first question is forming"
              note="Research areas will be documented here as questions find their methods. Check back soon."
            />
          ) : (
            <ul className="divide-y divide-line border-t border-line">
              {research.map((area, i) => (
                <li key={area.id}>
                  <Reveal delay={i * 60}>
                    <Link
                      href={`/research/${area.slug}`}
                      className="group grid items-baseline gap-2 py-8 md:grid-cols-[80px_1fr_auto] md:gap-8"
                    >
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-display text-2xl font-light tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-4xl dark:text-bone">
                          {area.title}
                        </span>
                        <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-muted">
                          {area.question}
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
    </>
  );
}
