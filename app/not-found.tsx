import Link from "next/link";

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main
      id="main"
      data-nav-theme="dark"
      className="flex min-h-svh flex-col justify-between bg-ink px-5 pt-[22vh] pb-8 text-bone md:px-8"
    >
      <div>
        <div className="flex items-start justify-between micro">
          <span>404 — Lost</span>
          <span className="text-right opacity-60">This frame doesn&apos;t exist</span>
        </div>
        <h1 className="mt-10 font-display uppercase leading-[0.82] tighter">
          <span className="block text-[clamp(3.6rem,15vw,13rem)]">Wrong</span>
          <span className="outline-type block text-[clamp(3.6rem,15vw,13rem)]">
            Turn
          </span>
        </h1>
        <p
          className="mt-8 max-w-[46ch] font-serif text-[clamp(1.15rem,2vw,1.7rem)] italic leading-snug text-bone/75"
        >
          The page you were looking for took a walk. Bhopal does that to plans.
        </p>
      </div>

      <nav aria-label="Recovery" className="mt-16 flex flex-wrap gap-x-8 gap-y-4">
        <Link
          href="/"
          transitionTypes={["nav-back"]}
          data-cursor="GO"
          className="micro link-flip font-bold"
        >
          <span>← Home</span>
          <span aria-hidden>← Home</span>
        </Link>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            transitionTypes={["nav-forward"]}
            data-cursor="GO"
            className="micro link-flip font-bold"
          >
            <span>{l.label}</span>
            <span aria-hidden>{l.label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
