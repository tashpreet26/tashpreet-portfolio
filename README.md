# Tashpreet Kaur — The Archive of Inquiry

An award-caliber personal portfolio for **Tashpreet Kaur**, a young fresher and aspiring
researcher from Bhopal, India. The site treats her portfolio as an evolving **archive of
inquiry** — questions, projects, experiments, and ideas — presented with the visual language
of a contemporary digital gallery.

> This is not the story of an established career. This is the beginning of one.

---

## Tech Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **Fonts** — Fraunces (display serif), Geist Sans (body), Geist Mono (metadata)
- **Storage** — file-based JSON database (`data/db.json`), zero external services
- **Auth** — HMAC-signed session cookies, server-side authorization on every admin action

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin CMS

```
http://localhost:3000/admin/login
```

Default password: `archive-2026` (change it in **Admin → Settings** immediately).

From the admin panel you can manage **Projects, Research, Publications, Awards, Education,
Media, and Settings** — with draft / preview / publish workflows. Drafts are never visible
on the public site.

## Environment Variables

Copy `.env.example` to `.env.local` and adjust:

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Initial admin password (used until one is set in Settings) |
| `AUTH_SECRET` | Secret used to sign session cookies — **set a long random value in production** |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of the site (used for metadata, sitemap, robots) |

## Public Routes

```
/  /about  /research  /research/[slug]  /projects  /projects/[slug]
/publications  /publications/[slug]  /awards  /experience  /education  /cv  /contact
```

## Admin Routes

```
/admin/login  /admin  /admin/projects  /admin/projects/new  /admin/projects/[id]/edit
/admin/research  /admin/publications  /admin/awards  /admin/education
/admin/media  /admin/settings
```

## Design System

- **Light** — "gallery in daylight": warm ivory, paper white, charcoal ink, terracotta accent
- **Dark** — "gallery after midnight": deep black, warm charcoal, off-white, ember accent
- Theme preference persists in `localStorage`; the toggle animates the transition
- Custom cursor (desktop only), scroll reveals, magnetic buttons, page transitions,
  and the signature **Living Archive** research-node map
- All motion respects `prefers-reduced-motion`

## Content Policy

The site is wired for honesty: every list starts empty with a designed empty state, and
all real content is added through the admin CMS. Never fabricate publications, awards,
positions, or results.
