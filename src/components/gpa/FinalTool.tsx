import { useCallback, useRef, useState } from "react";
import { calculateFinal, type FinalError, type FinalResult } from "@/lib/calc/final";
import { fmtNum, fmtPct1 } from "@/lib/calc/format";
import { FieldError, ResultBox, SaveBar, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, useReplaceConfirm } from "./shared";
import { useHandoffArrival } from "./handoff";

const STORAGE_KEY = "gpacl:final:v1";
const CHIPS = [["A", 90], ["B", 80], ["C", 70], ["D", 60]] as const;

export function FinalTool() {
  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<FinalResult | null>(null);
  const [stale, setStale] = useState(false);
  const [errors, setErrors] = useState<FinalError[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<{ current: string; target: string; weight: string }>(STORAGE_KEY, (d) => {
    setCurrent(d.current ?? ""); setTarget(d.target ?? ""); setWeight(d.weight ?? "");
  });
  const changed = () => { if (result) setStale(true); storage.clearNote(); setErrors([]); };
  const fillCurrent = useCallback((v: string) => { setCurrent(v); setResult(null); setStale(false); }, []);
  const notice = useHandoffArrival("final", storage.ready, current, fillCurrent);

  const run = (c = current, t = target, w = weight) => {
    const out = calculateFinal(c, t, w);
    if (out.kind === "error") {
      setErrors(out.errors); setResult(null); setStale(false);
      const f = out.errors[0]?.field;
      if (f) document.getElementById(`final-${f}`)?.focus();
      return;
    }
    setErrors([]); setResult(out.kind === "result" ? out : null); setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };
  const loadExample = () => { setCurrent("85"); setTarget("90"); setWeight("40"); storage.clearNote(); run("85", "90", "40"); };
  useLoadExampleEvent(() => confirm.ask(current !== "" || target !== "" || weight !== "", loadExample));

  const err = (f: FinalError["field"]) => errors.find((e) => e.field === f);
  const fresh = result && !stale ? result : null;
  const formula = (r: FinalResult) =>
    `(${fmtNum(r.target)} − ${fmtNum(r.current)} × ${(1 - r.w).toFixed(2)}) ÷ ${r.w.toFixed(2)} = ${fmtNum(r.needed, 1)}`;

  const field = (id: "current" | "target" | "weight", label: string, value: string, set: (v: string) => void, extra?: React.ReactNode) => (
    <div>
      <label htmlFor={`final-${id}`} className="mb-1 block text-sm">{label}</label>
      <input id={`final-${id}`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={value}
        aria-invalid={!!err(id) || undefined} aria-describedby={extra ? `final-${id}-help` : undefined}
        onChange={(e) => { set(e.target.value); changed(); }} />
      {extra ? <div id={`final-${id}-help`} className="mt-1 text-sm text-text-muted">{extra}</div> : null}
      {err(id) ? <FieldError id={`final-${id}-err`}>{err(id)?.message}</FieldError> : null}
    </div>
  );

  return (
    <>
      {notice}
      <form noValidate aria-label="Final grade calculator" className="mt-5 rounded-[14px] border border-divider bg-surface p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(); }}>
        <div className="grid gap-3 sm:grid-cols-3">
          {field("current", "Current grade (%)", current, setCurrent, (
            <>
              <p>Your grade before the final</p>
              <p className="mt-1">Not sure what it is? <a href="/grade-calculator/">Calculate your current class grade</a> first.</p>
            </>
          ))}
          <div>
            {field("target", "Grade you want (%)", target, setTarget)}
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Grade you want">
              {CHIPS.map(([l, v]) => (
                <button key={l} type="button" className={`btn min-w-11 px-3 ${target === String(v) ? "btn-primary" : ""}`}
                  aria-pressed={target === String(v)} onClick={() => { setTarget(String(v)); changed(); }}>
                  {l} ({v})
                </button>
              ))}
            </div>
          </div>
          {field("weight", "Final exam weight (%)", weight, setWeight)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-divider pt-4">
          <button type="submit" className="btn btn-primary">Calculate</button>
          <button type="button" className="btn" onClick={() => { setCurrent(""); setTarget(""); setWeight(""); setResult(null); setStale(false); setErrors([]); }}>Clear</button>
        </div>
        <SaveBar storage={storage} onSave={() => storage.save({ current, target, weight })} />
      </form>
      <p className="mt-4">
        Graded in quarters plus an exam? You can <a href="/semester-grade-calculator/">combine quarter grades and an exam</a> instead.
      </p>

      <ResultBox boxRef={resultRef}>
        {fresh ? (
          <div className="space-y-2">
            {fresh.state === "noEffect" ? (
              <p className="text-lg font-semibold">The final doesn't change your grade.</p>
            ) : fresh.state === "reached" ? (
              <p className="text-lg font-semibold">You've already reached this target, even with a 0 on the final.</p>
            ) : fresh.state === "unreachable" ? (
              <>
                <p className="text-lg font-semibold">
                  {fmtNum(fresh.target)}% is out of reach. Even with 100% on the final you'd finish with {fmtPct1(fresh.maxCourse)}%.
                </p>
                <p className="tabular">{formula(fresh)}</p>
                <p>Check your current grade with the <a href="/grade-calculator/">Grade Calculator</a>.</p>
              </>
            ) : (
              <>
                <p className="text-text-muted">You need</p>
                <p className="tabular text-5xl leading-none font-semibold">{fmtNum(fresh.needed, 1)}%</p>
                <p className="text-lg font-semibold">
                  You need {fmtNum(fresh.needed, 1)}% on your final to finish with {fmtNum(fresh.target)}%.
                </p>
                <p>Highest grade you can still get: {fmtPct1(fresh.maxCourse)}% (with 100% on the final).</p>
                <p className="tabular">{formula(fresh)}</p>
              </>
            )}
            {fresh.state !== "noEffect" ? <p>If you get a 0 on the final, you'll finish with {fmtPct1(fresh.minCourse)}%.</p> : null}
          </div>
        ) : stale ? (
          <p>Your numbers changed. Calculate again.</p>
        ) : (
          <p>Enter your current grade, the grade you want, and the final's weight.</p>
        )}
      </ResultBox>
      {confirm.dialog}
    </>
  );
}
