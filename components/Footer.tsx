"use client";

import { useEffect, useState } from "react";
import { contactLinks } from "@/lib/content";
import { scrollToTop } from "@/lib/smooth";
import { bhopalTime } from "@/lib/time";

const SOCIALS = contactLinks.filter((l) => l.href.startsWith("http"));

/** Site footer — lives in the root layout, appears under every screen. */
export default function Footer() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const sync = () => setClock(bhopalTime());
    const boot = window.setTimeout(sync, 0);
    const id = window.setInterval(sync, 1000);
    return () => {
      clearTimeout(boot);
      clearInterval(id);
    };
  }, []);

  const toTop = () => {
    scrollToTop();
  };

  return (
    <footer
      data-nav-theme="dark"
      className="border-t border-bone/15 bg-ink px-5 py-7 text-bone md:px-8"
    >
      <div className="flex flex-col gap-5 micro md:flex-row md:items-center md:justify-between">
        <span className="opacity-70">
          © 2026 Tashpreet Kaur — all rights, some wrongs
        </span>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {SOCIALS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="GO"
              className="link-flip font-bold"
            >
              <span>{l.label}</span>
              <span aria-hidden>{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <span className="tabular-nums opacity-70">Bhopal, IN — {clock}</span>
          <button
            type="button"
            onClick={toTop}
            data-cursor="UP"
            className="link-flip font-bold"
          >
            <span>Back to top ↑</span>
            <span aria-hidden>Back to top ↑</span>
          </button>
        </div>
      </div>

      <p className="mt-4 micro text-bone/30">Designed &amp; built in Bhopal, with care</p>
    </footer>
  );
}
