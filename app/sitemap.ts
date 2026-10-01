import type { MetadataRoute } from "next";
import { getAwards, getEducation, getProjects, getPublications, getResearch } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/research",
    "/projects",
    "/publications",
    "/awards",
    "/experience",
    "/education",
    "/cv",
    "/contact",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [research, projects, publications, awards, education] = await Promise.all([
    getResearch(true),
    getProjects(true),
    getPublications(true),
    getAwards(true),
    getEducation(true),
  ]);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...research.map((r) => ({
      url: `${siteUrl}/research/${r.slug}`,
      lastModified: r.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...publications.map((p) => ({
      url: `${siteUrl}/publications/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...awards.map((a) => ({
      url: `${siteUrl}/awards`,
      lastModified: a.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...education.map((e) => ({
      url: `${siteUrl}/education`,
      lastModified: e.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
