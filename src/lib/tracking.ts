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

  window.dataLayer = window.dataLayer || [];

  // Keep analytics context operational and generic. Do not send symptoms,
  // diagnoses, medical history, form values or treatment-specific patient data.
  window.dataLayer.push(payload);

  // Meta receives only a coarse standard Contact event. No placement, branch,
  // treatment, form field or other custom parameter is sent.
  if (META_CONTACT_EVENTS.has(payload.event)) {
    window.fbq?.("track", "Contact");
  }
}
