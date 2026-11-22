import { useEffect, useRef, useState } from "react";
import { AlertCircle, X } from "lucide-react";
import {
  EXAMPLE_SCALE,
  GRADE_OPTIONS,
  LETTER_GRADES,
  calculateGpa,
  formatGpa,
  type ClassRow,
  type GpaOutcome,
  type GpaResult,
  type GradeScale,
  type RowError,
} from "@/lib/calc/gpa";
import { CountedStrip, FormulaLine, LedgerTable } from "./Ledger";

type Row = ClassRow & { id: number; name: string };

const STORAGE_KEY = "gpacl:home:v1";
let nextId = 1;
const emptyRow = (): Row => ({ id: nextId++, name: "", grade: "", credits: "" });
const threeEmpty = () => [emptyRow(), emptyRow(), emptyRow()];
const exampleRows = (): Row[] => [
  { id: nextId++, name: "", grade: "A", credits: "3" },
  { id: nextId++, name: "", grade: "B", credits: "4" },
];
const rowHasData = (r: Row) => r.name.trim() !== "" || r.grade !== "" || r.credits.trim() !== "";
const gradeLabel = (g: string) => (g === "P" ? "P (not counted)" : g === "W" ? "W (not counted)" : g);

export const EXAMPLE_RESULT = calculateGpa(exampleRows()) as GpaResult;

