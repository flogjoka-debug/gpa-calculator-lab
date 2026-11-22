import { useRef, useState } from "react";
import { X } from "lucide-react";
import {
  PLUS_EXAMPLE_SCALE,
  PLUS_LETTER_GRADES,
  formatCredits,
  formatGpa,
  formatPoints,
  formatQp,
  type GradeScale,
  type LetterGrade,
  type RowError,
} from "@/lib/calc/gpa";
import { EXAMPLE_BONUSES, LEVELS, calculateHighSchool, type BonusProfile, type HsResult, type Level } from "@/lib/calc/highschool";
import { FormulaLine } from "./Ledger";
import {
  FieldError,
  ResultBox,
  SaveBar,
  ScalePanel,
  scrollIntoViewSoon,
  useDeviceStorage,
  useLoadExampleEvent,
  usePendingFocus,
  useReplaceConfirm,
} from "./shared";

interface Row { id: string; name: string; grade: LetterGrade | ""; level: Level; credits: string }
let seq = 1;
const emptyRow = (): Row => ({ id: `h${seq++}`, name: "", grade: "", level: "Regular", credits: "1" });
const threeEmpty = () => [emptyRow(), emptyRow(), emptyRow()];
const rowHasData = (r: Row) => r.name.trim() !== "" || r.grade !== "" || r.level !== "Regular" || r.credits.trim() !== "1";
const BONUS_LEVELS = ["Honors", "AP", "IB", "Dual enrollment"] as const;
const STORAGE_KEY = "gpacl:highschool:v1";

