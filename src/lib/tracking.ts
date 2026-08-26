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
  // Intentionally generic: do not send symptoms, diagnoses, form values,
  // treatment-specific patient data or other sensitive health information.
  window.dataLayer.push(payload);
}
