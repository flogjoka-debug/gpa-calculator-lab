import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import type { GradeScale, LetterGrade } from "@/lib/calc/gpa";

/** Explicit "Save on this device" storage. Blocked storage never breaks calculation. */
export function useDeviceStorage<T>(key: string, onRestore: (data: T) => void) {
  const [ok, setOk] = useState(true);
  const [note, setNote] = useState("");
  const [ready, setReady] = useState(false);
  const restore = useRef(onRestore);
  restore.current = onRestore;
  useEffect(() => {
    try {
      const k = "__gpacl_test__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      const saved = window.localStorage.getItem(key);
      if (saved) restore.current(JSON.parse(saved) as T);
    } catch {
      setOk(false);
    }
    setReady(true);
  }, [key]);
  return {
    ok,
    ready,
    note,
    clearNote: () => setNote(""),
    save: (data: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(data));
        setNote("Saved on this device.");
      } catch {
        setOk(false);
      }
    },
    clear: () => {
      try {
        window.localStorage.removeItem(key);
        setNote("Saved data cleared.");
      } catch {
        setOk(false);
      }
    },
  };
}

export function SaveBar({ storage, onSave }: { storage: { ok: boolean; note: string; clear: () => void }; onSave: () => void }) {
  return (
    <div className="mt-4 border-t border-divider pt-4">
      {storage.ok ? (
        <>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn" onClick={onSave}>Save on this device</button>
            <button type="button" className="btn" onClick={storage.clear}>Clear saved data</button>
          </div>
          <p className="mt-2 text-sm text-text-muted">Your grades stay in this browser. Nothing is sent to us.</p>
          {storage.note ? <p className="mt-1 text-sm font-semibold text-success" role="status">✓ {storage.note}</p> : null}
        </>
      ) : (
        <p className="text-sm text-text-muted">Saving isn't available in this browser. The calculator still works.</p>
      )}
    </div>
  );
}

/** In-page "Replace your classes with the example?" dialog. */
export function useReplaceConfirm() {
  const ref = useRef<HTMLDialogElement>(null);
  const action = useRef<() => void>(() => {});
  const ask = (hasData: boolean, fn: () => void) => {
    if (!hasData) return fn();
    action.current = fn;
    ref.current?.showModal();
  };
  const dialog = (
    <dialog
      ref={ref}
      aria-labelledby="replace-title"
      className="m-auto w-[min(92vw,26rem)] card p-5 text-text backdrop:bg-text/40"
    >
      <p id="replace-title" className="text-lg font-semibold">Replace your classes with the example?</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            ref.current?.close();
            action.current();
          }}
        >
          Replace
        </button>
        <button type="button" className="btn" autoFocus onClick={() => ref.current?.close()}>Cancel</button>
      </div>
    </dialog>
  );
  return { ask, dialog };
}

/** Listen for the page's "Load this example" button. */
export function useLoadExampleEvent(handler: () => void) {
  const h = useRef(handler);
  h.current = handler;
  useEffect(() => {
    const fn = () => h.current();
    window.addEventListener("gpacl:load-example", fn);
    return () => window.removeEventListener("gpacl:load-example", fn);
  }, []);
}
export const LoadExampleButton = () => (
  <button type="button" className="btn mt-4" onClick={() => window.dispatchEvent(new Event("gpacl:load-example"))}>
    Load this example
  </button>
);

/** Move focus to an element id after the next render. */
export function usePendingFocus() {
  const pending = useRef<string | null>(null);
  useEffect(() => {
    if (pending.current) {
      document.getElementById(pending.current)?.focus();
      pending.current = null;
    }
  });
  return (id: string) => {
    pending.current = id;
  };
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-[15px] font-semibold text-error">
      <AlertCircle aria-hidden="true" size={18} className="mt-0.5 shrink-0" />
      {children}
    </p>
  );
}

export function ScalePanel({
  letters,
  scale,
  onChange,
  onReset,
}: {
  letters: LetterGrade[];
  scale: GradeScale;
  onChange: (s: GradeScale) => void;
  onReset: () => void;
}) {
  return (
    <details className="mt-3 rounded-[10px] border border-divider">
      <summary className="flex min-h-11 cursor-pointer items-center px-3 font-semibold">Grade scale (example)</summary>
      <div className="px-3 pb-3">
        <p className="text-sm text-text-muted">This 4.0 scale is an example. Edit it to match your school.</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-7">
          {letters.map((g) => (
            <div key={g}>
              <label htmlFor={`scale-${g}`} className="mb-1 block text-sm">{g}</label>
              <input
                id={`scale-${g}`}
                className="field tabular"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={scale[g] ?? 0}
                onChange={(e) => {
                  const v = e.target.value === "" ? 0 : Number(e.target.value);
                  onChange({ ...scale, [g]: Number.isFinite(v) ? v : 0 });
                }}
              />
            </div>
          ))}
        </div>
        <button type="button" className="btn mt-3" onClick={onReset}>Reset to example scale</button>
      </div>
    </details>
  );
}

export const ResultBox = ({ children, boxRef }: { children: ReactNode; boxRef?: React.Ref<HTMLDivElement> }) => (
  <div ref={boxRef} aria-live="polite" className="mt-5 scroll-mb-4 card p-4 sm:p-5">
    {children}
  </div>
);

export const gradeLabel = (g: string) => (g === "P" || g === "NP" || g === "W" ? `${g} (not counted)` : g);
export const scrollIntoViewSoon = (el: HTMLElement | null) =>
  requestAnimationFrame(() => el?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
