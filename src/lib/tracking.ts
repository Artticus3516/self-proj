const CONSENT_KEY = "cookie-consent";

/**
 * Records a page visit locally ONLY if the user has granted cookie consent.
 */
export async function recordPageView(path: string): Promise<void> {
    if (typeof window === "undefined") return; // Server-side guard

    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent !== "accepted") return; // Strict enforcement — bail out if not explicitly granted

    console.log(`[tracking] Page view recorded: ${path}`);
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
