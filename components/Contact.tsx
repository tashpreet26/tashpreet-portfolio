"use client";

import { useEffect, useState } from "react";
import { contactLinks } from "@/lib/content";
import Magnetic from "./Magnetic";

const CLOSERS = ["worth remembering.", "worth replaying.", "worth the trouble."];

export default function Contact() {
  const [closer, setCloser] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setCloser((c) => (c + 1) % CLOSERS.length),
      4200,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="contact"
      data-nav-theme="dark"
      className="relative bg-ink px-5 pt-[18vh] pb-[10vh] text-bone md:px-8"
    >
      <div className="flex items-start justify-between micro">
        <span>Contact</span>
        <span className="text-right opacity-60">Last frame</span>
      </div>

      <h1 className="mt-12 md:mt-16">
        <span className="mask-line">
          <span className="rise block font-display text-[clamp(2.8rem,12.6vw,12rem)] uppercase leading-[0.85] tighter" data-reveal>
            Let&apos;s make
          </span>
        </span>
        <span className="mask-line">
          <span className="rise block font-display text-[clamp(2.8rem,12.6vw,12rem)] uppercase leading-[0.85] tighter" data-reveal style={{ "--d": "0.08s" } as React.CSSProperties}>
            something
          </span>
        </span>
        <span className="block font-serif text-[clamp(2.2rem,9.5vw,9rem)] italic leading-[1.02]" style={{ color: "var(--accent-soft)" }}>
          <span key={closer} className="rise-fade inline-block">
            {CLOSERS[closer]}
          </span>
        </span>
      </h1>

      <div className="mt-[9vh] grid gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <span className="micro opacity-50">Write to me</span>
          <Magnetic strength={0.18}>
            <a
              href="mailto:hello@tashpreetkaur.studio"
              data-cursor="OPEN"
              className="mt-3 block font-display text-[clamp(1.6rem,4.6vw,4rem)] uppercase leading-none underline decoration-[0.06em] underline-offset-[0.18em] transition-colors hover:text-sage"
            >
              hello@<br className="md:hidden" />tashpreetkaur.studio
            </a>
          </Magnetic>
          <p className="mt-6 max-w-[36ch] font-serif text-[1.15rem] italic leading-snug opacity-75">
            Briefs, half-formed ideas, exhibitions I should see, chai recommendations —
            all welcome.
          </p>
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <span className="micro opacity-50">Elsewhere</span>
          <ul className="mt-3 border-t border-bone/20">
            {contactLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="GO"
                  className="group flex items-baseline justify-between gap-4 border-b border-bone/20 py-3.5"
                >
                  <span className="micro opacity-55">{l.label}</span>
                  <span className="font-serif text-[1.05rem] transition-transform duration-500 ease-film group-hover:-translate-x-1.5">
                    {l.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[10vh] flex flex-col gap-3 border-t border-bone/20 pt-5 micro md:flex-row md:items-center md:justify-between">
        <span className="opacity-70">Write — anywhere, any hour</span>
        <span className="opacity-70">Bhopal reads mail first</span>
        <span className="opacity-70">Usually replies within a day</span>
      </div>

      <p className="mt-6 micro text-bone/25">
        you scrolled all the way down here. thank you — genuinely. say hi.
      </p>
    </section>
  );
}
