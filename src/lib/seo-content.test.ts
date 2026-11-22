import { describe, expect, it } from "vitest";
import { PAGE_FAQS, breadcrumbSchema, faqSchema } from "./seo-content";
import { GUIDE_LIST, PAGES, ROUTES, SITE_URL, pageHead } from "./site";
import { GUIDE_CONTENT } from "./guides-content";
import goodGpa from "./guides/goodGpa";
import raise from "./guides/raise";
import scale from "./guides/scale";
import weighted from "./guides/weighted";

const BODIES: Record<string, unknown> = { goodGpa, raise, scale, weighted };

describe("SEO structured data rules", () => {
  it("makes breadcrumb items with absolute canonical trailing-slash URLs for each non-home page", () => {
    for (const page of ROUTES.filter((p) => p.path !== "/")) {
      const schema = breadcrumbSchema(page, SITE_URL);
      const expected = ["https://gpacalculatorlab.com/", ...(page.parent ? [`https://gpacalculatorlab.com${page.parent.path}`] : []), `https://gpacalculatorlab.com${page.path}`];
      expect(schema.itemListElement.map((item) => item.item)).toEqual(expected);
      expect(schema.itemListElement.map((item) => item.position)).toEqual(expected.map((_, i) => i + 1));
      expect(schema.itemListElement.at(-1)?.name).toBe(page.h1);
    }
  });
  it("preserves linked answer text as a single answer without duplicating it", () => {
    const schema = faqSchema([{ question: "q", answer: ["one ", { text: "two", to: "/" }, " three"] }]);
    expect(schema.mainEntity).toEqual([{ "@type": "Question", name: "q", acceptedAnswer: { "@type": "Answer", text: "one two three" } }]);
  });
  it("scopes identity schemas to home and FAQPage to pages with visible FAQs", () => {
    for (const page of ROUTES) {
      const types = pageHead(page).scripts.map((script) => (JSON.parse(script.children) as Record<string, unknown>)["@type"]);
      const calculator = Object.values(PAGES).some((p) => p.path === page.path);
      const extra: Record<string, string> = { "/guides/": "CollectionPage", "/about/": "AboutPage", "/contact/": "ContactPage", "/methodology/": "TechArticle" };
      expect(types).toEqual(page.path === "/"
        ? ["WebSite", "Organization", "WebPage", "WebApplication", "FAQPage"]
        : [...(page.article ? ["Article"] : []), ...(calculator ? ["WebPage", "WebApplication"] : []), ...(extra[page.path] ? [extra[page.path]] : []), "BreadcrumbList", ...(PAGE_FAQS[page.path] ? ["FAQPage"] : [])]);
    }
  });
  it("uses the approved organization URL, logo and contact email", () => {
    const organization = pageHead(PAGES.home).scripts.map((s) => JSON.parse(s.children) as Record<string, unknown>).find((s) => s["@type"] === "Organization");
    expect(organization?.["url"]).toBe("https://gpacalculatorlab.com/");
    expect((organization?.["logo"] as Record<string, unknown>)["url"]).toBe("https://gpacalculatorlab.com/icon-512.png");
    expect(organization?.["@id"]).toBe("https://gpacalculatorlab.com/#organization");
    expect(organization?.["email"]).toBe("info@gpacalculatorlab.com");
  });
  it("gives every guide a unique title, an Article by FloPixels, og:type article, visible FAQs and only known internal links", () => {
    const known = new Set(ROUTES.map((r) => r.path));
    const titles = new Set(ROUTES.map((r) => r.title));
    expect(titles.size).toBe(ROUTES.length);
    for (const guide of GUIDE_LIST) {
      expect(guide.title.length).toBeLessThanOrEqual(60);
      expect(guide.description.length).toBeLessThanOrEqual(160);
      const article = pageHead(guide).scripts.map((s) => JSON.parse(s.children) as Record<string, unknown>).find((s) => s["@type"] === "Article");
      expect(article?.["headline"]).toBe(guide.h1);
      expect((article?.["author"] as Record<string, unknown>)["name"]).toBe("FloPixels");
      expect((article?.["publisher"] as Record<string, unknown>)["@id"]).toBe("https://gpacalculatorlab.com/#organization");
      expect(pageHead(guide).meta).toContainEqual({ property: "og:type", content: "article" });
      const entry = Object.entries(GUIDE_CONTENT).find(([, c]) => c.path === guide.path);
      const content = entry?.[1];
      expect(content?.faq.length).toBeGreaterThanOrEqual(3);
      expect(BODIES[entry?.[0] ?? ""]).toBeDefined();
      const text = JSON.stringify(content) + JSON.stringify(BODIES[entry?.[0] ?? ""]);
      for (const [, href] of text.matchAll(/\]\((\/[^)]*)\)/g)) expect(known.has(href ?? "")).toBe(true);
      for (const item of content?.faq ?? []) for (const part of item.answer) if (typeof part !== "string") expect(known.has(part.to)).toBe(true);
    }
  });
});
