import { META_STANDARD_EVENTS } from "@/lib/meta";
import { ADS_CONVERSION_LABELS, GOOGLE_ADS_ID } from "@/lib/tracking-ids";

export type TrackingEventName =
  | "whatsapp_click"
  | "phone_click"
  | "appointment_start"
  | "appointment_submit"
  | "directions_click"
  | "doctor_profile_view"
  | "treatment_view"
  | "international_patient_contact"
  | "google_reviews_click"
  | "review_click"
  | "navigation_click"
  | "video_play"
  | "location_switch"
  | "concern_interaction"
  | "implant_navigator_interaction"
  | "instagram_reel_open"
  | "instagram_profile_click";

export type TrackingPayload = {
  event: TrackingEventName;
  placement?: string;
  interaction?: string;
  branch?: string;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function pushTrackingEvent(payload: TrackingPayload) {
  if (typeof window === "undefined") return;

  const { event, ...rest } = payload;
  const params = Object.fromEntries(
    Object.entries(rest).filter(([, value]) => value !== undefined),
  );

  window.dataLayer = window.dataLayer || [];

  // Keep analytics context operational and generic. Do not send symptoms,
  // diagnoses, medical history, form values or treatment-specific patient data.
  //
  // This push is read by Google Tag Manager, and by GTM only. A plain object
  // pushed to the dataLayer is a custom event trigger; gtag.js does not
  // interpret it, so it reaches GA4 only if a tag inside the container sends
  // it there.
  window.dataLayer.push(payload);

  // GA4, directly. It loads from `analytics.tsx` rather than from inside the
  // container, so without this call the events above land nowhere: the
  // container holds no GA4 tag, on purpose, because running both routes
  // double-counts every session.
  //
  // Off the clinic's domain `gtag.js` is never loaded, so this only queues
  // into the dataLayer and transmits nothing. See `tracking-ids.ts`.
  //
  // If a GA4 tag is ever added inside the container, delete this call the
  // same day or every conversion is counted twice.
  window.gtag?.("event", event, params);

  // Google Ads, but only for the handful of events that have a conversion
  // action behind them, and only once those actions exist. See
  // ADS_CONVERSION_LABELS. No placement or branch is sent: an advertising
  // platform gets the fact that someone made contact, nothing describing
  // them.
  const label = ADS_CONVERSION_LABELS[event];
  if (label) {
    window.gtag?.("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
    });
  }

  // Meta receives a standard event and no custom parameters at all. See
  // META_STANDARD_EVENTS for what is deliberately withheld.
  const metaEvent = META_STANDARD_EVENTS[event];
  if (metaEvent) {
    window.fbq?.("track", metaEvent);
  }
}
