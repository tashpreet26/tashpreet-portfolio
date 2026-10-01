interface MarqueeProps {
  items: string[];
}

export default function Marquee({ items }: MarqueeProps) {
  const row = items.map((item) => `${item}  `).join("—  ") + "—  ";
  return (
    <div className="marquee overflow-hidden border-y border-line py-3" aria-hidden>
      <div className="marquee-track font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
        <span className="pr-4">{row}</span>
        <span className="pr-4">{row}</span>
      </div>
    </div>
  );
}
