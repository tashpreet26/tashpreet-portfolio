import { paletteSwatches } from "@/lib/content";
import ProjectArt from "./ProjectArt";

export default function Bhopal() {
  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-olive px-5 pt-[13vh] pb-[12vh] text-bone md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden>
        <ProjectArt variant="contour" bg="#4d5730" fg="#e9e3d6" accent="#100e0c" seed={12} />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between micro">
          <span>03 — Origin</span>
          <span className="text-right opacity-70">Not a tourist brochure</span>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-6">
          <h2 className="md:col-span-7">
            <span className="expd block font-sans text-[clamp(2.3rem,8vw,7.4rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
              <span data-reveal>Made somewhere</span>
            </span>
            <span className="expd block font-sans text-[clamp(2.3rem,8vw,7.4rem)] font-black uppercase leading-[0.9] tracking-[-0.035em]">
              <span data-reveal style={{ "--d": "0.08s" } as React.CSSProperties}>
                between chaos
              </span>
            </span>
            <span className="block font-serif text-[clamp(2.4rem,8vw,7.4rem)] italic leading-[1] text-bone">
              <span data-reveal style={{ "--d": "0.16s" } as React.CSSProperties}>
                &amp; calm.
              </span>
            </span>
          </h2>

          <div className="md:col-span-4 md:col-start-9">
            <p
              data-reveal
              className="max-w-[42ch] text-[clamp(1rem,1.2vw,1.15rem)] leading-relaxed text-bone/90"
            >
              Bhopal doesn&apos;t hand you a style. It gives you contrasts — lake light
              against concrete, Urdu signage over hand-painted shutters, a city that is
              loud and low-key at once. I let it in slowly: in the grids, in the grain, in
              knowing when to leave a thing alone.
            </p>
            <p className="mt-6 micro opacity-70">23.2599° N — 77.4126° E · IST (UTC+5:30)</p>
          </div>
        </div>

        <div className="mt-[10vh]">
          <div className="flex items-center gap-5 micro opacity-70">
            <span className="rule h-px flex-1" />
            <span>Colour, collected locally</span>
          </div>
          <ul className="mt-5 grid gap-px border border-bone/25 bg-bone/25 sm:grid-cols-2 lg:grid-cols-4">
            {paletteSwatches.map((s, i) => (
              <li
                key={s.name}
                data-reveal
                style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}
                className="flex items-center gap-4 bg-olive px-4 py-4"
              >
                <span
                  className="block h-11 w-11 shrink-0 border border-bone/40"
                  style={{ background: s.hex }}
                  aria-hidden
                />
                <span>
                  <span className="block micro font-bold">{s.name}</span>
                  <span className="block micro opacity-60">{s.hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
