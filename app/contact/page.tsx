import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import Magnetic from "@/components/magnetic";
import { ArrowUpRight, MailIcon, MapPinIcon } from "@/components/icons";
import { getSettings } from "@/lib/db";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Correspondence",
  description:
    "Get in touch with Tashpreet Kaur — for research collaborations, questions, or simply to say hello.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero number="010" title="Correspondence" note="Contact">
        For research collaborations, academic inquiries, or a question worth pursuing —
        the archive is open.
      </PageHero>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-16 md:grid-cols-2">
          <Reveal delay={100}>
            <h2 className="font-display text-3xl font-light leading-snug text-ink dark:text-bone md:text-4xl">
              The best way to reach me is a{" "}
              <span className="italic text-accent dark:text-ember">good question.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-soft dark:text-ash">
              Whether it is a research idea, a collaboration, an opportunity, or feedback on
              the work in this archive — every message is read with care.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-4">
              {settings.email ? (
                <Magnetic>
                  <a
                    href={`mailto:${settings.email}`}
                    className="group flex items-center justify-between gap-4 border border-ink p-6 transition-colors hover:bg-ink dark:border-bone dark:hover:bg-bone"
                  >
                    <span>
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                        <MailIcon className="h-3.5 w-3.5" /> Email
                      </span>
                      <span className="mt-2 block font-display text-xl font-light text-ink group-hover:text-ivory dark:text-bone dark:group-hover:text-night md:text-2xl">
                        {settings.email}
                      </span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent dark:group-hover:text-ember" />
                  </a>
                </Magnetic>
              ) : (
                <div className="flex items-center justify-between gap-4 border border-dashed border-line p-6">
                  <span>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                      <MailIcon className="h-3.5 w-3.5" /> Email
                    </span>
                    <span className="mt-2 block font-display text-xl font-light text-muted">
                      Correspondence opening soon
                    </span>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4 border border-line p-6">
                <span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    <MapPinIcon className="h-3.5 w-3.5" /> Based in
                  </span>
                  <span className="mt-2 block font-display text-xl font-light text-ink dark:text-bone md:text-2xl">
                    {settings.location || SITE.location}
                  </span>
                </span>
              </div>

              {settings.socials.length > 0 && (
                <div className="border border-line p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                    Elsewhere
                  </span>
                  <ul className="mt-4 space-y-3">
                    {settings.socials.map((s) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 font-display text-lg font-light text-ink dark:text-bone"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-ember" />
                          {s.label}
                          <ArrowUpRight className="h-4 w-4 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent dark:group-hover:text-ember" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
