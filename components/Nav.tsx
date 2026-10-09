"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { bhopalTime } from "@/lib/time";

const ACCENTS = ["#c9f23a", "#1f31d8", "#b5412b", "#4d5730", "#b4afa5"];
const FLASH = ["palette — 01", "palette — 02", "palette — 03", "palette — 04", "ok. that's the lot."];

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [clock, setClock] = useState("--:--:--");
  const [flash, setFlash] = useState<string | null>(null);
  const accentIndex = useRef(0);
  const flashTimer = useRef(0);
  const pathname = usePathname();

  /* section-aware colour: light sections get ink nav, dark sections get bone */
  useEffect(() => {
    let raf = 0;
    const detect = () => {
      raf = 0;
      const probe = 46;
      let next: "light" | "dark" = "light";
      document.querySelectorAll<HTMLElement>("[data-nav-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          next = el.dataset.navTheme === "dark" ? "dark" : "light";
        }
      });
      setTheme((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(detect);
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Bhopal time */
  useEffect(() => {
    const sync = () => setClock(bhopalTime());
    const boot = window.setTimeout(sync, 0);
    const id = window.setInterval(sync, 1000);
    return () => {
      clearTimeout(boot);
      clearInterval(id);
    };
  }, []);

  /* easter egg: the monogram switches the site accent */
  useEffect(() => {
    const saved = window.localStorage.getItem("tk-accent");
    if (saved && ACCENTS.includes(saved)) {
      document.documentElement.style.setProperty("--accent", saved);
      accentIndex.current = ACCENTS.indexOf(saved);
    }
  }, []);

  const cycleAccent = () => {
    accentIndex.current = (accentIndex.current + 1) % ACCENTS.length;
    const hex = ACCENTS[accentIndex.current];
    document.documentElement.style.setProperty("--accent", hex);
    window.localStorage.setItem("tk-accent", hex);
    setFlash(FLASH[accentIndex.current]);
    window.clearTimeout(flashTimer.current);
    flashTimer.current = window.setTimeout(() => setFlash(null), 1800);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-[120] px-5 md:px-8"
      style={{ viewTransitionName: "site-header" }}
    >
      <div
        className={`flex items-center justify-between gap-4 py-4 transition-colors duration-500 md:py-5 ${
          theme === "dark" ? "text-bone" : "text-ink"
        }`}
      >
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          data-cursor="HOME"
          aria-label="Tashpreet Kaur — home"
          className="micro group relative flex items-center gap-1 font-bold"
        >
          <span className="link-flip">
            <span>T</span>
            <span aria-hidden>T</span>
          </span>
          <span className="opacity-40">/</span>
          <span className="link-flip">
            <span>K</span>
            <span aria-hidden>K</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 md:gap-9">
          {LINKS.map((l) => {
            const current = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                transitionTypes={["nav-forward"]}
                aria-current={current ? "page" : undefined}
                data-cursor="GO"
                className={`micro link-flip font-bold ${
                  current ? "nav-is-current" : ""
                }`}
              >
                <span>{l.label}</span>
                <span aria-hidden>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 micro md:flex">
          <button
            type="button"
            onClick={cycleAccent}
            data-cursor="SWITCH"
            aria-label="Tashpreet Kaur — switch palette"
            className="inline-block h-1.5 w-1.5 rounded-full transition-transform hover:scale-150"
            style={{ background: "var(--accent)" }}
          />
          <span>Bhopal, IN</span>
          <span className="opacity-40">—</span>
          <span className="tabular-nums">{clock}</span>
        </div>
      </div>

      <div
        aria-live="polite"
        className={`pointer-events-none micro absolute right-5 top-full md:right-8 ${
          flash ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 ${theme === "dark" ? "text-bone" : "text-ink"}`}
      >
        {flash}
      </div>
    </header>
  );
}
