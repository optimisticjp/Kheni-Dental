export type TrackingEventName =
  | "whatsapp_click"
  | "phone_click"
  | "appointment_start"
  | "appointment_submit"
  | "directions_click"
  | "doctor_profile_view"
  | "treatment_view"
  | "international_patient_contact"
  | "resource_download"
  | "review_click"
  | "problem_interaction"
  | "gallery_interaction";

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
  // Keep marketing events generic. Do not send symptoms, diagnoses, form values,
  // medical history or other sensitive health information to analytics platforms.
  window.dataLayer.push(payload);
}