export function HighSchoolCalculator() {
  const [rows, setRows] = useState<Row[]>(() =>
    ["r1", "r2", "r3"].map((id) => ({ id, name: "", grade: "", level: "Regular" as Level, credits: "1" })),
  );
  const [scale, setScale] = useState<GradeScale>({ ...PLUS_EXAMPLE_SCALE });
  const [bonuses, setBonuses] = useState<BonusProfile>({ ...EXAMPLE_BONUSES });
  const [noDF, setNoDF] = useState(false);
  const [result, setResult] = useState<HsResult | null>(null);
  const [stale, setStale] = useState(false);
  const [errors, setErrors] = useState<RowError[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const focusSoon = usePendingFocus();
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ rows: Row[]; scale: GradeScale; bonuses: BonusProfile; noDF: boolean }>(STORAGE_KEY, (d) => {
    if (Array.isArray(d.rows) && d.rows.length) setRows(d.rows);
    if (d.scale) setScale({ ...PLUS_EXAMPLE_SCALE, ...d.scale });
    if (d.bonuses) setBonuses({ ...EXAMPLE_BONUSES, ...d.bonuses });
    if (typeof d.noDF === "boolean") setNoDF(d.noDF);
  });

  const changed = () => {
    if (result) setStale(true);
    storage.clearNote();
  };

  const run = (rs: Row[], opts = { scale, bonuses, noBonusForDF: noDF }) => {
    // A row with no grade and the default credit is blank.
    const input = rs.map((r) => ({ ...r, credits: r.grade === "" && r.credits.trim() === "1" ? "" : r.credits }));
    const out = calculateHighSchool(input, opts);
    if (out.kind === "error") {
      setErrors(out.errors);
      setResult(null);
      setStale(false);
      const e = out.errors[0];
      const row = e ? rs[e.index - 1] : undefined;
      if (e && row) document.getElementById(`${e.code === "credits" ? "credits" : "grade"}-${row.id}`)?.focus();
      return;
    }
    setErrors([]);
    setResult(out.kind === "result" ? out : null);
    setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };

  const updateRow = (id: string, patch: Partial<Row>) => {
    const idx = rows.findIndex((r) => r.id === id) + 1;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    setErrors((es) => es.filter((e) => e.index !== idx));
    changed();
  };
  const addRow = () => {
    const r = emptyRow();
    setRows((rs) => [...rs, r]);
    focusSoon(`grade-${r.id}`);
    changed();
  };
  const removeRow = (id: string) => {
    const i = rows.findIndex((r) => r.id === id);
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    setErrors([]);
    const t = next[i] ?? next[i - 1];
    focusSoon(t ? `grade-${t.id}` : "hs-add-class");
    changed();
  };
  const loadExample = () => {
    const ex: Row[] = [
      { id: `h${seq++}`, name: "", grade: "A", level: "Regular", credits: "1" },
      { id: `h${seq++}`, name: "", grade: "B", level: "AP", credits: "1" },
    ];
    const b = { ...EXAMPLE_BONUSES };
    setRows(ex);
    setBonuses(b);
    setNoDF(false);
    storage.clearNote();
    run(ex, { scale, bonuses: b, noBonusForDF: false });
  };
  useLoadExampleEvent(() => confirm.ask(rows.some(rowHasData), loadExample));
  const clearAll = () => {
    setRows(threeEmpty());
    setResult(null);
    setStale(false);
    setErrors([]);
    storage.clearNote();
  };

  const fresh = result && !stale ? result : null;
  const diff = fresh ? fresh.weighted.value - fresh.unweighted.value : 0;

  return (
    <>
      <form noValidate aria-label="High school GPA calculator" className="mt-5 card p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(rows); }}>
        <ol className="space-y-3">
          {rows.map((row, i) => {
            const err = errors.find((e) => e.index === i + 1);
            const errId = `err-${row.id}`;
            return (
              <li key={row.id} className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_6.5rem_9rem_5.5rem_44px]">
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor={`name-${row.id}`} className="mb-1 block text-sm">Class (optional)</label>
                    <input id={`name-${row.id}`} className="field" type="text" autoComplete="off" value={row.name}
                      onChange={(e) => updateRow(row.id, { name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Grade</label>
                    <select id={`grade-${row.id}`} className="field" value={row.grade}
                      aria-invalid={err?.code === "grade" || undefined} aria-describedby={err?.code === "grade" ? errId : undefined}
                      onChange={(e) => updateRow(row.id, { grade: e.target.value as Row["grade"] })}>
                      <option value="">—</option>
                      {PLUS_LETTER_GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`level-${row.id}`} className="mb-1 block text-sm">Level</label>
                    <select id={`level-${row.id}`} className="field" value={row.level}
                      onChange={(e) => updateRow(row.id, { level: e.target.value as Level })}>
                      {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`credits-${row.id}`} className="mb-1 block text-sm">Credits</label>
                    <input id={`credits-${row.id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={row.credits}
                      aria-invalid={err?.code === "credits" || undefined} aria-describedby={err?.code === "credits" ? errId : undefined}
                      onChange={(e) => updateRow(row.id, { credits: e.target.value })} />
                  </div>
                  <div className="flex items-end justify-end">
                    <button type="button" className="btn w-11 px-0" aria-label={`Remove class ${i + 1}`} onClick={() => removeRow(row.id)}>
                      <X aria-hidden="true" size={20} />
                    </button>
                  </div>
                </div>
                {err ? <FieldError id={errId}>{err.message}</FieldError> : null}
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <button id="hs-add-class" type="button" className="btn" onClick={addRow}>Add class</button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>

        <details className="mt-4 rounded-[10px] border border-divider">
          <summary className="flex min-h-11 cursor-pointer items-center px-3 font-semibold">Bonus points (example)</summary>
          <div className="px-3 pb-3">
            <p className="text-sm text-text-muted">These bonuses are an example. Set them to match your school.</p>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {BONUS_LEVELS.map((l) => (
                <div key={l}>
                  <label htmlFor={`bonus-${l}`} className="mb-1 block text-sm">{l}</label>
                  <input id={`bonus-${l}`} className="field tabular" type="number" inputMode="decimal" step="0.01" min="0" value={bonuses[l]}
                    onChange={(e) => {
                      const v = e.target.value === "" ? 0 : Number(e.target.value);
                      setBonuses((b) => ({ ...b, [l]: Number.isFinite(v) ? v : 0 }));
                      changed();
                    }} />
                </div>
              ))}
            </div>
            <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3">
              <input type="checkbox" className="size-5 accent-primary" checked={noDF}
                onChange={(e) => { setNoDF(e.target.checked); changed(); }} />
              <span>No bonus for a D or F</span>
            </label>
            <button type="button" className="btn mt-2" onClick={() => { setBonuses({ ...EXAMPLE_BONUSES }); changed(); }}>
              Reset to example bonuses
            </button>
          </div>
        </details>

        <ScalePanel letters={PLUS_LETTER_GRADES} scale={scale}
          onChange={(sc) => { setScale(sc); changed(); }}
          onReset={() => { setScale({ ...PLUS_EXAMPLE_SCALE }); changed(); }} />

        <SaveBar storage={storage} onSave={() => storage.save({ rows, scale, bonuses, noDF })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                <p className="text-text-muted">Unweighted GPA</p>
                <p className="tabular text-5xl leading-none font-semibold">{formatGpa(fresh.unweighted.value)}</p>
              </div>
              <div className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                <p className="text-text-muted">Weighted GPA</p>
                <p className="tabular text-5xl leading-none font-semibold">{formatGpa(fresh.weighted.value)}</p>
              </div>
            </div>
            <p className="rounded-[10px] bg-accent px-4 py-3 font-semibold text-accent-foreground">
              {fresh.bonusClasses === 0
                ? "No class earned bonus points, so both numbers match."
                : `Weighted is ${formatGpa(diff)} higher because ${fresh.bonusClasses} ${fresh.bonusClasses === 1 ? "class" : "classes"} earned bonus points.`}
            </p>
            <div className="overflow-x-auto">
              <table className="tabular w-full min-w-[34rem] border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-divider text-sm text-text-muted">
                    {["Class", "Grade", "Level", "Base points", "Bonus", "Weighted points", "Credits"].map((h, i) => (
                      <th key={h} scope="col" className={`py-2 pr-3 font-semibold ${i >= 3 ? "text-right" : ""}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fresh.classes.map((c) => (
                    <tr key={c.index} className="border-b border-divider">
                      <td className="py-2 pr-3">{c.name.trim() || `Class ${c.index}`}</td>
                      <td className="py-2 pr-3">{c.grade}</td>
                      <td className="py-2 pr-3">{c.level}</td>
                      <td className="py-2 pr-3 text-right">{formatPoints(c.base)}</td>
                      <td className="py-2 pr-3 text-right">{c.bonus > 0 ? `+${formatPoints(c.bonus)}` : "0"}</td>
                      <td className="py-2 pr-3 text-right">{formatPoints(c.weightedPoints)}</td>
                      <td className="py-2 pr-3 text-right">{formatCredits(c.credits)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="ledger-total font-semibold">
                    <th scope="row" className="py-2 pr-3">Total</th>
                    <td /><td />
                    <td className="py-2 pr-3 text-right">{formatQp(fresh.unweighted.numerator)}</td>
                    <td />
                    <td className="py-2 pr-3 text-right">{formatQp(fresh.weighted.numerator)}</td>
                    <td className="py-2 pr-3 text-right">{formatCredits(fresh.unweighted.denominator)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="space-y-1">
              <FormulaLine prefix="Unweighted GPA:" result={fresh.unweighted} />
              <FormulaLine prefix="Weighted GPA:" result={fresh.weighted} />
            </div>
          </div>
        ) : stale ? (
          <p>Your classes changed. Calculate again.</p>
        ) : (
          <p>Add a grade and credits to see your GPA.</p>
        )}
      </ResultBox>
      <p className="mt-4">
        Applying to a UC campus? UC uses its own formula, so you can <a href="/uc-gpa-calculator/">estimate your University of California GPA</a> separately.
      </p>
      <p className="mt-2">
        No Honors or AP classes? You can <a href="/">calculate a basic GPA</a> instead.
      </p>
      {confirm.dialog}
    </>
  );
}
