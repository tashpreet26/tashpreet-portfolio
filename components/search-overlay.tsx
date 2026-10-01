"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SearchResults } from "@/lib/db";
import { ArrowUpRight, SearchIcon } from "./icons";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

type Group = {
  key: keyof SearchResults;
  label: string;
  items: { title: string; meta: string; href: string }[];
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    clearTimeout(debounceRef.current);
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = (await res.json()) as SearchResults;
        const allGroups: Group[] = [
          {
            key: "projects",
            label: "Projects",
            items: data.projects.map((p) => ({
              title: p.title,
              meta: p.researchArea || p.year,
              href: `/projects/${p.slug}`,
            })),
          },
          {
            key: "research",
            label: "Research",
            items: data.research.map((r) => ({
              title: r.title,
              meta: "Research area",
              href: `/research/${r.slug}`,
            })),
          },
          {
            key: "publications",
            label: "Publications",
            items: data.publications.map((p) => ({
              title: p.title,
              meta: p.venue || p.year,
              href: `/publications/${p.slug}`,
            })),
          },
          {
            key: "awards",
            label: "Awards",
            items: data.awards.map((a) => ({
              title: a.title,
              meta: a.organization || a.year,
              href: `/awards`,
            })),
          },
        ];
        const groups = allGroups.filter((g) => g.items.length > 0);
        setResults(groups);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
        setActive(0);
      }
    }, 220);
    return () => clearTimeout(debounceRef.current);
  }, [query, open]);

  if (!open) return null;

  const flat = results.flatMap((g) => g.items);
  const total = flat.length;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, total - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && flat[active]) {
      window.location.href = flat[active].href;
    }
  };

  let itemIndex = -1;

  return (
    <div
      className="no-print fixed inset-0 z-[190] flex items-start justify-center bg-night/95 px-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search the archive"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border border-bone/15 bg-coal text-bone shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-bone/15 px-5 py-4">
          <SearchIcon className="h-4 w-4 text-ember" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search the archive — projects, research, publications…"
            className="w-full bg-transparent font-display text-xl font-light placeholder:text-ash/60 focus:outline-none"
            aria-label="Search query"
          />
          <kbd className="hidden border border-bone/20 px-2 py-0.5 font-mono text-[10px] text-ash sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {query.trim().length >= 2 && !loading && total === 0 && (
            <p className="px-5 py-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-ash">
              No entries found for “{query.trim()}”
            </p>
          )}
          {results.map((group) => (
            <div key={group.key} className="border-b border-bone/10 last:border-0">
              <p className="px-5 pb-1 pt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
                {group.label}
              </p>
              <ul>
                {group.items.map((item) => {
                  itemIndex += 1;
                  const idx = itemIndex;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setActive(idx)}
                        className={`flex items-center justify-between gap-4 px-5 py-3 transition-colors ${
                          active === idx ? "bg-bone/5" : ""
                        }`}
                      >
                        <span className="font-display text-lg font-light">{item.title}</span>
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
                            {item.meta}
                          </span>
                          <ArrowUpRight
                            className={`h-4 w-4 ${active === idx ? "text-ember" : "text-ash/40"}`}
                          />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {query.trim().length < 2 && (
            <p className="px-5 py-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-ash">
              Begin typing to search the archive
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-bone/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ash">
          <span>{total > 0 ? `${total} result${total === 1 ? "" : "s"}` : "Archive search"}</span>
          <span>↑↓ navigate — ↵ open</span>
        </div>
      </div>
    </div>
  );
}
