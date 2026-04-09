import type { NextConfig } from "next";

function devAllowedOrigins(): string[] {
  if (process.env.NODE_ENV !== "development") return [];

  const extra =
    process.env.NEXT_DEV_ALLOWED_ORIGINS?.split(",")
      .map((h) => h.trim())
      .filter(Boolean) ?? [];

  let fromSite: string[] = [];
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (site) {
    try {
      fromSite = [new URL(site).hostname];
    } catch {
      /* ignore */
    }
  }

  return [...new Set([...extra, ...fromSite])];
}

const allowedDevOrigins = devAllowedOrigins();

const nextConfig: NextConfig = {
  ...(allowedDevOrigins.length > 0 ? { allowedDevOrigins } : {}),
};

export default nextConfig;
