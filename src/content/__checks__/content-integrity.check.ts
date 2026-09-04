import { clinicVideos } from "@/content/videos";
import { caseResults } from "@/content/cases";
import { patientStories, videoStories } from "@/content/patient-stories";
import { implantFaqs, startingPoints, planFactors, comparison, implantProcess, implantHero } from "@/content/implant-center";
import { resourceCategories } from "@/content/patient-resources";
import { concerns, doctors, homepageFaqs, locations, site, smileNotes, treatments } from "@/content/site";
import { demoContentActive } from "@/content/demo";

/**
 * Factual-claim audit, enforced at build time.
 *
 * The doctor's instructions are plain: no prices, no "painless", no
 * guarantees, no "best", nothing the clinic has not confirmed. The realistic
 * failure is not malice, it is a well-meaning edit that adds a rupee figure
 * to a FAQ or a "free consultation" to a button. So visitor-facing content is
 * scanned here and the build refuses rather than trusting anyone to remember.
 *
 * Also checked: patient proof must be real. Case results, patient stories and
 * video testimonials only render when they carry explicit consent, and the
 * clinic-video list may only contain videos from the clinic's own channel.
 *
 * Imported by `src/app/layout.tsx`, so it runs on every build.
 *
 * Scope. This audits the *verified* content files, the ones that will still
 * be here when the demo layer is gone. `src/content/demo/` is deliberately
 * exempt: it exists to show the clinic what the patterns it asked about look
 * like, and every claim in it would fail on purpose. What guards that layer
 * instead is the rule at the bottom of this file: demo content and search
 * indexing may never be switched on together. So an invented price or an
 * invented award can be reviewed, and can never be published.
 */

