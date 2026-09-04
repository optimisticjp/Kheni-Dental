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
  // Which of the two clinics a patient switched to. A branch choice is a
  // convenience preference, not health information.
  | "location_switch"
  // Section-level engagement only. Never carries which concern or which
  // situation was chosen, because that could describe the visitor's mouth.
  | "concern_interaction"
  | "implant_navigator_interaction";

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
  // Keep marketing events generic. Do not send symptoms, diagnoses, form
  // values, medical history or other sensitive health information.
  window.dataLayer.push(payload);
}
