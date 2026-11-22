import { useEffect, useRef, useState } from "react";
import { SOURCE_NAMES, clearHandoff, readHandoff, writeHandoff, type Handoff, type TargetId, type ToolId } from "@/lib/handoff";
import { fmtNum, fmtPct1 } from "@/lib/calc/format";

/** Link that stores the percentage only when clicked, then follows its normal href. */
export function HandoffLink({ href, percent, source, target, children }: {
  href: string; percent: number | null; source: ToolId; target: TargetId; children: React.ReactNode;
}) {
  return (
    <a href={href} onClick={() => { if (percent !== null) writeHandoff(percent, source, target); }}>
      {children}
    </a>
  );
}

type Notice = { kind: "filled" | "offer"; h: Handoff } | null;

/** On arrival: fill an empty field, or offer the value without changing anything. */
export function useHandoffArrival(target: TargetId, ready: boolean, current: string, setValue: (v: string) => void) {
  const [notice, setNotice] = useState<Notice>(null);
  const done = useRef(false);
  const cur = useRef(current);
  cur.current = current;
  useEffect(() => {
    if (!ready || done.current) return;
    done.current = true;
    const h = readHandoff(target);
    if (!h) return;
    if (cur.current.trim() === "") {
      setValue(fmtNum(h.percent, 2));
      clearHandoff();
      setNotice({ kind: "filled", h });
    } else {
      setNotice({ kind: "offer", h });
    }
  }, [ready, target, setValue]);

  const view = notice ? (
    <div role="status" className="mt-4 flex flex-wrap items-center gap-2 rounded-[10px] bg-accent px-4 py-3 text-accent-foreground">
      {notice.kind === "filled" ? (
        <>
          <span>Filled from your {SOURCE_NAMES[notice.h.source]} result: {fmtPct1(notice.h.percent)}%.</span>
          <button type="button" className="btn" onClick={() => { setValue(""); setNotice(null); }}>Clear</button>
        </>
      ) : (
        <>
          <span>You have {fmtPct1(notice.h.percent)}% from the {SOURCE_NAMES[notice.h.source]}.</span>
          <button type="button" className="btn" onClick={() => { setValue(fmtNum(notice.h.percent, 2)); clearHandoff(); setNotice(null); }}>Use it</button>
          <button type="button" className="btn" onClick={() => { clearHandoff(); setNotice(null); }}>Keep mine</button>
        </>
      )}
    </div>
  ) : null;
  return view;
}
