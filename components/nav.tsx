"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "@/lib/site";
import ThemeToggle from "./theme";
import { CloseIcon, MenuIcon, SearchIcon } from "./icons";

interface NavProps {
  onOpenIndex: () => void;
  onOpenSearch: () => void;
}

export default function Nav({ onOpenIndex, onOpenSearch }: NavProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`no-print fixed inset-x-0 top-0 z-[120] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ivory/85 backdrop-blur-md dark:bg-night/85"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            aria-label="Tashpreet Kaur — home"
          >
            <span className="font-display text-lg font-semibold tracking-tight text-ink dark:text-bone">
              Tashpreet Kaur
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted transition-colors group-hover:text-accent sm:block dark:group-hover:text-ember">
              Archive
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV_SECTIONS.slice(1, 6).map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={`link-underline font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                  isActive(section.href)
                    ? "is-active text-accent dark:text-ember"
                    : "text-soft hover:text-ink dark:text-ash dark:hover:text-bone"
                }`}
              >
                {section.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search the archive"
              className="flex h-9 w-9 items-center justify-center rounded-full text-soft transition-colors hover:text-accent dark:text-ash dark:hover:text-ember"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={onOpenIndex}
              className="ml-1 hidden h-9 items-center gap-2 border border-ink px-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:bg-ink hover:text-ivory sm:flex dark:border-bone dark:text-bone dark:hover:bg-bone dark:hover:text-night"
            >
              Index
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center text-ink lg:hidden dark:text-bone"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`no-print fixed inset-0 z-[180] flex flex-col bg-ivory transition-opacity duration-300 lg:hidden dark:bg-night ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
            Index
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center text-ink dark:text-bone"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="Mobile">
          {NAV_SECTIONS.map((section, i) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group flex items-baseline gap-4 border-b border-line py-4 ${
                isActive(section.href) ? "text-accent dark:text-ember" : "text-ink dark:text-bone"
              }`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="font-mono text-[10px] text-muted">{section.number}</span>
              <span className="font-display text-3xl font-light tracking-tight">
                {section.label}
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {section.note}
              </span>
            </Link>
          ))}
        </nav>
        <div className="px-8 pb-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            The Archive of Inquiry
          </p>
        </div>
      </div>
    </>
  );
}