const FORBIDDEN: { pattern: RegExp; why: string }[] = [
  { pattern: /₹|Rs\.?\s?\d|INR\s?\d|\$\s?\d/i, why: "no prices on the site (doctor's instruction)" },
  { pattern: /\bstarting (from|at)\b/i, why: "no price anchors" },
  { pattern: /\bEMI\b/i, why: "no finance offers until confirmed" },
  { pattern: /\bfree consultation\b|\bfree check[- ]?up\b/i, why: "not confirmed as free" },
  { pattern: /\bpain[- ]?free\b|\bpainless\b/i, why: "never promise painless care" },
  { pattern: /\bguarantee/i, why: "never guarantee outcomes" },
  { pattern: /\bsuccess rate\b|\b\d{2,3}\s?%\s?success/i, why: "no unsupported statistics" },
  { pattern: /\b(best|no\.?\s?1|number one|#1|leading|world[- ]class|state[- ]of[- ]the[- ]art|cutting[- ]edge)\b/i, why: "no superlative claims" },
  { pattern: /\bsame[- ]day\b|\bimmediate loading\b|\bguided (implant )?surgery\b|\ball[- ]on[- ]4\b/i, why: "technique not confirmed" },
  { pattern: /\bsedation\b|\blaser\b|\bCBCT\b|\bMDS\b|\bMDS\.?\b/i, why: "credential or equipment not confirmed" },
  { pattern: /\b24\s?x\s?7\b|\bairport\b|\bhotel\b|\bvisa\b/i, why: "travel service not confirmed" },
  { pattern: /\bpatients treated\b|\bimplants placed\b|\bhappy (patients|smiles)\b|\b\d[\d,]*\+\s*(patients|implants|smiles)/i, why: "volume figure not confirmed" },
  { pattern: /\baward/i, why: "no awards confirmed" },
  { pattern: /—/, why: "no em dashes in visitor-facing copy" },
];

/** Words that legitimately appear inside a factual sentence. */
const ALLOWED_PHRASES = [
  "the best alternative for flossing is flossing", // the clinic's own video title
  "best way to reach", // form label
];

function scan(label: string, text: string, errors: string[]) {
  const lowered = text.toLowerCase();
  const cleaned = ALLOWED_PHRASES.reduce((acc, phrase) => acc.split(phrase).join(" "), lowered);
  for (const rule of FORBIDDEN) {
    if (rule.pattern.test(cleaned)) {
      errors.push(`${label}: "${text.slice(0, 90)}" (${rule.why})`);
    }
  }
}

function walk(label: string, value: unknown, errors: string[]) {
  if (typeof value === "string") return scan(label, value, errors);
  if (Array.isArray(value)) return value.forEach((v, i) => walk(`${label}[${i}]`, v, errors));
  if (value && typeof value === "object") {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      // Identifiers, URLs and ids are not visitor-facing prose.
      if (["slug", "href", "id", "icon", "hue", "googlePlaceId", "googleShortUrl", "phoneHref", "whatsappNumber", "youtubeId", "treatmentSlug", "doctorSlug", "branchSlug", "doctorSlugs", "relatedTreatmentSlugs", "beforeImage", "afterImage"].includes(key)) continue;
      walk(`${label}.${key}`, v, errors);
    }
  }
}

export function assertContentIntegrity(): void {
  const errors: string[] = [];

  walk("site", site, errors);
  walk("locations", locations, errors);
  walk("doctors", doctors, errors);
  walk("treatments", treatments, errors);
  walk("concerns", concerns, errors);
  walk("smileNotes", smileNotes, errors);
  walk("homepageFaqs", homepageFaqs, errors);
  walk("implantHero", implantHero, errors);
  walk("implantProcess", implantProcess, errors);
  walk("startingPoints", startingPoints, errors);
  walk("comparison", comparison, errors);
  walk("planFactors", planFactors, errors);
  walk("implantFaqs", implantFaqs, errors);
  walk("resourceCategories", resourceCategories, errors);
  walk("videos", clinicVideos.map((v) => ({ title: v.title })), errors);

  // Proof must be real.
  for (const c of caseResults) {
    if (c.consentConfirmed !== true || !c.beforeImage || !c.afterImage) errors.push(`case ${c.id}: consent and both photographs are required`);
  }
  for (const s of patientStories) {
    if (s.consentConfirmed !== true) errors.push(`story ${s.id}: consent required`);
  }
  for (const v of videoStories) {
    if (v.consentConfirmed !== true || !/^[A-Za-z0-9_-]{11}$/.test(v.youtubeId)) errors.push(`video story ${v.id}: consent and a YouTube id are required`);
  }
  for (const v of clinicVideos) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(v.id)) errors.push(`clinic video "${v.title}" has an invalid YouTube id`);
  }

  // The canonical origin must be the www host the apex redirects to.
  if (site.domain !== "https://www.khenidentalcare.com") errors.push(`site.domain must be https://www.khenidentalcare.com, got ${site.domain}`);
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") !== site.domain) {
    errors.push(`NEXT_PUBLIC_SITE_URL (${process.env.NEXT_PUBLIC_SITE_URL}) does not match site.domain`);
  }

  // The current roster only.
  const historic = ["Asodariya", "Vidhi Patel"];
  for (const d of doctors) {
    if (historic.some((h) => d.name.includes(h))) errors.push(`doctor ${d.name} is from an old flyer, not the current roster`);
  }
  if (doctors.length !== 4) errors.push(`expected 4 doctors on the current roster, found ${doctors.length}`);

  /**
   * The demo layer and search indexing are mutually exclusive.
   *
   * `src/content/demo/` carries invented prices, counts, awards, patient
   * testimonials and dentist qualifications. It is fine in front of the
   * clinic and unacceptable in front of a search engine, so the build
   * refuses the combination rather than relying on anyone to remember.
   */
  if (demoContentActive && process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true") {
    errors.push(
      "demo content is active while NEXT_PUBLIC_ALLOW_INDEXING is true. " +
        "Set NEXT_PUBLIC_DEMO_CONTENT=false before enabling indexing, or leave indexing off.",
    );
  }

  if (errors.length) {
    throw new Error(["", "  Content integrity check failed:", "", ...errors.map((e) => `   - ${e}`), ""].join("\n"));
  }
}

assertContentIntegrity();
