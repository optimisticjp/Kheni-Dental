export type ConsentState = "unset" | "essential" | "accepted";

export const CONSENT_STORAGE_KEY = "kheni_consent_v1";
export const CONSENT_EVENT = "kheni-consent-change";

export function getConsentSnapshot(): ConsentState {
  if (typeof window === "undefined") return "unset";

  const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
  return saved === "accepted" || saved === "essential" ? saved : "unset";
}

export function getServerConsentSnapshot(): ConsentState {
  return "unset";
}

export function subscribeConsent(callback: () => void) {
  const handleStorage = () => callback();
  const handleConsentChange = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CONSENT_EVENT, handleConsentChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  };
}
