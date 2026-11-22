import { INDEXABLE_ROUTES, SITE_URL } from "./site";

export function sitemapXml() {
  const urls = INDEXABLE_ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

/** Preview and project hosts must never be indexed; the production domain must be. */
export const isNoindexHost = (host: string) => {
  const h = host.toLowerCase().split(":")[0] ?? "";
  return h.endsWith(".lovable.app") || h.endsWith(".lovableproject.com");
};
