"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { trackingAllowedHere } from "@/lib/tracking-ids";
import {
  CONSENT_EVENT,
  CONSENT_STORAGE_KEY,
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
  type ConsentState,
} from "@/lib/consent";

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
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  const trackingEnabled = trackingAllowedHere();

  useEffect(() => {
    if (!trackingEnabled) return;

    if (state === "accepted") {
      updateConsent(true, true);
    }

    if (state === "essential") {
      updateConsent(false, false);
    }
  }, [state, trackingEnabled]);

  if (!trackingEnabled || state !== "unset") {
    return null;
  }

  const choose = (value: Exclude<ConsentState, "unset">) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <div
      role="dialog"
      aria-label="Privacy choices"
      aria-modal="false"
      className="fixed inset-x-2 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[70] mx-auto w-auto max-w-[34rem] rounded-2xl border border-white/10 bg-ink/96 p-3 text-white shadow-[0_18px_44px_-20px_rgba(0,0,0,.72)] backdrop-blur-xl md:inset-x-auto md:bottom-4 md:right-4 md:w-[34rem] md:max-w-[calc(100vw-2rem)] md:p-3.5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[.78rem] font-semibold tracking-[.02em] text-white">
              Your privacy
            </p>
            <Link
              href="/privacy/"
              className="text-[.68rem] text-gold/85 underline decoration-gold/35 underline-offset-4 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
            >
              Privacy
            </Link>
          </div>
          <p className="mt-1 text-[.72rem] leading-[1.45] text-white/68 md:text-[.74rem]">
            We use optional analytics to improve our website and ads.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:flex md:shrink-0">
          <Button
            variant="outline"
            className="min-h-11 border-white/15 bg-white/[.03] px-3 text-[.72rem] text-white hover:bg-white/[.07] md:min-h-10 md:px-3.5"
            onClick={() => choose("essential")}
          >
            Essential only
          </Button>

          <Button
            className="min-h-11 px-4 text-[.74rem] md:min-h-10 md:px-4"
            onClick={() => choose("accepted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
