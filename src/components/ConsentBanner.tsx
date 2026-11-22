import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SUPPORT } from "@/lib/site";

/** Google Analytics 4 measurement ID for gpacalculatorlab.com. */
export const GA_MEASUREMENT_ID = "G-KNJDD1SQC6";
const STORAGE_KEY = "gcl-analytics-consent";
type Choice = "granted" | "denied";

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}

const readChoice = (): Choice | null => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

const saveChoice = (choice: Choice) => {
  try { window.localStorage.setItem(STORAGE_KEY, choice); } catch { /* storage blocked: ask again next visit */ }
};

/** Loads gtag.js only after the visitor accepts. Grades never leave the browser: no custom events carry them. */
function loadAnalytics() {
  if (typeof window === "undefined" || window.gtag) return;
  if (/\.lovable\.app$|^localhost$|^127\.0\.0\.1$/.test(window.location.hostname)) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
  window.gtag("config", GA_MEASUREMENT_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
}

/** Lets the footer reopen the banner. */
export const OPEN_CONSENT_EVENT = "gcl:open-consent";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") loadAnalytics();
    if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (choice: Choice) => {
    saveChoice(choice);
    setOpen(false);
    if (choice === "granted") loadAnalytics();
    else if (window.gtag) window.location.reload(); // analytics was running: reload to stop it
  };

  return (
    <div role="region" aria-label="Cookie choice" className="consent-banner">
      <p>
        With your OK, we use Google Analytics cookies to count visits and see which calculators people use. Your grades are never sent.{" "}
        <Link to={SUPPORT.privacy.path}>Privacy policy</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="btn" onClick={() => decide("denied")}>Decline</button>
        <button type="button" className="btn btn-primary" onClick={() => decide("granted")}>Accept</button>
      </div>
    </div>
  );
}
