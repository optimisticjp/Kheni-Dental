/**
 * What the Elite Implant Center can plan.
 *
 * Page 29 of the clinic information form (14 September 2026) marks every
 * capability below. The wording keeps the distinction the doctor would make
 * in the chair: these are AVAILABLE, not always SUITABLE. Anything that
 * depends on the bone or the case says so.
 *
 * Brands (Osstem, DIO) are named as text only, spelling verified against the
 * manufacturers on 14 September 2026. No logos, no "premium" claims.
 */

export type Capability = {
  id: string;
  title: string;
  copy: string;
  /** Shown as the four headline cases on the homepage. */
  headline?: boolean;
};

export const implantCapabilities: Capability[] = [
  { id: "single", title: "Single tooth", copy: "One gap, replaced without touching the teeth beside it.", headline: true },
  { id: "multiple", title: "Several teeth", copy: "More than one gap, planned around how your bite works.", headline: true },
  { id: "bridge", title: "Implant-supported bridge", copy: "Several teeth carried by two or more implants instead of one implant per tooth." },
  { id: "full-arch", title: "Full-arch fixed teeth", copy: "A fixed set of teeth for a whole jaw, supported by implants and built in stages.", headline: true },
  { id: "denture", title: "Implant-supported denture", copy: "A denture that clips onto implants so it stops moving when you eat.", headline: true },
  { id: "grafting", title: "Bone grafting", copy: "Building up bone where there is not enough to hold an implant. Adds a healing stage." },
  { id: "sinus-lift", title: "Sinus lift", copy: "Creating room for implants in the upper back jaw when the sinus sits low." },
  { id: "guided", title: "Guided implant surgery", copy: "A surgical guide made from your imaging, used in suitable cases so the implant goes where it was planned." },
  { id: "same-day", title: "Same-day options", copy: "Placing a temporary tooth on the implant at the same visit may be possible in suitable cases after assessment. Not every case is suitable." },
  { id: "maintenance", title: "Implant maintenance", copy: "Cleaning and review visits once the final tooth is in, so the gum around it stays healthy." },
  { id: "replacement", title: "Replacing a failed implant", copy: "Removing an implant that has not worked and planning what comes next." },
];

export const headlineCapabilities = implantCapabilities.filter((c) => c.headline);

/** Implant systems the clinic named (form p4, p29, p42). Spelling verified. Text only. */
export const implantSystems = {
  title: "Implant systems we work with",
  items: [
    { name: "Osstem", country: "South Korea" },
    { name: "DIO", country: "South Korea" },
  ],
  note: "Both are established Korean implant systems. The system used for your case is discussed at the planning visit, along with why.",
} as const;

/**
 * Warranty, as the clinic put it on pages 4 and 30 (verbatim in the ledger):
 * "lifetime warranty implant no specify crown warranty its depend on oral
 * health" and "DEPENDS ON ORAL CONDITION". Until written terms arrive this
 * is the most the site says. Never "lifetime", never "guarantee".
 */
export const implantWarranty = {
  question: "Is there a warranty on implants?",
  answer:
    "Implant warranty information is available from the clinic. Coverage, and any terms for the crown on top, depend on the case and on your oral health, including how the implant is cleaned and how regularly it is reviewed. Ask at the consultation and you will be given the terms in writing.",
  status: "needs_proof" as const,
  source: "form p4, p30",
};

/** Clinic photography slots, in the order they should be shot. */
export const clinicGallerySlots = [
  "Clinic exterior",
  "Reception",
  "Treatment room",
  "Sterilisation area",
  "The team",
] as const;
