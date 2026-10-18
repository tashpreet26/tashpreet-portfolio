import Link from "next/link";

/** Home — the one-paragraph version, a doorway into /about. */
export default function Statement() {
  return (
    <section
      data-nav-theme="dark"
      className="bg-olive px-5 pt-[13vh] pb-[12vh] text-bone md:px-8"
    >
      <div className="flex items-start justify-between micro">
        <span>01 — In short</span>
        <span className="text-right opacity-60">The one-paragraph version</span>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6">
        <h2 className="font-serif text-[clamp(1.9rem,4.4vw,4.2rem)] leading-[1.08] md:col-span-8">
          <span className="block" data-reveal>
            Tashpreet Kaur — designer &amp; art director,
          </span>
          <span
            className="block"
            data-reveal
            style={{ "--d": "0.07s" } as React.CSSProperties}
          >
            making services, product systems and design thinking
          </span>
          <span
            className="block italic"
            data-reveal
            style={{ "--d": "0.14s" } as React.CSSProperties}
          >
            that refuse to blend in.
          </span>
        </h2>

        <div className="flex flex-col justify-end gap-6 md:col-span-3 md:col-start-10">
          <div>
            <span className="micro block opacity-50">Based</span>
            <p className="mt-1 font-serif text-[1.15rem] italic">
              Bhopal, India
            </p>
          </div>
          <div>
            <span className="micro block opacity-50">Working across</span>
            <p className="mt-1 font-serif text-[1.15rem] italic">
              Service design · ERP · design thinking
            </p>
          </div>
          <Link
            href="/about"
            transitionTypes={["nav-forward"]}
            data-cursor="GO"
            className="micro inline-flex w-fit items-center gap-2 border-b border-bone/40 pb-1 font-bold transition-colors hover:border-bone"
          >
            More about Tashpreet <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
