import { describe, expect, it } from "vitest";
import { PAGE_FAQS, breadcrumbSchema, faqSchema } from "./seo-content";
import { PAGES, ROUTES, SITE_URL, pageHead } from "./site";

describe("SEO structured data rules", () => {
  it("makes two breadcrumb items with absolute canonical trailing-slash URLs for each non-home page", () => {
    for (const page of ROUTES.filter((p) => p.path !== "/")) {
      const schema = breadcrumbSchema(page, SITE_URL);
      expect(schema.itemListElement).toHaveLength(2);
      expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
      expect(schema.itemListElement.map((item) => item.item)).toEqual(["https://gpacalculatorlab.com/", `https://gpacalculatorlab.com${page.path}`]);
      expect(schema.itemListElement[1]?.name).toBe(page.h1);
    }
  });
  it("preserves linked answer text as a single answer without duplicating it", () => {
    const schema = faqSchema([{ question: "q", answer: ["one ", { text: "two", to: "/" }, " three"] }]);
    expect(schema.mainEntity).toEqual([{ "@type": "Question", name: "q", acceptedAnswer: { "@type": "Answer", text: "one two three" } }]);
  });
  it("scopes identity schemas to home and FAQPage to pages with visible FAQs", () => {
    for (const page of ROUTES) {
      const types = pageHead(page).scripts.map((script) => (JSON.parse(script.children) as Record<string, unknown>)["@type"]);
      expect(types).toEqual(page.path === "/" ? ["WebSite", "Organization", "FAQPage"] : ["BreadcrumbList", ...(PAGE_FAQS[page.path] ? ["FAQPage"] : [])]);
    }
  });
  it("uses the approved organization URL, logo and contact email", () => {
    const organization = pageHead(PAGES.home).scripts.map((s) => JSON.parse(s.children) as Record<string, unknown>).find((s) => s["@type"] === "Organization");
    expect(organization?.["url"]).toBe("https://gpacalculatorlab.com/");
    expect(organization?.["logo"]).toBe("https://gpacalculatorlab.com/icon-512.png");
    expect(organization?.["email"]).toBe("info@gpacalculatorlab.com");
  });
});