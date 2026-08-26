"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ConsentState = "unset" | "essential" | "accepted";

const STORAGE_KEY = "kheni_consent_v1";
const CONSENT_EVENT = "kheni-consent-change";

function getConsentSnapshot(): ConsentState {
  if (typeof window === "undefined") return "unset";

  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved === "accepted" || saved === "essential") {
    return saved;
  }

  return "unset";
}

function getServerSnapshot(): ConsentState {
  return "unset";
}

function subscribe(callback: () => void) {
  const handleStorage = () => callback();
  const handleConsentChange = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CONSENT_EVENT, handleConsentChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  };
}

function updateConsent(analytics: boolean, marketing: boolean) {
  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: "kheni_consent_update",
    analytics_consent: analytics,
    marketing_consent: marketing,
  });
}

export function ConsentBanner() {
  const state = useSyncExternalStore(
    subscribe,
    getConsentSnapshot,
    getServerSnapshot
  );

  const trackingEnabled = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

  useEffect(() => {
    if (!trackingEnabled) return;

    if (state === "accepted") {
      updateConsent(true, true);
    }

    if (state === "essential") {
      updateConsent(false, false);
    }
  }, [state, trackingEnabled]);

  // Tracking is not configured yet, so don't show a cookie banner
  // to the doctor during design/development previews.
  if (!trackingEnabled || state !== "unset") {
    return null;
  }

  const choose = (value: Exclude<ConsentState, "unset">) => {
    localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <div className="fixed inset-x-3 bottom-24 z-[70] mx-auto max-w-3xl rounded-2xl border border-gold/25 bg-ink/95 p-4 text-sm text-white shadow-2xl backdrop-blur md:bottom-5 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl leading-6 text-white/75">
          We use optional analytics and marketing technologies to understand
          website performance. Essential functions work without them. Do not
          submit sensitive medical information through marketing forms. See our{" "}
          <Link
            href="/privacy"
            className="text-gold underline underline-offset-4"
          >
            privacy notice
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
            onClick={() => choose("essential")}
          >
            Essential only
          </Button>

          <Button onClick={() => choose("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
