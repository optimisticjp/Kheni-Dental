/**
 * Clinic technology, by category.
 *
 * Page 43 of the clinic information form ticks these categories and leaves
 * every brand and model field blank. So the site names the category, says
 * what it does for the patient, and never a manufacturer, a model or "the
 * latest". `modelConfirmed` flips to true only when the clinic sends the
 * details listed in docs/TECHNOLOGY-DETAILS-NEEDED.md.
 *
 * Not listed, because the clinic did not tick them: OPG, CBCT / 3D scan,
 * Digital Smile Design software, 3D printer. CBCT appears in the implant
 * assessment copy with a TO CONFIRM marker because page 29 names it.
 */

import type { Provenance } from "@/content/provenance";

export type TechnologyItem = {
  id: string;
  /** Category name a patient can understand. */
  title: string;
  /** What it lets the dentist see or do for you. */
  copy: string;
  /** Which treatment pages this is relevant to. */
  treatmentSlugs: string[];
  clinicConfirmed: true;
  modelConfirmed: false;
  provenance: Provenance;
};

const p43: Provenance = { status: "clinic_supplied", source: "form p43", lastChecked: "2026-09-14", evidence: "manufacturer and model for each item" };

export const technology: TechnologyItem[] = [
  { id: "digital-xray", title: "Digital dental X-ray", copy: "Shows what is happening under the enamel and between teeth, on screen while you are in the chair.", treatmentSlugs: ["dental-check-up-surat", "root-canal-treatment-surat", "wisdom-tooth-oral-surgery", "dental-implants-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "intraoral-scanner", title: "Intraoral scanner", copy: "A digital impression of your teeth instead of a tray of putty, used for aligners, crowns and planning.", treatmentSlugs: ["braces-clear-aligners", "crowns-and-bridges", "cosmetic-smile-dentistry"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "intraoral-camera", title: "Intraoral camera", copy: "Lets you see the tooth the dentist is talking about, on the screen, before anything is decided.", treatmentSlugs: ["dental-check-up-surat", "tooth-fillings-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "microscope", title: "Dental microscope", copy: "Magnification for fine work inside a tooth, such as finding and cleaning narrow root canals.", treatmentSlugs: ["root-canal-treatment-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "rotary-endo", title: "Rotary root canal system", copy: "Motor-driven files that shape root canals more evenly than hand files alone.", treatmentSlugs: ["root-canal-treatment-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "apex-locator", title: "Apex locator", copy: "Measures the length of a root canal electronically, so the filling stops where the root ends.", treatmentSlugs: ["root-canal-treatment-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "laser", title: "Dental laser", copy: "Used for selected soft tissue procedures where the dentist judges it suitable.", treatmentSlugs: [], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "cad-cam", title: "CAD/CAM", copy: "Computer-aided design and manufacture for crowns and other restorations, with our lab partner.", treatmentSlugs: ["crowns-and-bridges", "cosmetic-smile-dentistry", "full-mouth-rehabilitation"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "implant-planning", title: "Implant planning software", copy: "Plans where an implant should sit before the appointment, from your imaging.", treatmentSlugs: ["dental-implants-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "guided-kit", title: "Guided implant kit", copy: "A surgical guide made from the plan, so the implant is placed where it was planned. Used in suitable cases.", treatmentSlugs: ["dental-implants-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "autoclave", title: "Autoclave sterilisation", copy: "Instruments are sterilised under pressure and heat between patients and kept in sealed pouches.", treatmentSlugs: [], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
  { id: "ultrasonic-scaler", title: "Ultrasonic scaler", copy: "Removes hardened deposits from teeth with fine vibration and water, as part of a cleaning.", treatmentSlugs: ["dental-check-up-surat", "gum-care-surat"], clinicConfirmed: true, modelConfirmed: false, provenance: p43 },
];

export const technologyFor = (slug: string) => technology.filter((t) => t.treatmentSlugs.includes(slug));

/**
 * Imaging the implant assessment may use. X-ray is confirmed on pages 29,
 * 31 and 43. CBCT is named on page 29 but not ticked on page 43, so it is
 * stated as "where the case needs it" and flagged to confirm.
 */
export const implantImaging = {
  copy: "Planning starts with X-rays and, where the case needs it, 3D imaging (CBCT), so the bone can be measured rather than guessed.",
  provenance: { status: "needs_proof", source: "form p29 vs p43", evidence: "confirm whether CBCT is in-house or referred" } satisfies Provenance,
};
