"use client";

import { useEffect } from "react";
import Link from "next/link";
import { NAV_SECTIONS } from "@/lib/site";
import { ArrowUpRight, CloseIcon } from "./icons";

interface IndexOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function IndexOverlay({ open, onClose }: IndexOverlayProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="no-print fixed inset-0 z-[190] flex flex-col bg-night text-bone"
      role="dialog"
      aria-modal="true"
      aria-label="Archive index"
    >
      <div className="archive-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative flex h-16 items-center justify-between px-5 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ash">
          Catalogue — The Archive of Inquiry
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close index"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:border-ember hover:text-ember"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-5 md:px-10" aria-label="Archive index">
        <ul className="mx-auto max-w-5xl">
          {NAV_SECTIONS.map((section, i) => (
            <li key={section.href}>
              <Link
                href={section.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 border-b border-bone/10 py-5 transition-colors hover:border-ember/60 md:gap-8 md:py-6"
              >
                <span className="font-mono text-[11px] text-ember">{section.number}</span>
                <span className="font-display text-4xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">
                  {section.label}
                </span>
                <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ash sm:block">
                  {section.note}
                </span>
                <ArrowUpRight className="h-5 w-5 text-ash transition-all duration-300 group-hover:text-ember" />
                <span className="sr-only">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative flex items-center justify-between px-5 py-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ash md:px-10">
        <span>Tashpreet Kaur</span>
        <span>Bhopal — Present</span>
        <span>MMXXVI</span>
      </div>
    </div>
  );
}
