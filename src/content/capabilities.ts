/**
 * Technology, implant systems and implant capability.
 *
 * The clinic genuinely has equipment and implant capability, but none of the
 * specifics are confirmed in writing yet. Rather than hiding these sections,
 * the architecture renders finished cards with the value marked as pending, so
 * the doctors can see the shape of the page and fill in the blanks.
 *
 * Never publish a technology, implant system, surgical technique or warranty
 * that has not been confirmed. That means no CBCT, no scanner brand, no guided
 * surgery, no All-on-4, no immediate loading and no named implant brand until
 * the clinic supplies it. See docs/CLINIC-CONTENT-NEEDED.md.
 */

export type Technology = {
  id: string;
  /** Real name once supplied, e.g. "CBCT 3D scanner". */
  name?: string;
  /** The patient-facing point: what it lets the dentist see or do. */
  purpose?: string;
  /** What the patient actually experiences. */
  experience?: string;
  image?: string;
  status: "verified" | "pending";
};

export type ImplantSystem = {
  id: string;
  /** Brand name, only once the clinic confirms which systems it uses. */
  name?: string;
  origin?: string;
  logo?: string;
  status: "verified" | "pending";
};

export type Capability = {
  id: string;
  /** Patient-facing label. Safe to show: these describe case types, not claims. */
  title: string;
  /** One short line. */
  copy: string;
  /**
   * `available` items are already described in verified site content.
   * `pending` items need the doctor to confirm before any detail is shown.
   */
  status: "available" | "pending";
};

/** TODO(clinic): confirm the equipment list and what each machine is used for. */
export const technologies: Technology[] = [
  { id: "tech-1", status: "pending" },
  { id: "tech-2", status: "pending" },
  { id: "tech-3", status: "pending" },
  { id: "tech-4", status: "pending" },
];

/** TODO(clinic): confirm which implant systems are used and at which branch. */
export const implantSystems: ImplantSystem[] = [
  { id: "sys-1", status: "pending" },
  { id: "sys-2", status: "pending" },
  { id: "sys-3", status: "pending" },
  { id: "sys-4", status: "pending" },
];

/**
 * Implant case types. These describe the kind of case a patient may have,
 * which is safe to publish, and deliberately avoid claiming a specific
 * surgical technique or timeline.
 */
export const implantCapabilities: Capability[] = [
  {
    id: "single",
    title: "Single tooth implant",
    copy: "One gap, replaced without touching the teeth beside it.",
    status: "available",
  },
  {
    id: "multiple",
    title: "Multiple implants",
    copy: "Several missing teeth restored, planned around your bite.",
    status: "available",
  },
  {
    id: "full-mouth",
    title: "Full mouth implants",
    copy: "A fixed set of teeth supported by implants, planned in stages.",
    status: "available",
  },
  {
    id: "denture-support",
    title: "Support for a loose denture",
    copy: "Implants used so a denture stops moving when you eat.",
    status: "available",
  },
];

/**
 * Workflow detail patients ask about. Kept as pending until the clinic
 * confirms exactly what it offers, because each of these is a clinical claim.
 */
export const implantWorkflowPending = [
  "Digital implant planning",
  "Bone procedures",
  "Immediate loading options",
  "Implant warranty",
] as const;

/** Clinic photography slots, in the order they should be shot. */
export const clinicGallerySlots = [
  "Clinic exterior",
  "Reception",
  "Waiting area",
  "Treatment room",
  "Implant suite",
  "Sterilisation area",
  "Technology",
  "The team",
] as const;
