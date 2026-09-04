/**
 * What the Elite Implant Center can plan.
 *
 * These describe kinds of case, which is safe to publish. They deliberately
 * avoid naming a technique, a brand, a scanner, a timeline or a warranty.
 * None of those is confirmed in writing and none is published until it is.
 */

export type Capability = {
  id: string;
  title: string;
  copy: string;
};

export const implantCapabilities: Capability[] = [
  { id: "single", title: "Single tooth", copy: "One gap, replaced without touching the teeth beside it." },
  { id: "multiple", title: "Several teeth", copy: "More than one gap, planned around how your bite works." },
  { id: "full-mouth", title: "Full mouth", copy: "A fixed set of teeth supported by implants, built in stages." },
  { id: "denture", title: "Loose denture", copy: "Implants used so a denture stops moving when you eat." },
];

/** Clinic photography slots, in the order they should be shot. */
export const clinicGallerySlots = [
  "Clinic exterior",
  "Reception",
  "Treatment room",
  "Implant room",
  "Sterilisation area",
  "The team",
] as const;
