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
/** One horizontal stacked bar of [label, value, fill] parts on a 0..100 scale, with labels under each part. */
function stack(parts: [string, number, string][], y = 220, x0 = 64, w = 1072) {
  let x = x0;
  return parts.map(([label, v, fill]) => {
    const pw = (v / 100) * w, out = `<rect x="${x}" y="${y}" width="${pw}" height="84" fill="${fill}"/>`
      + t(x + pw / 2, y + 52, v.toFixed(v % 1 ? 1 : 0), 30, fill === C.primary ? "#FFFFFF" : C.text, 650, "middle")
      + t(x + pw / 2, y + 120, label, 20, C.muted, 500, "middle");
    x += pw; return out;
  }).join("") + `<rect x="${x}" y="${y}" width="${x0 + w - x}" height="84" fill="${C.bg}"/>` + `<rect x="${x0}" y="${y}" width="${w}" height="84" rx="14" fill="none" stroke="${C.divider}" stroke-width="2"/>`;
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
  "calc-grade-weighted-categories": frame(
    "How weighted categories add up",
    "Tests 82% (50%), homework 95% (20%), labs 88% (30%)",
    stack([["Tests: 82 × 0.5", 41, C.primary], ["Homework: 95 × 0.2", 19, C.soft], ["Labs: 88 × 0.3", 26.4, C.accent]], 200)
      + box(64, 400, 1072, 110, "Current grade", "41 + 19 + 26.4 = 86.4%", true),
    "The empty end of the bar is the 13.6 points lost across the three categories."),
  "calc-grade-missing-zero": frame(
    "What one missing assignment costs",
    "Ten equal homework assignments, homework worth 20% of the grade",
    Array.from({ length: 10 }, (_, i) => {
      const x = 64 + i * 107, miss = i === 9;
      return `<rect x="${x}" y="190" width="95" height="95" rx="12" fill="${miss ? "#FFFFFF" : C.soft}" stroke="${miss ? C.primary : "none"}" stroke-width="3" ${miss ? 'stroke-dasharray="8 6"' : ""}/>`
        + t(x + 47, 248, miss ? "0" : "100", 26, C.text, 650, "middle");
    }).join("")
      + box(64, 330, 520, 110, "Homework average", "900 ÷ 10 = 90%") + box(616, 330, 520, 110, "Effect on the class grade", "10 × 0.2 = −2 points", true),
    "Turning in the missing assignment, even for partial credit, wins most of those points back."),
  "calc-final-needed-by-target": frame(
    "Score needed on the final for each grade",
    "Current grade 85%, final worth 30%",
    bars([{ label: "A (90%)", value: 101.7, note: "with extra credit only" }, { label: "B (80%)", value: 68.3, note: "possible" }, { label: "C (70%)", value: 35, note: "possible" }, { label: "D (60%)", value: 1.7, note: "possible" }], 112,
      { x0: 140, y0: 200, w: 920, h: 270, fmt: (v) => `${v.toFixed(1)}%` })
      + `<line x1="128" y1="${200 + 270 - (100 / 112) * 270}" x2="1072" y2="${200 + 270 - (100 / 112) * 270}" stroke="${C.primary}" stroke-width="2" stroke-dasharray="8 6"/>`
      + t(1072, 200 + 270 - (100 / 112) * 270 - 10, "100%", 18, C.primary, 650, "end"),
    "Math: (grade you want − 85 × 0.7) ÷ 0.3"),
  "calc-final-weight-effect": frame(
    "The same 60% final, at different weights",
    "Current grade 85%; final grade after scoring 60% on the final",
    bars([{ label: "10%", value: 82.5, note: "final weight" }, { label: "20%", value: 80, note: "final weight" }, { label: "30%", value: 77.5, note: "final weight" }, { label: "40%", value: 75, note: "final weight" }], 90,
      { x0: 140, y0: 200, w: 920, h: 270, fmt: (v) => `${v.toFixed(1)}%` }),
    "Math: 85 × (1 − weight) + 60 × weight"),
  "calc-semester-weights": frame(
    "How a 40/40/20 semester grade adds up",
    "Quarter 1: 90. Quarter 2: 80. Semester exam: 70",
    stack([["Quarter 1: 90 × 0.4", 36, C.primary], ["Quarter 2: 80 × 0.4", 32, C.soft], ["Exam: 70 × 0.2", 14, C.accent]], 200)
      + box(64, 400, 1072, 110, "Semester grade", "36 + 32 + 14 = 82", true),
    "Before the exam, the quarters alone average 85."),
  "calc-semester-exam-weight": frame(
    "How much the exam weight matters",
    "Quarters of 90 and 80, then a 60 on the semester exam",
    bars([{ label: "10%", value: 82.5, note: "exam weight" }, { label: "20%", value: 80, note: "exam weight" }, { label: "25%", value: 78.75, note: "exam weight" }], 90,
      { x0: 200, y0: 200, w: 800, h: 270, fmt: (v) => v.toFixed(1) }),
    "The quarters split the rest of the weight equally."),
  "calc-percent-scale-band": frame(
    "The common letter grade scale",
    "Each letter runs from its cutoff up to the next one",
    (() => {
      const cuts: [string, number, number][] = [["D−", 60, 63], ["D", 63, 67], ["D+", 67, 70], ["C−", 70, 73], ["C", 73, 77], ["C+", 77, 80], ["B−", 80, 83], ["B", 83, 87], ["B+", 87, 90], ["A−", 90, 93], ["A", 93, 100]];
      const x0 = 64, w = 1072, sx = (v: number) => x0 + ((v - 60) / 40) * w;
      const shade = (l: string) => (l.startsWith("A") ? C.primary : l.startsWith("B") ? C.soft : l.startsWith("C") ? C.accent : C.bg);
      return cuts.map(([l, a, b]) => `<rect x="${sx(a)}" y="210" width="${sx(b) - sx(a)}" height="120" fill="${shade(l)}" stroke="#FFFFFF" stroke-width="3"/>`
        + t((sx(a) + sx(b)) / 2, 280, l, 28, l.startsWith("A") ? "#FFFFFF" : C.text, 650, "middle")
        + t(sx(a), 364, String(a), 18, C.muted, 500, "middle")).join("")
        + t(sx(100), 364, "100", 18, C.muted, 500, "middle")
        + t(64, 440, "Below 60 is an F. On a straight 10-point scale, 90+ is an A, 80–89 a B, 70–79 a C, 60–69 a D.", 22, C.text);
    })(),
    "Cutoffs vary by school. Your syllabus has the final say."),
  "calc-percent-points-to-gpa": frame(
    "From a test score to GPA points",
    "One test on its own, step by step",
    [["Points", "42 of 50"], ["Percentage", "84%"], ["Letter", "B"], ["Grade points", "3.0"]].map(([l, v], i) => {
      const x = 64 + i * 280;
      return `<rect x="${x}" y="200" width="236" height="180" rx="18" fill="${i === 3 ? C.accent : C.bg}" stroke="${C.divider}"/>`
        + t(x + 118, 250, l, 22, C.muted, 500, "middle") + t(x + 118, 330, v, 44, C.text, 650, "middle")
        + (i < 3 ? `<path d="M${x + 246} 290 l22 0 m-8 -9 l9 9 l-9 9" stroke="${C.primary}" stroke-width="3" fill="none"/>` : "");
    }).join("")
      + t(64, 450, "Only the letter for the whole class goes into your GPA, not the letter for one test.", 24, C.text),
    "42 ÷ 50 = 0.84. On the common scale, 83 to under 87 is a B, worth 3.0."),
  "calc-uc-honors-cap": frame(
    "UC counts at most 8 honors points",
    "Ten honors semesters with an A or B: five in 10th grade, five in 11th",
    [["10th grade", 5, 4], ["11th grade", 5, 4]].map(([l, n, keep], r) => {
      const y = 200 + Number(r) * 130;
      return t(64, y + 56, String(l), 26, C.text, 650)
        + Array.from({ length: Number(n) }, (_, i) => {
          const x = 280 + i * 120, on = i < Number(keep);
          return `<rect x="${x}" y="${y}" width="100" height="90" rx="14" fill="${on ? C.primary : "#FFFFFF"}" stroke="${on ? "none" : C.divider}" stroke-width="2" ${on ? "" : 'stroke-dasharray="8 6"'}/>`
            + t(x + 50, y + 56, on ? "+1" : "cut", 26, on ? "#FFFFFF" : C.muted, 650, "middle");
        }).join("");
    }).join("")
      + box(64, 452, 1072, 110, "Honors points that count", "4 from 10th grade + 4 from 11th grade = 8", true),
    "10th grade can add no more than 4. The total can't pass 8."),
  "calc-uc-gpa-steps": frame(
    "How UC calculates your GPA",
    "From transcript to capped UC GPA in four steps",
    [["1", "Keep A-G semesters", "summer after 9th to summer after 11th grade"], ["2", "Drop plus and minus", "A = 4, B = 3, C = 2, D = 1"], ["3", "Add honors points", "up to 8, no more than 4 from 10th grade"], ["4", "Divide, don't round", "grade + honors points ÷ semester grades"]].map(([n, h, d], i) => {
      const y = 180 + i * 96;
      return `<circle cx="100" cy="${y + 36}" r="30" fill="${C.primary}"/>` + t(100, y + 46, n, 28, "#FFFFFF", 650, "middle")
        + t(156, y + 30, h, 28, C.text, 650) + t(156, y + 62, d, 22, C.muted);
    }).join(""),
    "Source: UC Admissions, GPA requirement."),
  "calc-law-gpa-gap": frame(
    "Same transcript, two GPAs",
    "A+, A, an F retaken for a B; every class 3 credits",
    box(64, 190, 520, 290, "College GPA", "33 ÷ 9 = 3.67")
      + t(92, 280, "A+ capped at 4.0", 24, C.text) + t(92, 318, "F replaced by the retake", 24, C.text) + t(92, 356, "3 classes count", 24, C.text)
      + box(616, 190, 520, 290, "LSAC GPA", "33.99 ÷ 12 = 2.83", true)
      + t(644, 280, "A+ worth 4.33", 24, C.text) + t(644, 318, "F counts as 0.00", 24, C.text) + t(644, 356, "all 4 grades count", 24, C.text),
    "LSAC counts every graded attempt, even when your college replaced it."),
  "calc-law-scale-compare": frame(
    "LSAC's 4.33 scale vs. a common college scale",
    "Where the two scales differ at the top",
    [["", "LSAC", "Common college scale"], ["A+", "4.33", "4.0 (4.33 at some)"], ["A", "4.00", "4.0"], ["A−", "3.67", "3.7 or 3.67"], ["B+", "3.33", "3.3 or 3.33"]]
      .map((row, r) => row.map((cell, c) => {
        const x = 64 + [0, 250, 560][c]!, wd = [238, 298, 512][c]!, y = 180 + r * 74;
        return `<rect x="${x}" y="${y}" width="${wd}" height="62" rx="12" fill="${r === 0 ? C.accent : c === 1 ? "#E6F6F1" : C.bg}" stroke="${C.divider}"/>`
          + t(x + wd / 2, y + 41, cell, 26, C.text, r === 0 || c === 0 ? 650 : 500, "middle");
      }).join("")).join(""),
    "Source: LSAC, Transcript summarization. College values vary by school."),
  "calc-converter-proportional": frame(
    "One GPA on three scales",
    "A proportional conversion keeps the same place on each scale",
    [["4.0 scale", 4, 3.6], ["5.0 scale", 5, 4.5], ["10-point scale", 10, 9]].map(([l, max, v], i) => {
      const y = 200 + i * 100, x0 = 300, w = 760, px = x0 + (Number(v) / Number(max)) * w;
      return t(64, y + 34, String(l), 24, C.text, 650)
        + `<rect x="${x0}" y="${y + 10}" width="${w}" height="30" rx="15" fill="${C.bg}" stroke="${C.divider}"/>`
        + `<rect x="${x0}" y="${y + 10}" width="${px - x0}" height="30" rx="15" fill="${C.soft}"/>`
        + `<circle cx="${px}" cy="${y + 25}" r="18" fill="${C.primary}"/>`
        + t(px, y + 76, `${Number(v).toFixed(2)} of ${max}`, 20, C.text, 650, "middle");
    }).join(""),
    "Math: your GPA × target scale ÷ your scale. An estimate, not an official conversion."),
  "calc-converter-weighted-trap": frame(
    "Why a weighted GPA doesn't convert cleanly",
    "A 4.5 on a weighted 5.0 high school scale",
    box(64, 190, 520, 220, "Divide the total", "4.5 × 4 ÷ 5 = 3.60")
      + t(92, 290, "Bonus points stay inside the number,", 22, C.text) + t(92, 322, "scaled down with everything else.", 22, C.text)
      + box(616, 190, 520, 220, "Recalculate from your grades", "Unweighted GPA", true)
      + t(644, 290, "Take each class at its base value", 22, C.text) + t(644, 322, "(A = 4.0) and leave out the bonus.", 22, C.text),
    "For a weighted GPA, use the high school GPA calculator instead of the converter."),
  "calc-law-two-schools": frame(
    "Every undergraduate school counts",
    "Community college and university credits combined",
    t(64, 236, "Community college", 24, C.text, 650) + `<rect x="330" y="204" width="${30 * 8.2}" height="52" rx="10" fill="${C.soft}"/>` + t(350, 238, "30 credits · 3.80", 22, C.text, 650)
      + t(64, 316, "University", 24, C.text, 650) + `<rect x="330" y="284" width="${90 * 8.2}" height="52" rx="10" fill="${C.primary}"/>` + t(350, 318, "90 credits · 3.40", 22, "#FFFFFF", 650)
      + box(64, 400, 520, 110, "University transcript GPA", "3.40") + box(616, 400, 520, 110, "LSAC GPA, both schools", "420 ÷ 120 = 3.50", true),
    "LSAC weights each school's grades by credits."),
  "calc-converter-433-trap": frame(
    "Don't scale down a 4.33 GPA",
    "Straight A's, no A+, on a 4.33 scale",
    box(64, 190, 520, 220, "Proportional conversion", "4.0 × 4 ÷ 4.33 = 3.70")
      + t(92, 290, "Treats the whole scale as stretched,", 22, C.text) + t(92, 322, "so an A looks like less than 4.0.", 22, C.text)
      + box(616, 190, 520, 220, "What it really is on 4.0", "4.00", true)
      + t(644, 290, "An A is 4.0 on both scales.", 22, C.text) + t(644, 322, "Only an A+ is worth more.", 22, C.text),
    "For a 4.33 scale, count each A+ as 4.0 and recalculate."),
};

for (const [name, svg] of Object.entries(diagrams)) {
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: W },
    font: { loadSystemFonts: false, fontFiles: ["scripts/fonts/InstrumentSans-500.ttf", "scripts/fonts/InstrumentSans-650.ttf"], defaultFontFamily: `${F} 500` },
  }).render().asPng();
  writeFileSync(`${out}/${name}.png`, png);
  console.log(name);
}
