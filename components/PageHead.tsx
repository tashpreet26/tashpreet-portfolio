type Props = {
  crumb: string;
  title: string;
  note?: string;
  sub?: string;
};

/** Big opening band for the sub-screens (Work / About). */
export default function PageHead({ crumb, title, note, sub }: Props) {
  return (
    <header
      data-nav-theme="dark"
      className="bg-ink px-5 pt-[20vh] pb-[9vh] text-bone md:px-8"
    >
      <div className="flex items-start justify-between micro">
        <span>{crumb}</span>
        {note ? <span className="text-right opacity-60">{note}</span> : null}
      </div>

      <h1 className="mt-10 font-display uppercase leading-[0.82] tighter">
        <span className="block text-[clamp(3.6rem,15vw,13rem)]" data-reveal>
          {title}
        </span>
        <span
          className="outline-type block text-[clamp(3.6rem,15vw,13rem)]"
          data-reveal
          style={{ "--d": "0.08s" } as React.CSSProperties}
          aria-hidden
        >
          {title}
        </span>
      </h1>

      {sub ? (
        <p
          data-reveal
          style={{ "--d": "0.16s" } as React.CSSProperties}
          className="mt-8 max-w-[52ch] font-serif text-[clamp(1.15rem,2vw,1.7rem)] italic leading-snug text-bone/75"
        >
          {sub}
        </p>
      ) : null}
    </header>
  );
}
