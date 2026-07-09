import { supabase } from "./supabase";

const CONSENT_KEY = "cookie-consent";

/**
 * Records a page visit to traffic_logs ONLY if the user has granted cookie consent.
 * If consent is "denied" or not yet set, this function exits immediately — no data is written.
 */
export async function recordPageView(path: string): Promise<void> {
  if (typeof window === "undefined") return; // Server-side guard

  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent !== "accepted") return; // Strict enforcement — bail out if not explicitly granted

  const { error } = await supabase.from("traffic_logs").insert({
    path,
    user_agent: navigator.userAgent,
    consent_granted: true,
  });

  if (error) {
    // Silent fail — never disrupt the user experience for analytics errors
    console.warn("[tracking] Failed to record page view:", error.message);
  }
}

/**
 * Initialises tracking on page load and also listens for the consent-granted event
 * (dispatched by CookieConsent.tsx) to capture the very first consented page view.
 */
export function initTracking(path: string): () => void {
  // Try to record immediately (will no-op if no consent)
  void recordPageView(path);

  // Listen for deferred consent on the same page
  const handler = () => void recordPageView(path);
  window.addEventListener("consent-granted", handler);

  // Return cleanup function for useEffect
  return () => window.removeEventListener("consent-granted", handler);
}
