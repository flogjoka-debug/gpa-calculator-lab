// Renders the guide diagrams (1200x675 PNG) that scripts/diagrams-webp.py turns into WebP.
// Usage: bun scripts/diagrams.ts <outDir>
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "node:fs";

const out = process.argv[2] ?? "/tmp/diagrams";
mkdirSync(out, { recursive: true });
const F = "Instrument Sans";
const W = 1200, H = 675;
const C = { bg: "#F5F8F7", text: "#132B38", muted: "#4A6470", primary: "#075F57", accent: "#B8ECDD", divider: "#C9D6D3", soft: "#8FCFC1" };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const t = (x: number, y: number, s: string, size = 24, fill = C.text, weight = 500, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="${F} ${weight}" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
const frame = (title: string, subtitle: string, body: string, source: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${C.bg}"/><rect x="24" y="24" width="${W - 48}" height="${H - 48}" rx="24" fill="#FFFFFF" stroke="${C.divider}"/>
${t(64, 96, title, 38, C.text, 650)}${t(64, 136, subtitle, 24, C.muted)}${body}
${t(64, H - 56, source, 18, C.muted)}${t(W - 64, H - 56, "gpacalculatorlab.com", 18, C.primary, 650, "end")}</svg>`;

function bars(items: { label: string; value: number; note?: string }[], max: number, opts: { x0: number; y0: number; w: number; h: number; fmt: (v: number) => string; highlightLast?: boolean }) {
  const gap = 36, bw = (opts.w - gap * (items.length - 1)) / items.length;
  return items.map((it, i) => {
    const bh = (it.value / max) * opts.h, x = opts.x0 + i * (bw + gap), y = opts.y0 + opts.h - bh;
    const fill = opts.highlightLast && i === items.length - 1 ? C.primary : C.soft;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="10" fill="${fill}"/>`
      + t(x + bw / 2, y - 14, opts.fmt(it.value), 28, C.text, 650, "middle")
      + t(x + bw / 2, opts.y0 + opts.h + 36, it.label, 22, C.text, 650, "middle")
      + (it.note ? t(x + bw / 2, opts.y0 + opts.h + 64, it.note, 18, C.muted, 500, "middle") : "");
  }).join("") + `<line x1="${opts.x0 - 12}" y1="${opts.y0 + opts.h}" x2="${opts.x0 + opts.w + 12}" y2="${opts.y0 + opts.h}" stroke="${C.divider}" stroke-width="2"/>`;
}

const diagrams: Record<string, string> = {
  "average-gpa-1990-2019": frame(
    "Average U.S. high school GPA",
    "Graduates' GPA on a 4.0 scale, from real transcripts",
    bars([{ label: "1990", value: 2.68 }, { label: "2009", value: 3.0 }, { label: "2019", value: 3.11 }], 3.4,
      { x0: 140, y0: 190, w: 920, h: 320, fmt: (v) => v.toFixed(2), highlightLast: true }),
    "Source: NCES, NAEP High School Transcript Study"),
  "weighted-vs-unweighted-example": frame(
    "Same four grades, two GPAs",
    "A (AP), A (AP), B (Honors), C (Regular) with +1.0 for AP and +0.5 for Honors",
    bars([
      { label: "A · AP", value: 4, note: "4.0 → 5.0" }, { label: "A · AP", value: 4, note: "4.0 → 5.0" },
      { label: "B · Honors", value: 3, note: "3.0 → 3.5" }, { label: "C · Regular", value: 2, note: "2.0 → 2.0" },
    ], 5.4, { x0: 110, y0: 190, w: 600, h: 300, fmt: (v) => v.toFixed(1) })
      + `<rect x="790" y="200" width="330" height="130" rx="16" fill="${C.bg}" stroke="${C.divider}"/>`
      + t(820, 248, "Unweighted GPA", 24, C.muted) + t(820, 305, "3.25", 52, C.text, 650)
      + `<rect x="790" y="350" width="330" height="130" rx="16" fill="${C.accent}"/>`
      + t(820, 398, "Weighted GPA", 24, C.text) + t(820, 455, "3.88", 52, C.text, 650),
    "Bars show unweighted points; notes show the weighted value. Example bonuses; schools set their own."),
  "gpa-scale-chart": frame(
    "The 4.0 GPA scale",
    "Letter grade, grade points and a common percentage range",
    [["A", "4.0", "93–100"], ["A−", "3.7", "90–92"], ["B+", "3.3", "87–89"], ["B", "3.0", "83–86"], ["B−", "2.7", "80–82"], ["C+", "2.3", "77–79"],
      ["C", "2.0", "73–76"], ["C−", "1.7", "70–72"], ["D+", "1.3", "67–69"], ["D", "1.0", "63–66"], ["D−", "0.7", "60–62"], ["F", "0.0", "below 60"]]
      .map(([l, p, r], i) => {
        const col = i < 6 ? 0 : 1, row = i % 6, x = 64 + col * 548, y = 176 + row * 64;
        const shade = Number(p) / 4;
        return `<rect x="${x}" y="${y}" width="524" height="52" rx="12" fill="${C.bg}" stroke="${C.divider}"/>`
          + `<rect x="${x}" y="${y}" width="${Math.max(10, 524 * shade * 0.42)}" height="52" rx="12" fill="${C.accent}"/>`
          + t(x + 24, y + 35, l, 26, C.text, 650) + t(x + 250, y + 35, p, 26, C.primary, 650, "middle") + t(x + 500, y + 35, `${r}%`, 22, C.muted, 500, "end");
      }).join(""),
    "Percentages vary by school; your syllabus has the final say."),
  "raise-gpa-by-credits": frame(
    "How far one semester of A's moves a 2.8",
    "Cumulative GPA after 15 credits of A's, by credits already earned",
    bars([
      { label: "15", value: 3.4, note: "credits" }, { label: "30", value: 3.2, note: "credits" }, { label: "60", value: 3.04, note: "credits" },
      { label: "90", value: 2.97, note: "credits" }, { label: "120", value: 2.93, note: "credits" },
    ], 3.6, { x0: 140, y0: 190, w: 920, h: 300, fmt: (v) => v.toFixed(2) }),
    "Math: (2.8 × credits so far + 4.0 × 15) ÷ (credits so far + 15)"),
};

for (const [name, svg] of Object.entries(diagrams)) {
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: { loadSystemFonts: false, fontFiles: ["scripts/fonts/InstrumentSans-500.ttf", "scripts/fonts/InstrumentSans-650.ttf"], defaultFontFamily: `${F} 500` },
  }).render().asPng();
  writeFileSync(`${out}/${name}.png`, png);
  console.log(name);
}
