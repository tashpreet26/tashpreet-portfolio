"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/nav";
import IndexOverlay from "@/components/index-overlay";
import SearchOverlay from "@/components/search-overlay";

export default function NavShell() {
  const [indexOpen, setIndexOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Nav onOpenIndex={() => setIndexOpen(true)} onOpenSearch={() => setSearchOpen(true)} />
      <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
