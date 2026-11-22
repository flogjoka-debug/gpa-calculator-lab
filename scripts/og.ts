// Renders a 1200x630 social image. Usage: bun scripts/og.ts "<headline>" "<line>" <out.png>
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync, statSync } from "node:fs";

const [headline = "GPA Calculator", line = "See your GPA and the math behind it.", out = "public/og/home.png"] =
  process.argv.slice(2);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const mark = readFileSync("public/brand/logomark.svg", "utf8").replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const F = "Instrument Sans";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#F5F8F7"/>
<rect width="1200" height="14" fill="#075F57"/>
<g transform="translate(72 70) scale(1.25)">${mark}</g>
<text x="146" y="114" font-family="${F} 650" font-size="34" fill="#132B38">GPA Calculator <tspan fill="#075F57">Lab</tspan></text>
<text x="72" y="300" font-family="${F} 650" font-size="86" fill="#132B38">${esc(headline)}</text>
<text x="72" y="368" font-family="${F} 500" font-size="35" fill="#33505C">${esc(line)}</text>
<text x="72" y="560" font-family="${F} 650" font-size="30" fill="#075F57">gpacalculatorlab.com</text>
<g transform="translate(830 170)">
  <rect width="300" height="300" rx="14" fill="#FFFFFF" stroke="#C9D6D3" stroke-width="2"/>
  <text x="32" y="70" font-family="${F} 500" font-size="28" fill="#4A6470">Your GPA</text>
  <text x="32" y="170" font-family="${F} 650" font-size="96" fill="#132B38">3.43</text>
  <rect x="20" y="212" width="260" height="60" rx="10" fill="#B8ECDD"/>
  <text x="40" y="252" font-family="${F} 650" font-size="28" fill="#132B38">24 ÷ 7 credits</text>
</g>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    loadSystemFonts: false,
    fontFiles: ["scripts/fonts/InstrumentSans-500.ttf", "scripts/fonts/InstrumentSans-650.ttf"],
    defaultFontFamily: `${F} 500`,
  },
}).render().asPng();
writeFileSync(out, png);
const kb = statSync(out).size / 1024;
console.log(`${out}: ${kb.toFixed(0)} KB`);
if (kb > 300) throw new Error("OG image exceeds 300 KB");
