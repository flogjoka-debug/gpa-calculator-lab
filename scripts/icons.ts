// Generates favicon.ico, apple-touch-icon, PWA icons and the web manifest from public/brand/logomark.svg.
// Run: bun scripts/icons.ts  (needs ImageMagick `magick` on PATH for the .ico container)
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const mark = readFileSync("public/brand/logomark.svg", "utf8");
const png = (svg: string, size: number) =>
  new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();

mkdirSync("/tmp/icons", { recursive: true });
for (const s of [16, 32, 48]) writeFileSync(`/tmp/icons/${s}.png`, png(mark, s));
execFileSync("magick", ["/tmp/icons/16.png", "/tmp/icons/32.png", "/tmp/icons/48.png", "public/favicon.ico"]);

// Full-bleed square with the mark at 75% scale (iOS adds its own rounding).
const inner = mark.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const bleed = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#075F57"/><g transform="translate(6 6) scale(0.75)">${inner}</g></svg>`;
writeFileSync("public/apple-touch-icon.png", png(bleed, 180));
writeFileSync("public/icon-192.png", png(mark, 192));
writeFileSync("public/icon-512.png", png(mark, 512));

writeFileSync(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "GPA Calculator Lab",
      short_name: "GPA Calculator Lab",
      start_url: "/",
      display: "standalone",
      background_color: "#F5F8F7",
      theme_color: "#075F57",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log("icons written");
