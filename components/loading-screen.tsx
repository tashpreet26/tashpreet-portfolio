"use client";

import { useEffect, useState } from "react";

/**
 * "THE UNSEALING" — the portfolio's opening ceremony.
 *
 * A wax seal (in the archive's terracotta accent) hangs in a dark room,
 * cracks open, spills ember light — then the name stamps in letterpress
 * style. The exit is an iris-out, like a camera aperture closing on
 * the seal, revealing the gallery beneath.
 *
 * Total runtime ~2.6s. Skipped entirely for reduced-motion users.
 */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"seal" | "crack" | "title" | "exit">("seal");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Respect reduced motion — show a brief static title, then move on.
  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("title");
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
  }, [mounted, onDone]);

  // Archival counter — 000 → 100, like a catalogue being stamped.
  useEffect(() => {
    if (!mounted) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(100);
      return;
    }
    const duration = 2100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // Ease so it feels mechanical, not linear
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted]);

  // Phase choreography
  useEffect(() => {
    if (!mounted) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timers = [
      setTimeout(() => setPhase("crack"), 750),
      setTimeout(() => setPhase("title"), 1150),
      setTimeout(() => setPhase("exit"), 2150),
      setTimeout(onDone, 2750),
    ];
    return () => timers.forEach(clearTimeout);
  }, [mounted, onDone]);

  if (!mounted) return null;

  const cracking = phase === "crack" || phase === "title" || phase === "exit";
  const showTitle = phase === "title" || phase === "exit";

  const title = "TASHPREET";
  const titleLetters = title.split("");

  return (
    <div
      className="fixed inset-0 z-[300] overflow-hidden bg-night"
      style={{
        clipPath:
          phase === "exit" ? "circle(0% at 50% 46%)" : "circle(150% at 50% 46%)",
        transition: "clip-path 0.65s var(--ease-out-expo)",
      }}
      aria-hidden={phase === "exit"}
    >
      {/* Film grain + vignette + flicker for a cinematic room feel */}
      <div className="grain-overlay" style={{ opacity: 0.09 }} />
      <div
        className="animate-vignette-pulse pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 46%, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div className="animate-film-flicker absolute inset-0">
        {/* Dust motes */}
        {[
          { left: "12%", top: "68%", delay: "0s", size: 3 },
          { left: "22%", top: "30%", delay: "0.8s", size: 2 },
          { left: "78%", top: "24%", delay: "1.6s", size: 3 },
          { left: "86%", top: "62%", delay: "0.4s", size: 2 },
          { left: "64%", top: "78%", delay: "2.2s", size: 2 },
          { left: "38%", top: "18%", delay: "1.1s", size: 2 },
          { left: "50%", top: "84%", delay: "2.8s", size: 3 },
          { left: "8%", top: "44%", delay: "1.9s", size: 2 },
        ].map((d, i) => (
          <span
            key={i}
            className="animate-dust absolute rounded-full bg-bone/60"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size,
              animationDelay: d.delay,
            }}
          />
        ))}

        {/* Top metadata */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.35em] text-ash md:px-10">
          <span className="text-ember">Archive — 001</span>
          <span className="hidden sm:block">23.2599° N — 77.4126° E</span>
        </div>

        {/* Center stage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          {/* Wax seal */}
          <div
            className={`relative transition-opacity duration-300 ${
              cracking ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="animate-seal-enter">
              <div className="animate-seal-sway relative">
                {/* Ember glow behind the seal */}
                <div
                  className={`absolute -inset-10 rounded-full ${
                    cracking ? "animate-glow-burst" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,85,42,0.55) 0%, rgba(212,85,42,0.15) 45%, transparent 70%)",
                  }}
                />
                {/* Seal halves */}
                <div className="relative h-28 w-28 md:h-32 md:w-32">
                  <div
                    className={`absolute inset-0 ${cracking ? "animate-seal-half-left" : ""}`}
                    style={{
                      clipPath:
                        "polygon(0% 0%, 48% 0%, 52% 14%, 45% 28%, 54% 42%, 46% 56%, 53% 70%, 47% 84%, 50% 100%, 0% 100%)",
                    }}
                  >
                    <SealFace />
                  </div>
                  <div
                    className={`absolute inset-0 ${cracking ? "animate-seal-half-right" : ""}`}
                    style={{
                      clipPath:
                        "polygon(48% 0%, 100% 0%, 100% 100%, 50% 100%, 47% 84%, 53% 70%, 46% 56%, 54% 42%, 45% 28%, 52% 14%)",
                    }}
                  >
                    <SealFace />
                  </div>
                  {/* Crack flash */}
                  {cracking && phase === "crack" && (
                    <svg
                      viewBox="0 0 120 120"
                      className="animate-crack-flash absolute inset-0 h-full w-full"
                      aria-hidden
                    >
                      <path
                        d="M60 4 L56 22 L63 38 L54 55 L62 72 L57 88 L60 116"
                        fill="none"
                        stroke="#ece6d8"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Letterpress title */}
          <div
            className={`mt-12 text-center transition-opacity duration-200 ${
              showTitle ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="animate-fade-up font-mono text-[10px] uppercase tracking-[0.5em] text-ash">
              The Archive of Inquiry
            </p>
            <h1 className="mt-6 font-display font-light uppercase leading-[0.95] tracking-[-0.02em] text-bone">
              <span className="block text-[clamp(2.6rem,9vw,6.5rem)]">
                {titleLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="animate-stamp-in inline-block"
                    style={{ animationDelay: `${i * 55}ms` }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span
                className="animate-stamp-in block pl-[0.4em] text-[clamp(2.6rem,9vw,6.5rem)] italic text-ember"
                style={{ animationDelay: `${titleLetters.length * 55 + 80}ms` }}
              >
                Kaur
              </span>
            </h1>
            <div
              className="animate-fade-up mx-auto mt-8 h-px w-40 bg-ember/70"
              style={{ animationDelay: "900ms" }}
            />
            <p
              className="animate-fade-up mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-ash"
              style={{ animationDelay: "1000ms" }}
            >
              A beginning shaped by curiosity
            </p>
          </div>
        </div>

        {/* Bottom — catalogue counter */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 py-6 font-mono text-[10px] uppercase tracking-[0.35em] text-ash md:px-10">
          <span>Bhopal — Present</span>
          <span className="text-bone">
            {String(count).padStart(3, "0")}
            <span className="text-ember"> / 100</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** The wax seal face — rendered twice, once per cracked half. */
function SealFace() {
  return (
    <div
      className="h-full w-full"
      style={{
        borderRadius: "47% 53% 52% 48% / 52% 46% 54% 48%",
        background:
          "radial-gradient(circle at 38% 32%, #e07a54 0%, #d4552a 28%, #b4441c 55%, #8c3312 82%, #6e2709 100%)",
        boxShadow:
          "inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -4px 10px rgba(0,0,0,0.45), 0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Inner ring */}
      <div
        className="absolute inset-[14%] rounded-full border border-bone/40"
        style={{ borderRadius: "48% 52% 50% 50% / 51% 48% 52% 49%" }}
      />
      {/* Monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display text-3xl font-light italic text-bone/90 md:text-4xl"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}
        >
          TK
        </span>
      </div>
      {/* Wax drips */}
      <div
        className="absolute -bottom-1 left-[18%] h-3 w-2.5"
        style={{
          borderRadius: "50% 50% 60% 60%",
          background: "#8c3312",
        }}
      />
      <div
        className="absolute -bottom-0.5 right-[22%] h-2 w-2"
        style={{
          borderRadius: "50% 50% 60% 60%",
          background: "#8c3312",
        }}
      />
    </div>
  );
}
