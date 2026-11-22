import { useRef, useState } from "react";
import { formatGpa } from "@/lib/calc/gpa";
import { COMMON_SCALES, convertGpa, type ConvertOutcome } from "@/lib/calc/convert";
import { FieldError, ResultBox, scrollIntoViewSoon, useLoadExampleEvent } from "./shared";

const fmtScale = (n: number) => String(n);

function ScaleSelect({ id, label, value, custom, onValue, onCustom, invalid, describedBy }: {
  id: string; label: string; value: string; custom: string; onValue: (v: string) => void; onCustom: (v: string) => void; invalid: boolean; describedBy?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm">{label}</label>
      <select id={id} className="field" value={value} onChange={(e) => onValue(e.target.value)}>
        {COMMON_SCALES.map((s) => <option key={s} value={fmtScale(s)}>{fmtScale(s)}-point scale</option>)}
        <option value="other">Other</option>
      </select>
      {value === "other" ? (
        <>
          <label htmlFor={`${id}-custom`} className="mt-2 mb-1 block text-sm">Top of the scale</label>
          <input id={`${id}-custom`} className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={custom}
            aria-invalid={invalid || undefined} aria-describedby={invalid ? describedBy : undefined}
            onChange={(e) => onCustom(e.target.value)} />
        </>
      ) : null}
    </div>
  );
}

export function ConverterTool() {
  const [gpa, setGpa] = useState("");
  const [from, setFrom] = useState("5");
  const [fromCustom, setFromCustom] = useState("");
  const [to, setTo] = useState("4");
  const [toCustom, setToCustom] = useState("");
  const [out, setOut] = useState<ConvertOutcome | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const run = (g = gpa, f = from, fc = fromCustom, t = to, tc = toCustom) => {
    const o = convertGpa(g, f === "other" ? fc : f, t === "other" ? tc : t);
    setOut(o);
    if (o.kind === "error") document.getElementById(o.field === "gpa" ? "conv-gpa" : o.field === "from" ? "conv-from-custom" : "conv-to-custom")?.focus();
    else scrollIntoViewSoon(resultRef.current);
  };
  const changed = () => setOut(null);
  useLoadExampleEvent(() => {
    setGpa("4.1"); setFrom("4.5"); setTo("4");
    run("4.1", "4.5", "", "4", "");
  });
  const err = out?.kind === "error" ? out : null;

  return (
    <>
      <form noValidate aria-label="GPA converter" className="mt-5 card p-3 sm:p-5" onSubmit={(e) => { e.preventDefault(); run(); }}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="conv-gpa" className="mb-1 block text-sm">Your GPA</label>
            <input id="conv-gpa" className="field tabular" type="text" inputMode="decimal" autoComplete="off" placeholder="4.1" value={gpa}
              aria-invalid={err?.field === "gpa" || undefined} aria-describedby={err?.field === "gpa" ? "err-conv" : undefined}
              onChange={(e) => { setGpa(e.target.value); changed(); }} />
          </div>
          <ScaleSelect id="conv-from" label="Your scale" value={from} custom={fromCustom} invalid={err?.field === "from"} describedBy="err-conv"
            onValue={(v) => { setFrom(v); changed(); }} onCustom={(v) => { setFromCustom(v); changed(); }} />
          <ScaleSelect id="conv-to" label="Convert to" value={to} custom={toCustom} invalid={err?.field === "to"} describedBy="err-conv"
            onValue={(v) => { setTo(v); changed(); }} onCustom={(v) => { setToCustom(v); changed(); }} />
        </div>
        {err ? <FieldError id="err-conv">{err.message}</FieldError> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="submit" className="btn btn-primary">Convert GPA</button>
          <button type="button" className="btn" onClick={() => { setGpa(""); setFrom("5"); setTo("4"); setFromCustom(""); setToCustom(""); setOut(null); }}>Clear</button>
        </div>
      </form>
      <ResultBox boxRef={resultRef}>
        {out?.kind === "result" ? (
          <div className="space-y-3">
            <p className="text-text-muted">Your GPA on a {fmtScale(out.to)}-point scale</p>
            <p className="tabular text-5xl leading-none font-semibold">{formatGpa(out.value)}</p>
            <p className="tabular">{fmtScale(out.gpa)} × {fmtScale(out.to)} ÷ {fmtScale(out.from)} = {formatGpa(out.value)}</p>
            <p className="rounded-[10px] bg-accent px-4 py-3 text-[15px] text-accent-foreground">
              This is a proportional estimate. A college or credential evaluator may recalculate your GPA from each grade on your transcript instead.
            </p>
          </div>
        ) : (
          <p>Enter your GPA and pick your scale to convert it.</p>
        )}
      </ResultBox>
    </>
  );
}
