import { META_CONTACT_EVENTS } from "@/lib/meta";

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
  // If a GA4 tag is ever added inside GTM-MDNBGRX, delete this call the same
  // day or every conversion is counted twice.
  window.gtag?.("event", event, params);

  // Meta receives only a coarse standard Contact event. No placement, branch,
  // treatment, form field or other custom parameter is sent.
  if (META_CONTACT_EVENTS.has(payload.event)) {
    window.fbq?.("track", "Contact");
  }
}
