import { useCallback, useRef, useState } from "react";
import { parseNumber } from "@/lib/calc/gpa";
import { MAX_PERCENT, PERCENT_RANGE_MESSAGE, fmtNum } from "@/lib/calc/format";
import { COMMON_SCALE, TEN_POINT_SCALE, customFrom, letterFor, upperOf, validateScale, type LetterResult, type ScaleProfile } from "@/lib/calc/scale";
import { FieldError, ResultBox, SaveBar, scrollIntoViewSoon, useDeviceStorage, useLoadExampleEvent, useReplaceConfirm } from "./shared";
import { useHandoffArrival } from "./handoff";

type Mode = "percent" | "points";
interface Saved { mode: Mode; percent: string; earned: string; possible: string; profile: ScaleProfile }
const STORAGE_KEY = "gpacl:percentage:v1";
interface Out { percent: number; res: LetterResult }

export function PercentageTool() {
  const [mode, setMode] = useState<Mode>("percent");
  const [percent, setPercent] = useState("");
  const [earned, setEarned] = useState("");
  const [possible, setPossible] = useState("");
  const [profile, setProfile] = useState<ScaleProfile>(COMMON_SCALE);
  const [out, setOut] = useState<Out | null>(null);
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<{ field: string; message: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const confirm = useReplaceConfirm();
  const storage = useDeviceStorage<Saved>(STORAGE_KEY, (d) => {
    if (d.mode) setMode(d.mode);
    setPercent(d.percent ?? "");
    setEarned(d.earned ?? "");
    setPossible(d.possible ?? "");
    if (d.profile?.rows?.length) setProfile(d.profile);
  });
  const changed = () => { if (out) setStale(true); storage.clearNote(); };
  const fill = useCallback((v: string) => { setMode("percent"); setPercent(v); setOut(null); setStale(false); }, []);
  const notice = useHandoffArrival("percentage", storage.ready, mode === "percent" ? percent : earned, fill);

  const scaleError = validateScale(profile);

  const run = (m = mode, pc = percent, e = earned, p = possible, prof = profile) => {
    let value: number | null = null;
    if (m === "percent") {
      const v = parseNumber(pc);
      if (v === null || v < 0) { setError({ field: "percent", message: "Percentage: enter 0 or more." }); document.getElementById("pct")?.focus(); setOut(null); return; }
      if (v > MAX_PERCENT) { setError({ field: "percent", message: PERCENT_RANGE_MESSAGE }); document.getElementById("pct")?.focus(); setOut(null); return; }
      value = v;
    } else {
      const ev = parseNumber(e);
      const pv = parseNumber(p);
      if (ev === null || ev < 0) { setError({ field: "earned", message: "Points earned: enter 0 or more." }); document.getElementById("earned")?.focus(); setOut(null); return; }
      if (pv === null || pv <= 0) { setError({ field: "possible", message: "Points possible: enter a number greater than 0." }); document.getElementById("possible")?.focus(); setOut(null); return; }
      value = (100 * ev) / pv;
      if (value > MAX_PERCENT) { setError({ field: "earned", message: PERCENT_RANGE_MESSAGE }); document.getElementById("earned")?.focus(); setOut(null); return; }
    }
    if (validateScale(prof)) { setOut(null); return; }
    setError(null);
    setOut({ percent: value, res: letterFor(value, prof) });
    setStale(false);
    scrollIntoViewSoon(resultRef.current);
  };

  const loadExample = () => {
    setMode("points"); setEarned("42"); setPossible("50"); setPercent(""); setProfile(COMMON_SCALE);
    storage.clearNote();
    run("points", "", "42", "50", COMMON_SCALE);
  };
  useLoadExampleEvent(() => confirm.ask(percent !== "" || earned !== "" || possible !== "", loadExample));

  const pickScale = (id: string) => {
    // Scale changes recompute the shown result live from the same profile (never an old number).
    setProfile(id === "common" ? COMMON_SCALE : id === "ten" ? TEN_POINT_SCALE : customFrom(profile));
    storage.clearNote();
  };
  const editMin = (i: number, raw: string) => {
    const v = raw.trim() === "" ? NaN : Number(raw);
    setProfile((p) => ({ ...p, rows: p.rows.map((r, j) => (j === i ? { ...r, min: v } : r)) }));
    storage.clearNote();
  };

  const fresh = out && !stale ? out : null;
  // Table highlight follows the same active profile; recomputed live so a cutoff edit moves it.
  const live = fresh && !scaleError ? letterFor(fresh.percent, profile) : null;

  return (
    <>
      {notice}
      <form noValidate aria-label="Percentage to letter grade" className="mt-5 rounded-[14px] border border-divider bg-surface p-3 sm:p-5"
        onSubmit={(e) => { e.preventDefault(); run(); }}>
        <div role="radiogroup" aria-label="Enter" className="flex flex-wrap gap-x-5">
          {([["percent", "Enter a percentage"], ["points", "Enter points"]] as const).map(([v, l]) => (
            <label key={v} className="flex min-h-11 cursor-pointer items-center gap-2">
              <input type="radio" name="pct-mode" className="size-5 accent-primary" checked={mode === v}
                onChange={() => { setMode(v); setError(null); changed(); }} />
              <span>{l}</span>
            </label>
          ))}
        </div>
        {mode === "percent" ? (
          <div className="mt-2 max-w-xs">
            <label htmlFor="pct" className="mb-1 block text-sm">Percentage</label>
            <input id="pct" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={percent}
              aria-invalid={error?.field === "percent" || undefined}
              onChange={(e) => { setPercent(e.target.value); setError(null); changed(); }} />
          </div>
        ) : (
          <div className="mt-2 grid max-w-md grid-cols-2 gap-2">
            <div>
              <label htmlFor="earned" className="mb-1 block text-sm">Points earned</label>
              <input id="earned" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={earned}
                aria-invalid={error?.field === "earned" || undefined}
                onChange={(e) => { setEarned(e.target.value); setError(null); changed(); }} />
            </div>
            <div>
              <label htmlFor="possible" className="mb-1 block text-sm">Points possible</label>
              <input id="possible" className="field tabular" type="text" inputMode="decimal" autoComplete="off" value={possible}
                aria-invalid={error?.field === "possible" || undefined}
                onChange={(e) => { setPossible(e.target.value); setError(null); changed(); }} />
            </div>
          </div>
        )}
        {error ? <FieldError id="pct-err">{error.message}</FieldError> : null}
        <div className="mt-3 max-w-xs">
          <label htmlFor="scale" className="mb-1 block text-sm">Scale</label>
          <select id="scale" className="field" value={profile.id} onChange={(e) => pickScale(e.target.value)}>
            <option value="common">{COMMON_SCALE.name}</option>
            <option value="ten">{TEN_POINT_SCALE.name}</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="submit" className="btn btn-primary">Get letter grade</button>
          <button type="button" className="btn" onClick={() => { setPercent(""); setEarned(""); setPossible(""); setOut(null); setStale(false); setError(null); }}>Clear</button>
        </div>
        <SaveBar storage={storage} onSave={() => storage.save({ mode, percent, earned, possible, profile })} />
      </form>

      <ResultBox boxRef={resultRef}>
        {fresh && live ? (
          <div className="space-y-2">
            <p className="tabular text-6xl leading-none font-semibold">{live.letter}</p>
            <p className="text-lg font-semibold">{fmtNum(fresh.percent)}% is {/^[AEF]/.test(live.letter) ? "an" : "a"} {live.letter} on this scale.</p>
            <p>{live.overTop ? live.rangeText : `${live.letter} runs from ${live.rangeText}.`}</p>
            {live.next ? <p>You're {fmtNum(live.next.away)} points from {/^[AEF]/.test(live.next.letter) ? "an" : "a"} {live.next.letter}.</p> : null}
            <p className="tabular">Grade points: {live.points.toFixed(1)}</p>
          </div>
        ) : fresh && scaleError ? (
          <p>Fix the scale below to see the letter grade.</p>
        ) : stale ? (
          <p>Your entries changed. Calculate again.</p>
        ) : (
          <p>Enter a percentage to see the letter grade.</p>
        )}
      </ResultBox>
      <p className="mt-4">
        Turning letters into a GPA? You can <a href="/college-gpa-calculator/">use this letter grade in your college GPA</a>.
      </p>

      <div className="mt-6 overflow-x-auto rounded-[14px] border border-divider bg-surface p-3 sm:p-4">
        <table className="tabular w-full border-collapse text-left text-[15px]">
          <caption className="mb-2 text-left font-semibold">{profile.name}</caption>
          <thead>
            <tr className="border-b border-divider text-sm text-text-muted">
              <th scope="col" className="py-2 pr-3 font-semibold">Letter</th>
              <th scope="col" className="py-2 pr-3 font-semibold">From</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Up to</th>
              <th scope="col" className="py-2 text-right font-semibold">Grade points</th>
            </tr>
          </thead>
          <tbody>
            {profile.rows.map((r, i) => {
              const hit = live?.row === i;
              const bad = scaleError?.row === i;
              return (
                <tr key={r.letter} className={`border-b border-divider ${hit ? "bg-accent font-semibold text-accent-foreground" : ""}`}>
                  <th scope="row" className="py-2 pr-3">
                    {r.letter}
                    {hit ? <span className="ml-2 rounded-full border border-text px-2 text-xs">Your grade</span> : null}
                  </th>
                  <td className="py-1 pr-3">
                    {profile.id === "custom" ? (
                      <input aria-label={`${r.letter} from`} className="field tabular w-24" type="number" inputMode="decimal" step="0.01"
                        value={Number.isFinite(r.min) ? r.min : ""} aria-invalid={bad || undefined}
                        onChange={(e) => editMin(i, e.target.value)} />
                    ) : fmtNum(r.min)}
                  </td>
                  <td className="py-2 pr-3">{i === 0 ? fmtNum(upperOf(profile.rows, i)) : `under ${fmtNum(upperOf(profile.rows, i))}`}</td>
                  <td className="py-2 text-right">{r.points.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {scaleError ? <FieldError id="scale-err">{scaleError.message}</FieldError> : null}
      </div>
      {confirm.dialog}
    </>
  );
}