export function GpaCalculator({ onResult }: { onResult?: (r: GpaResult | null) => void }) {
  // Fixed ids for the first render so server and client HTML match.
  const [rows, setRows] = useState<Row[]>(() => [1, 2, 3].map((id) => ({ id: -id, name: "", grade: "", credits: "" })));
  const [equal, setEqual] = useState(false);
  const [scale, setScale] = useState<GradeScale>({ ...EXAMPLE_SCALE });
  const [outcome, setOutcome] = useState<GpaOutcome | null>(null);
  const [stale, setStale] = useState(false);
  const [errors, setErrors] = useState<RowError[]>([]);
  const [storageOk, setStorageOk] = useState(true);
  const [saveNote, setSaveNote] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const addBtnRef = useRef<HTMLButtonElement>(null);
  const pendingFocus = useRef<string | null>(null);

  // Client-only: storage check + restore saved classes.
  useEffect(() => {
    try {
      const k = "__gpacl_test__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as { rows?: ClassRow[]; equal?: boolean; scale?: GradeScale };
        if (Array.isArray(data.rows) && data.rows.length) {
          setRows(data.rows.map((r) => ({ id: nextId++, name: r.name ?? "", grade: r.grade ?? "", credits: r.credits ?? "" })));
        }
        if (typeof data.equal === "boolean") setEqual(data.equal);
        if (data.scale) setScale({ ...EXAMPLE_SCALE, ...data.scale });
      }
    } catch {
      setStorageOk(false);
    }
  }, []);

  useEffect(() => {
    if (pendingFocus.current) {
      document.getElementById(pendingFocus.current)?.focus();
      pendingFocus.current = null;
    }
  });

  useEffect(() => {
    onResult?.(outcome?.kind === "result" && !stale ? outcome : null);
  }, [outcome, stale, onResult]);

  const markChanged = () => {
    if (outcome) setStale(true);
    setSaveNote("");
  };

  const updateRow = (id: number, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    const idx = rows.findIndex((r) => r.id === id) + 1;
    setErrors((es) => es.filter((e) => e.index !== idx));
    markChanged();
  };

  const runCalc = (rs: Row[], eq = equal, sc = scale) => {
    const out = calculateGpa(rs, { equalWeight: eq, scale: sc });
    if (out.kind === "error") {
      setErrors(out.errors);
      setOutcome(null);
      setStale(false);
      const first = out.errors[0];
      const row = first ? rs[first.index - 1] : undefined;
      if (first && row) {
        const target = first.code === "credits" && !eq ? `credits-${row.id}` : `grade-${row.id}`;
        document.getElementById(target)?.focus();
      }
      return;
    }
    setErrors([]);
    setOutcome(out);
    setStale(false);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  };

  const addRow = () => {
    const r = emptyRow();
    setRows((rs) => [...rs, r]);
    pendingFocus.current = `grade-${r.id}`;
    markChanged();
  };

  const removeRow = (id: number) => {
    const i = rows.findIndex((r) => r.id === id);
    const next = rows.filter((r) => r.id !== id);
    setRows(next);
    setErrors([]);
    const target = next[i] ?? next[i - 1];
    if (target) pendingFocus.current = `grade-${target.id}`;
    else addBtnRef.current?.focus();
    markChanged();
  };

  const loadExample = () => {
    const ex = exampleRows();
    setRows(ex);
    setEqual(false);
    setErrors([]);
    setSaveNote("");
    runCalc(ex, false);
  };

  const askExample = () => {
    if (rows.some(rowHasData)) dialogRef.current?.showModal();
    else loadExample();
  };

  const clearAll = () => {
    setRows(threeEmpty());
    setOutcome(null);
    setStale(false);
    setErrors([]);
    setSaveNote("");
  };

  const save = () => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ rows: rows.map(({ name, grade, credits }) => ({ name, grade, credits })), equal, scale }),
      );
      setSaveNote("Saved on this device.");
    } catch {
      setStorageOk(false);
    }
  };
  const clearSaved = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setSaveNote("Saved data cleared.");
    } catch {
      setStorageOk(false);
    }
  };

  // Expose example loader to the "Load this example" button elsewhere on the page.
  useEffect(() => {
    const handler = () => askExample();
    window.addEventListener("gpacl:load-example", handler);
    return () => window.removeEventListener("gpacl:load-example", handler);
  });

  const result = outcome?.kind === "result" && !stale ? outcome : null;

  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          runCalc(rows);
        }}
        className="mt-5 card p-3 sm:p-5"
        aria-label="GPA calculator"
      >
        <ol className="space-y-3">
          {rows.map((row, i) => {
            const n = i + 1;
            const err = errors.find((e) => e.index === n);
            const errId = `err-${row.id}`;
            const gradeBad = err?.code === "grade";
            const creditsBad = err?.code === "credits";
            return (
              <li key={row.id} className="rounded-[12px] border border-divider bg-[#FBFDFC] p-3">
                <div className="grid grid-cols-[1fr_6.5rem_44px] gap-x-2 gap-y-2 sm:grid-cols-[1fr_8rem_7rem_44px]">
                  <div className="col-span-3 sm:col-span-1">
                    <label htmlFor={`name-${row.id}`} className="mb-1 block text-sm">Class (optional)</label>
                    <input
                      id={`name-${row.id}`}
                      className="field"
                      type="text"
                      autoComplete="off"
                      value={row.name}
                      onChange={(e) => updateRow(row.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor={`grade-${row.id}`} className="mb-1 block text-sm">Grade</label>
                    <select
                      id={`grade-${row.id}`}
                      className="field"
                      value={row.grade}
                      aria-invalid={gradeBad || undefined}
                      aria-describedby={gradeBad ? errId : undefined}
                      onChange={(e) => updateRow(row.id, { grade: e.target.value as Row["grade"] })}
                    >
                      <option value="">—</option>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>{gradeLabel(g)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`credits-${row.id}`} className="mb-1 block text-sm">Credits</label>
                    <input
                      id={`credits-${row.id}`}
                      className="field tabular"
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      disabled={equal}
                      value={equal ? "" : row.credits}
                      aria-invalid={creditsBad || undefined}
                      aria-describedby={creditsBad ? errId : undefined}
                      onChange={(e) => updateRow(row.id, { credits: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      className="btn w-11 px-0"
                      aria-label={`Remove class ${n}`}
                      onClick={() => removeRow(row.id)}
                    >
                      <X aria-hidden="true" size={20} />
                    </button>
                  </div>
                </div>
                {err ? (
                  <p id={errId} className="mt-2 flex items-start gap-1.5 text-[15px] font-semibold text-error">
                    <AlertCircle aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
                    {err.message}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-4 flex flex-wrap gap-2">
          <button ref={addBtnRef} type="button" className="btn" onClick={addRow}>Add class</button>
          <button type="submit" className="btn btn-primary">Calculate GPA</button>
          <button type="button" className="btn" onClick={askExample}>Try an example</button>
          <button type="button" className="btn" onClick={clearAll}>Clear</button>
        </div>

        <div className="mt-4">
          <label className="flex min-h-11 cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              className="size-5 accent-primary"
              checked={equal}
              aria-describedby="equal-help"
              onChange={(e) => {
                setEqual(e.target.checked);
                setErrors([]);
                markChanged();
              }}
            />
            <span>All classes count equally</span>
          </label>
          <p id="equal-help" className="ml-8 text-sm text-text-muted">Use this if your report card has no credits.</p>
        </div>

        <details className="mt-3 rounded-[10px] border border-divider">
          <summary className="flex min-h-11 cursor-pointer items-center px-3 font-semibold">Grade scale (example)</summary>
          <div className="px-3 pb-3">
            <p className="text-sm text-text-muted">This 4.0 scale is an example. Edit it to match your school.</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {LETTER_GRADES.map((g) => (
                <div key={g}>
                  <label htmlFor={`scale-${g}`} className="mb-1 block text-sm">{g}</label>
                  <input
                    id={`scale-${g}`}
                    className="field tabular"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    min="0"
                    value={scale[g]}
                    onChange={(e) => {
                      const v = e.target.value === "" ? 0 : Number(e.target.value);
                      setScale((s) => ({ ...s, [g]: Number.isFinite(v) ? v : 0 }));
                      markChanged();
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn mt-3"
              onClick={() => {
                setScale({ ...EXAMPLE_SCALE });
                markChanged();
              }}
            >
              Reset to example scale
            </button>
          </div>
        </details>

        <div className="mt-4 border-t border-divider pt-4">
          {storageOk ? (
            <>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn" onClick={save}>Save on this device</button>
                <button type="button" className="btn" onClick={clearSaved}>Clear saved data</button>
              </div>
              <p className="mt-2 text-sm text-text-muted">Your grades stay in this browser. Nothing is sent to us.</p>
              {saveNote ? <p className="mt-1 text-sm font-semibold text-success" role="status">✓ {saveNote}</p> : null}
            </>
          ) : (
            <p className="text-sm text-text-muted">Saving isn't available in this browser. The calculator still works.</p>
          )}
        </div>
      </form>

      <p className="mt-4">
        College students can <a href="/college-gpa-calculator/">calculate a college GPA</a> with plus/minus grades and
        retakes. High school students can <a href="/high-school-gpa-calculator/">compare weighted and unweighted GPA</a> on
        one screen.
      </p>

      <div
        ref={resultRef}
        aria-live="polite"
        className="mt-5 scroll-mb-4 card p-4 sm:p-5"
      >
        {result ? (
          <div className="space-y-4">
            <div>
              <p className="text-text-muted">Your GPA</p>
              <p className="tabular text-5xl leading-none font-semibold">{formatGpa(result.value)}</p>
            </div>
            <LedgerTable result={result} />
            <CountedStrip result={result} />
            <FormulaLine result={result} />
          </div>
        ) : stale ? (
          <p>Your classes changed. Calculate again.</p>
        ) : (
          <p>Add a grade and credits to see your GPA.</p>
        )}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="replace-title"
        className="m-auto w-[min(92vw,26rem)] card p-5 text-text backdrop:bg-text/40"
      >
        <p id="replace-title" className="text-lg font-semibold">Replace your classes with the example?</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              dialogRef.current?.close();
              loadExample();
            }}
          >
            Replace
          </button>
          <button type="button" className="btn" autoFocus onClick={() => dialogRef.current?.close()}>Cancel</button>
        </div>
      </dialog>
    </>
  );
}
