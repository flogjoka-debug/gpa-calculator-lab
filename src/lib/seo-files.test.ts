import { describe, expect, it } from "vitest";
import { isNoindexHost, llmsTxt, robotsTxt, sitemapXml } from "./seo-files";

describe("indexing", () => {
  it("sitemap lists exactly the 10 calculators, the guides hub, 4 guides and 4 support pages", () => {
    const locs = [...sitemapXml().matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toHaveLength(19);
    expect(locs).toContain("https://gpacalculatorlab.com/guides/what-is-a-good-gpa/");
    expect(sitemapXml().match(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g)).toHaveLength(19);
    expect(locs.every((l) => l?.startsWith("https://gpacalculatorlab.com/") && l.endsWith("/"))).toBe(true);
    expect(locs).toContain("https://gpacalculatorlab.com/contact/");
  });
  it("robots allows all and names the sitemap", () => {
    expect(robotsTxt()).toBe("User-agent: *\nAllow: /\n\nSitemap: https://gpacalculatorlab.com/sitemap.xml\n");
  });
  it("noindex on lovable.app hosts only", () => {
    expect(isNoindexHost("id-preview--x.lovable.app")).toBe(true);
    expect(isNoindexHost("gpa-calculator-lab.lovable.app")).toBe(true);
    expect(isNoindexHost("gpacalculatorlab.com")).toBe(false);
  });
  it("llms.txt lists every indexable page in three sections", () => {
    const txt = llmsTxt();
    expect(txt.startsWith("# GPA Calculator Lab")).toBe(true);
    expect(txt.match(/^- \[/gm)).toHaveLength(19);
  });
});
