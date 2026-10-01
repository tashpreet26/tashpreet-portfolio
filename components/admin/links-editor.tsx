"use client";

import { useState } from "react";
import type { Link } from "@/lib/types";
import { PlusIcon, TrashIcon } from "@/components/icons";

interface LinksEditorProps {
  initial: Link[];
}

export default function LinksEditor({ initial }: LinksEditorProps) {
  const [links, setLinks] = useState<Link[]>(initial);

  const update = (index: number, field: keyof Link, value: string) => {
    setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  return (
    <div>
      <input type="hidden" name="links" value={JSON.stringify(links.filter((l) => l.label && l.url))} />
      <div className="space-y-2">
        {links.map((link, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={link.label}
              onChange={(e) => update(i, "label", e.target.value)}
              placeholder="Label"
              className="w-1/3 border border-line bg-ivory px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) => update(i, "url", e.target.value)}
              placeholder="https://…"
              className="flex-1 border border-line bg-ivory px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember"
            />
            <button
              type="button"
              onClick={() => setLinks((prev) => prev.filter((_, j) => j !== i))}
              aria-label="Remove link"
              className="flex h-8 w-8 items-center justify-center text-muted hover:text-accent dark:hover:text-ember"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setLinks((prev) => [...prev, { label: "", url: "" }])}
        className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted hover:text-accent dark:hover:text-ember"
      >
        <PlusIcon className="h-3.5 w-3.5" /> Add link
      </button>
    </div>
  );
}
