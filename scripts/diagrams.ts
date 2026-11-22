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


// Generic pieces for the calculator-page diagrams.
const box = (x: number, y: number, w: number, h: number, label: string, value: string, accent = false) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${accent ? C.accent : C.bg}" ${accent ? "" : `stroke="${C.divider}"`}/>`
  + t(x + 28, y + 38, label, 20, accent ? C.text : C.muted) + (value ? t(x + 28, y + h - 24, value, 32, C.text, 650) : "");
/** Paired horizontal bars: rows of [label, a, b] on a 0..max scale. */
function pairBars(rows: [string, number, number][], max: number, legend: [string, string], y0 = 196, rowH = 62, barH = 22) {
  const x0 = 300, w = 740;
  const leg = `<rect x="${x0}" y="${y0 - 34}" width="18" height="18" rx="4" fill="${C.soft}"/>` + t(x0 + 26, y0 - 19, legend[0], 18, C.muted)
    + `<rect x="${x0 + 300}" y="${y0 - 34}" width="18" height="18" rx="4" fill="${C.primary}"/>` + t(x0 + 326, y0 - 19, legend[1], 18, C.muted);
  return leg + rows.map(([label, a, b], i) => {
    const y = y0 + i * rowH, y2 = y + barH + 4;
    return t(64, y + barH + 8, label, 22, C.text, 650)
      + `<rect x="${x0}" y="${y}" width="${(a / max) * w}" height="${barH}" rx="6" fill="${C.soft}"/>` + t(x0 + (a / max) * w + 10, y + barH - 4, a.toFixed(1), 17, C.muted)
      + `<rect x="${x0}" y="${y2}" width="${(b / max) * w}" height="${barH}" rx="6" fill="${C.primary}"/>` + t(x0 + (b / max) * w + 10, y2 + barH - 4, b.toFixed(1), 17, C.text, 650);
  }).join("");
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
  "home-credits-weight": frame(
    "Credits decide how hard a grade pulls",
    "An A in a 3-credit class and a B in a 4-credit class",
    Array.from({ length: 7 }, (_, i) => {
      const isA = i < 3, x = 96 + i * 146;
      return `<rect x="${x}" y="190" width="132" height="132" rx="14" fill="${isA ? C.primary : C.soft}"/>`
        + t(x + 66, 250, isA ? "A" : "B", 40, isA ? "#FFFFFF" : C.text, 650, "middle")
        + t(x + 66, 290, isA ? "4.0" : "3.0", 24, isA ? "#FFFFFF" : C.text, 500, "middle");
    }).join("")
      + t(96, 362, "Each square is one credit: 3 credits of A, 4 credits of B", 22, C.muted)
      + `<rect x="96" y="392" width="480" height="120" rx="16" fill="${C.bg}" stroke="${C.divider}"/>`
      + t(124, 436, "Plain average of the two grades", 22, C.muted) + t(124, 488, "(4.0 + 3.0) ÷ 2 = 3.50", 32, C.text, 650)
      + `<rect x="608" y="392" width="496" height="120" rx="16" fill="${C.accent}"/>`
      + t(636, 436, "GPA weighted by credits", 22, C.text) + t(636, 488, "(12 + 12) ÷ 7 = 3.43", 32, C.text, 650),
    "The B carries more credits, so it pulls the GPA below 3.5."),
  "home-what-counts": frame(
    "What counts toward your GPA",
    "Four 3-credit classes: an A, an F, a Pass and a Withdrawal",
    [["A", "Counted", "4.0 × 3 = 12", true], ["F", "Counted", "0 × 3 = 0", true], ["P", "Not counted", "no grade points", false], ["W", "Not counted", "no grade points", false]]
      .map(([g, label, math, on], i) => {
        const x = 64 + i * 272;
        return `<rect x="${x}" y="180" width="248" height="230" rx="18" fill="${on ? "#FFFFFF" : C.bg}" stroke="${on ? C.primary : C.divider}" stroke-width="${on ? 3 : 2}" ${on ? "" : 'stroke-dasharray="10 8"'}/>`
          + t(x + 124, 262, String(g), 64, on ? C.text : C.muted, 650, "middle")
          + `<rect x="${x + 44}" y="292" width="160" height="40" rx="20" fill="${on ? C.accent : C.divider}"/>`
          + t(x + 124, 320, String(label), 20, C.text, 650, "middle")
          + t(x + 124, 378, String(math), 22, on ? C.text : C.muted, 500, "middle");
      }).join("")
      + `<rect x="64" y="440" width="1072" height="84" rx="16" fill="${C.accent}"/>`
      + t(96, 492, "GPA = 12 quality points ÷ 6 counted credits = 2.00", 30, C.text, 650),
    "On most transcripts P and W add no grade points and no GPA credits. Check your school's policy."),
  "home-cumulative-weight": frame(
    "Why one semester moves a cumulative GPA slowly",
    "A 2.80 over 45 earlier credits, then two terms at 3.00",
    [["Earlier credits", 45, "2.80"], ["Fall", 6, "3.00"], ["Spring", 4, "3.00"]]
      .map(([label, cr, gpa], i) => {
        const y = 186 + i * 86, w = (Number(cr) / 55) * 860;
        return t(64, y + 36, String(label), 24, C.text, 650)
          + `<rect x="250" y="${y}" width="${w}" height="56" rx="12" fill="${i === 0 ? C.soft : C.primary}"/>`
          + t(250 + w + 16, y + 36, `${cr} credits · ${gpa}`, 22, C.muted);
      }).join("")
      + `<rect x="64" y="452" width="1072" height="76" rx="16" fill="${C.accent}"/>`
      + t(96, 500, "Cumulative: (2.80 × 45 + 30) ÷ 55 = 2.84", 30, C.text, 650),
    "The new terms are 10 of 55 credits, so two 3.00 terms lift a 2.80 only to 2.84."),
  "calc-college-plus-minus": frame(
    "Plus and minus grades change your GPA",
    "Four 3-credit classes graded A−, B+, B+ and C+",
    pairBars([["A−", 4.0, 3.7], ["B+", 3.0, 3.3], ["B+", 3.0, 3.3], ["C+", 2.0, 2.3]], 4.4, ["Letters only (A, B, B, C)", "With plus and minus"], 200, 60)
      + box(64, 452, 520, 110, "Letters only", "12.0 ÷ 4 = 3.00") + box(616, 452, 520, 110, "With plus and minus", "12.6 ÷ 4 = 3.15", true),
    "Example values: A− = 3.7, B+ = 3.3, C+ = 2.3. Your college's scale may differ."),
  "calc-college-retake": frame(
    "Retaking a class: two ways colleges count it",
    "A D in a 3-credit class, then an A in the retake",
    box(64, 180, 520, 250, "Count both attempts", "")
      + t(92, 290, "D: 1.0 × 3 = 3", 28, C.text) + t(92, 336, "A: 4.0 × 3 = 12", 28, C.text) + t(92, 400, "15 ÷ 6 = 2.50", 36, C.text, 650)
      + box(616, 180, 520, 250, "Replace the earlier grade", "", true)
      + t(644, 290, "D: left out", 28, C.muted) + t(644, 336, "A: 4.0 × 3 = 12", 28, C.text) + t(644, 400, "12 ÷ 3 = 4.00", 36, C.text, 650)
      + t(64, 486, "LSAC counts every graded attempt for law school applications, whatever your college does.", 22, C.muted),
    "Your registrar's repeat policy decides which one applies, and how many retakes can count."),
  "calc-hs-weighted-year": frame(
    "One year, two GPAs",
    "Six 1-credit classes with Honors and AP bonus points",
    pairBars([["English (H)", 4.0, 4.5], ["Biology (AP)", 3.0, 4.0], ["Algebra II", 4.0, 4.0], ["Spanish", 3.0, 3.0], ["U.S. History (AP)", 4.0, 5.0], ["PE", 4.0, 4.0]], 5.4, ["Unweighted points", "Weighted points"], 196, 47, 18)
      + box(64, 488, 520, 104, "Unweighted GPA", "22 ÷ 6 = 3.67") + box(616, 488, 520, 104, "Weighted GPA", "24.5 ÷ 6 = 4.08", true),
    "Example bonuses: +0.5 for Honors, +1.0 for AP. Schools set their own."),
  "calc-hs-bonus-scale": frame(
    "What each grade is worth by class level",
    "Common example values on a weighted 5.0 scale",
    [["", "Regular", "Honors", "AP / IB"], ["A", "4.0", "4.5", "5.0"], ["B", "3.0", "3.5", "4.0"], ["C", "2.0", "2.5", "3.0"], ["D", "1.0", "1.5", "2.0"], ["F", "0", "0", "0"]]
      .map((row, r) => row.map((cell, c) => {
        const x = 64 + c * 268, y = 176 + r * 64, head = r === 0 || c === 0;
        return `<rect x="${x}" y="${y}" width="256" height="54" rx="12" fill="${r === 0 ? C.accent : c === 3 && r > 0 ? "#E6F6F1" : C.bg}" stroke="${C.divider}"/>`
          + t(x + 128, y + 36, cell, 26, C.text, head ? 650 : 500, "middle");
      }).join("")).join(""),
    "Some schools give no bonus for a D or F. Set your school's values in the calculator."),
  "calc-cum-semester-average": frame(
    "Why you can't average semester GPAs",
    "Fall: 3.20 over 15 credits. Spring: 3.80 over 12 credits",
    t(64, 226, "Fall", 24, C.text, 650) + `<rect x="200" y="196" width="${15 * 52}" height="48" rx="10" fill="${C.soft}"/>` + t(220, 228, "15 credits × 3.20 = 48.0", 22, C.text, 650)
      + t(64, 302, "Spring", 24, C.text, 650) + `<rect x="200" y="272" width="${12 * 52}" height="48" rx="10" fill="${C.primary}"/>` + t(220, 304, "12 credits × 3.80 = 45.6", 22, "#FFFFFF", 650)
      + box(64, 380, 520, 120, "Plain average of the two GPAs", "(3.20 + 3.80) ÷ 2 = 3.50") + box(616, 380, 520, 120, "Cumulative GPA, weighted by credits", "93.6 ÷ 27 = 3.47", true),
    "The fall semester has more credits, so it carries more weight."),
  "calc-cum-diminishing": frame(
    "The same A semester, later in college",
    "A 3.00 GPA plus one 15-credit semester of A's",
    bars([{ label: "15", value: 3.5, note: "credits so far" }, { label: "30", value: 3.33, note: "credits so far" }, { label: "60", value: 3.2, note: "credits so far" }, { label: "90", value: 3.14, note: "credits so far" }, { label: "120", value: 3.11, note: "credits so far" }], 3.6,
      { x0: 140, y0: 190, w: 920, h: 290, fmt: (v) => v.toFixed(2) }),
    "Math: (3.0 × credits so far + 4.0 × 15) ÷ (credits so far + 15)"),
};

for (const [name, svg] of Object.entries(diagrams)) {
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: { loadSystemFonts: false, fontFiles: ["scripts/fonts/InstrumentSans-500.ttf", "scripts/fonts/InstrumentSans-650.ttf"], defaultFontFamily: `${F} 500` },
  }).render().asPng();
  writeFileSync(`${out}/${name}.png`, png);
  console.log(name);
}
