"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Publication } from "@/lib/types";
import { ArrowUpRight, SearchIcon } from "./icons";

/**
 * Literary archive browser — search + year filter, grouped by year.
 */
export default function PublicationBrowser({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("all");

  const years = useMemo(
    () => [...new Set(publications.map((p) => p.year).filter(Boolean))].sort().reverse(),
    [publications]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      const matchesYear = year === "all" || p.year === year;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q) ||
        p.authors.some((a) => a.toLowerCase().includes(q));
      return matchesYear && matchesQuery;
    });
  }, [publications, query, year]);

  const grouped = useMemo(() => {
    const map = new Map<string, Publication[]>();
    for (const p of filtered) {
      const key = p.year || "Undated";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(p);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 border border-line bg-paper p-4 sm:flex-row sm:items-center dark:bg-coal">
        <div className="flex flex-1 items-center gap-3">
          <SearchIcon className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, venues, authors…"
            className="w-full bg-transparent text-sm placeholder:text-muted focus:outline-none"
            aria-label="Search publications"
          />
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Filter by year">
          <button
            type="button"
            onClick={() => setYear("all")}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              year === "all"
                ? "border-accent text-accent dark:border-ember dark:text-ember"
                : "border-line text-muted hover:text-ink dark:hover:text-bone"
            }`}
          >
            All
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                year === y
                  ? "border-accent text-accent dark:border-ember dark:text-ember"
                  : "border-line text-muted hover:text-ink dark:hover:text-bone"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
        {query && ` matching “${query}”`}
      </p>

      <div className="mt-8 space-y-16">
        {grouped.map(([yearLabel, items]) => (
          <section key={yearLabel} aria-label={`Publications from ${yearLabel}`}>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl font-light text-ink dark:text-bone">{yearLabel}</h2>
              <span className="h-px flex-1 bg-line" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {items.length} {items.length === 1 ? "entry" : "entries"}
              </span>
            </div>
            <ul className="mt-8 divide-y divide-line border-t border-line">
              {items.map((pub, i) => (
                <li key={pub.id}>
                  <Link
                    href={`/publications/${pub.slug}`}
                    className="group grid items-baseline gap-2 py-6 md:grid-cols-[60px_1fr_auto] md:gap-6"
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-xl font-light tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-2 md:text-2xl dark:text-bone">
                        {pub.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {pub.venue}
                        {pub.authors.length > 0 ? ` — ${pub.authors.join(", ")}` : ""}
                      </span>
                    </span>
                    <ArrowUpRight className="hidden h-5 w-5 justify-self-end text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent md:block dark:group-hover:text-ember" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
