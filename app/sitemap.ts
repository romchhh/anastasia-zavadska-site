import type { MetadataRoute } from "next";
import { getServiceSlugs } from "./data/siteData";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anastasia-zavadska.com";

  const servicePages = getServiceSlugs().map((slug) => ({
    url: `${siteUrl}/poslugy/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...servicePages,
  ];
}
