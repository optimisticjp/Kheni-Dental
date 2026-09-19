"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";

import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeConsent,
} from "@/lib/consent";
import { META_PIXEL_ID } from "@/lib/meta";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: Fbq;
  disablePushState?: boolean;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function initializeMetaPixel() {
  if (window.fbq) return window.fbq;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      fbq.queue.push(args);
    }
  } as Fbq;

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  fbq.disablePushState = true;

  window.fbq = fbq;
  window._fbq = fbq;

  fbq("set", "autoConfig", false, META_PIXEL_ID);
  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  script.dataset.kheniMetaPixel = "true";
  document.head.appendChild(script);

  return fbq;
}

export function MetaPixel() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const pathname = usePathname();
  const initialized = useRef(false);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (consent !== "accepted") {
      if (initialized.current) {
        window.fbq?.("consent", "revoke");
      }
      return;
    }

    if (!initialized.current) {
      const fbq = initializeMetaPixel();
      fbq("consent", "grant");
      initialized.current = true;
      previousPath.current = pathname;
      return;
    }

    window.fbq?.("consent", "grant");

    if (previousPath.current !== pathname) {
      window.fbq?.("track", "PageView");
      previousPath.current = pathname;
    }
  }, [consent, pathname]);

  return null;
}
