import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import PrintButton from "@/components/admin/print-button";
import { getAwards, getEducation, getProjects, getPublications, getResearch, getSettings } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV — Curriculum Vitae",
  description:
    "The curriculum vitae of Tashpreet Kaur — a designed document of her academic journey so far.",
};

export default async function CVPage() {
  const [settings, education, research, projects, publications, awards] = await Promise.all([
    getSettings(),
    getEducation(true),
    getResearch(true),
    getProjects(true),
    getPublications(true),
    getAwards(true),
  ]);

  return (
    <>
      <PageHero number="009" title="Curriculum Vitae" note="The document">
        A complete record of the journey so far — designed to be read, printed, and shared.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <div className="no-print mb-10 flex justify-end">
            <PrintButton />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="border border-line bg-paper p-8 md:p-14 dark:bg-coal">
            {/* Header */}
            <header className="border-b border-line pb-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Curriculum Vitae
              </p>
              <h2 className="mt-4 font-display text-4xl font-light tracking-tight text-ink dark:text-bone md:text-5xl">
                {settings.siteTitle}
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-muted">
                {SITE.role} — {settings.location || SITE.location}
              </p>
              {settings.email && (
                <p className="mt-4 font-mono text-xs tracking-[0.1em] text-soft dark:text-ash">
                  {settings.email}
                </p>
              )}
            </header>

            {/* Profile */}
            <section className="border-b border-line py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Profile
              </h3>
              <p className="mt-4 max-w-3xl leading-relaxed text-soft dark:text-ash">
                {settings.bio}
              </p>
            </section>

            {/* Education */}
            <section className="border-b border-line py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Education
              </h3>
              {education.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted">To be documented.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {education.map((e) => (
                    <li key={e.id}>
                      <p className="font-display text-lg font-light text-ink dark:text-bone">
                        {e.title} — <span className="text-muted">{e.institution}</span>
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        {e.period}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Research */}
            <section className="border-b border-line py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Research Interests
              </h3>
              {research.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted">To be documented.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {research.map((r) => (
                    <li key={r.id}>
                      <p className="font-display text-lg font-light text-ink dark:text-bone">{r.title}</p>
                      {r.question && <p className="text-sm text-muted">{r.question}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Projects */}
            <section className="border-b border-line py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Projects
              </h3>
              {projects.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted">To be documented.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {projects.map((p) => (
                    <li key={p.id}>
                      <p className="font-display text-lg font-light text-ink dark:text-bone">
                        {p.title} <span className="font-mono text-[11px] text-muted">{p.year}</span>
                      </p>
                      <p className="text-sm text-muted">{p.summary}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Publications */}
            <section className="border-b border-line py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Publications
              </h3>
              {publications.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted">To be documented.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {publications.map((p) => (
                    <li key={p.id}>
                      <p className="font-display text-lg font-light text-ink dark:text-bone">{p.title}</p>
                      <p className="text-sm text-muted">
                        {p.authors.join(", ")} — {p.venue}, {p.year}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Awards */}
            <section className="border-b border-line py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Awards
              </h3>
              {awards.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted">To be documented.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {awards.map((a) => (
                    <li key={a.id}>
                      <p className="font-display text-lg font-light text-ink dark:text-bone">
                        {a.title} <span className="font-mono text-[11px] text-muted">{a.year}</span>
                      </p>
                      <p className="text-sm text-muted">{a.organization}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Skills */}
            <section className="py-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
                Skills
              </h3>
              {settings.skills.length === 0 ? (
                <p className="mt-4 text-sm italic text-muted">To be documented.</p>
              ) : (
                <p className="mt-4 leading-relaxed text-soft dark:text-ash">
                  {settings.skills.join("  ·  ")}
                </p>
              )}
            </section>

            <footer className="border-t border-line pt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              The Archive of Inquiry — {settings.siteTitle} — MMXXVI
            </footer>
          </div>
        </Reveal>
      </section>
    </>
  );
}
