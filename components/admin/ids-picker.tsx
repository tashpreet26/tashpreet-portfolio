"use client";

import { useState } from "react";

interface IdsPickerProps {
  name: string;
  label: string;
  options: { id: string; title: string }[];
  initial: string[];
}

/**
 * Checkbox multi-select serialized as JSON into a hidden input,
 * so server actions receive a single parseable field.
 */
export default function IdsPicker({ name, label, options, initial }: IdsPickerProps) {
  const [selected, setSelected] = useState<string[]>(initial);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  if (options.length === 0) return null;

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(selected)} />
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-soft dark:text-ash">
        {label}
      </p>
      <div className="mt-2 max-h-44 space-y-1.5 overflow-y-auto border border-line bg-ivory p-3 dark:bg-night">
        {options.map((opt) => (
          <label key={opt.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-ink dark:text-bone">
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggle(opt.id)}
              className="h-3.5 w-3.5 accent-[#b4441c]"
            />
            <span className="truncate">{opt.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
