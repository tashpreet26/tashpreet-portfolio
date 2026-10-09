import Link from "next/link";

/** Home — the closing invitation, doors into /contact. */
export default function CtaBand() {
  return (
    <section
      data-nav-theme="dark"
      className="relative bg-burgundy px-5 pt-[13vh] pb-[13vh] text-bone md:px-8"
    >
      <div className="flex items-start justify-between micro">
        <span>03 — Contact</span>
        <span className="text-right opacity-70">Replies within a day, usually</span>
      </div>

      <h2 className="mt-12">
        <span
          data-reveal
          className="block font-serif text-[clamp(1.5rem,3.6vw,3rem)] italic leading-tight text-bone/85"
        >
          Got something worth making?
        </span>
        <span
          data-reveal
          style={{ "--d": "0.08s" } as React.CSSProperties}
          className="mt-4 block font-display text-[clamp(3.6rem,15vw,13.5rem)] uppercase leading-[0.82] tighter"
        >
          Let&apos;s talk
        </span>
      </h2>

      <div className="mt-[8vh] flex flex-wrap items-end justify-between gap-6 border-t border-bone/25 pt-6">
        <a
          href="mailto:hello@tashpreetkaur.studio"
          data-cursor="OPEN"
          className="font-serif text-[clamp(1.3rem,3vw,2.6rem)] italic underline decoration-[0.05em] underline-offset-[0.2em] transition-colors hover:text-acid"
        >
          hello@tashpreetkaur.studio
        </a>
        <Link
          href="/contact"
          transitionTypes={["nav-forward"]}
          data-cursor="GO"
          className="micro inline-flex items-center gap-2 border border-bone/40 px-5 py-3 font-bold transition-colors hover:bg-bone hover:text-ink"
        >
          Full contact screen <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
