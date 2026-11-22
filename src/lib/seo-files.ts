import { INDEXABLE_ROUTES, SITE_URL, lastModified } from "./site";

export function sitemapXml() {
  const urls = INDEXABLE_ROUTES.map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${lastModified(r)}</lastmod></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

/** Preview and project hosts must never be indexed; the production domain must be. */
export const isNoindexHost = (host: string) => {
  const h = host.toLowerCase().split(":")[0] ?? "";
  return h.endsWith(".lovable.app") || h.endsWith(".lovableproject.com");
};

/** llms.txt: a short map of the site for AI assistants. */
export function llmsTxt() {
  const line = (r: { h1: string; path: string; description: string }) => `- [${r.h1}](${SITE_URL}${r.path}): ${r.description}`;
  const calculators = INDEXABLE_ROUTES.filter((r) => !r.path.startsWith("/guides/") && !["/about/", "/methodology/", "/privacy/", "/contact/"].includes(r.path));
  const guides = INDEXABLE_ROUTES.filter((r) => r.path.startsWith("/guides/"));
  const about = INDEXABLE_ROUTES.filter((r) => ["/about/", "/methodology/", "/privacy/", "/contact/"].includes(r.path));
  return [
    "# GPA Calculator Lab",
    "",
    "> Free GPA and grade calculators for U.S. high school and college students and applicants. Every result shows the math, the classes that counted and the policy source. Calculations run in the browser.",
    "",
    "## Calculators", ...calculators.map(line), "",
    "## Guides", ...guides.map(line), "",
    "## About", ...about.map(line), "",
  ].join("\n");
}
