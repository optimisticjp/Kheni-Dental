import { implantCapabilities, implantSystems, implantWarranty } from "@/content/capabilities";
import { caseResults } from "@/content/cases";
import { proofMetrics, unprovenDisplayedMetrics } from "@/content/clinic-proof";
import { implantFaqs, startingPoints, planFactors, comparison, implantProcess, implantHero } from "@/content/implant-center";
import { instagramReels } from "@/content/instagram";
import { patientStories, videoStories } from "@/content/patient-stories";
import { resourceCategories } from "@/content/patient-resources";
import { editorialLines, reviewSampleCount, reviewSampleInventory, sampleTestimonials } from "@/content/review-sample";
import { concerns, doctors, homepageFaqs, locations, site, smileNotes, treatments } from "@/content/site";
import { technology } from "@/content/technology";
import { clinicVideos } from "@/content/videos";

/**
 * Factual-claim audit, enforced at build time.
 *
 * The doctor's instructions are plain: no prices, no "painless", no
 * guarantees, no "best", nothing the clinic has not confirmed. The realistic
 * failure is not malice, it is a well-meaning edit that adds a rupee figure
 * to a FAQ or a "free consultation" to a button. So visitor-facing content is
 * scanned here and the build refuses rather than trusting anyone to remember.
 *
 * Since the September 2026 clinic form, some technique words are confirmed
 * (same-day options in suitable cases, guided implant surgery, a dental laser
 * as equipment, CBCT where the case needs it). They are no longer forbidden
 * outright, but the wording that makes them sound routine or promised still
 * is. Sedation, MDS and "all-on-4" remain unconfirmed and forbidden.
 *
 * REVIEW-SAMPLE GUARD. The preview may carry clearly marked sample content
 * and clinic figures that still need evidence. An indexable build may not.
 * If NEXT_PUBLIC_ALLOW_INDEXING is "true" (or the production flag is set)
 * while any of that exists, the build fails here.
 *
 * Imported by `src/app/layout.tsx`, so it runs on every build.
 */

const FORBIDDEN: { pattern: RegExp; why: string }[] = [
  { pattern: /₹|Rs\.?\s?\d|INR\s?\d|\$\s?\d/i, why: "no prices on the site (doctor's instruction)" },
  { pattern: /\bstarting (from|at)\b/i, why: "no price anchors" },
  { pattern: /\bEMI\b/i, why: "no finance offers until confirmed" },
  { pattern: /\bfree consultation\b|\bfree check[- ]?up\b/i, why: "not confirmed as free (form p56: Do not show)" },
  { pattern: /\bpain[- ]?free\b|\bpainless\b/i, why: "never promise painless care" },
  { pattern: /\bguarantee/i, why: "never guarantee outcomes" },
  { pattern: /\blifetime warranty\b|\blifetime guarantee\b/i, why: "warranty terms not confirmed in writing (form p4, p30)" },
  { pattern: /\bsuccess rate\b|\b\d{2,3}(\.\d)?\s?%\s?success/i, why: "no unsupported statistics (form p30: Do not show)" },
  { pattern: /\b(best|no\.?\s?1|number one|#1|leading|world[- ]class|state[- ]of[- ]the[- ]art|cutting[- ]edge|perfect smile)\b/i, why: "no superlative claims" },
  { pattern: /\bteeth in a day\b|\bsame[- ]day implants? (for everyone|always)\b|\ball[- ]on[- ]4\b/i, why: "technique promised as routine, or not confirmed" },
  { pattern: /\bsedation\b|\bMDS\b/i, why: "credential or service not confirmed" },
  { pattern: /\blaser gum\b/i, why: "laser gum treatment not ticked on form p39" },
  { pattern: /\b24\s?x\s?7\b|\bairport\b|\bhotel\b|\bvisa\b/i, why: "travel service not confirmed" },
  { pattern: /\bhappy (patients|smiles)\b|\b\d[\d,]*\+?\s*(patients treated|implants placed|smiles)\b/i, why: "volume figures live in clinic-proof.ts as metrics, never in prose" },
  { pattern: /\baward/i, why: "no awards confirmed" },
  { pattern: /under one roof/i, why: "clinic phrase to be rendered as 'comprehensive dental care in one place'" },
  { pattern: /—/, why: "no em dashes in visitor-facing copy" },
];

/** Words that legitimately appear inside a factual sentence. */
const ALLOWED_PHRASES = [
  "the best alternative for flossing is flossing", // the clinic's own video title
  "best way to reach", // form label
  "happy patient", // the clinic's own video titles
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

const SKIP_KEYS = new Set([
  "slug",
  "href",
  "id",
  "icon",
  "hue",
  "googlePlaceId",
  "googleShortUrl",
  "googleShareUrl",
  "phoneHref",
  "whatsappNumber",
  "youtubeId",
  "treatmentSlug",
  "doctorSlug",
  "branchSlug",
  "doctorSlugs",
  "branchSlugs",
  "relatedTreatmentSlugs",
  "treatmentSlugs",
  "beforeImage",
  "afterImage",
  "source",
  "provenance",
  "status",
  "evidenceNote",
  "note",
]);

function walk(label: string, value: unknown, errors: string[]) {
  if (typeof value === "string") return scan(label, value, errors);
  if (Array.isArray(value)) return value.forEach((v, i) => walk(`${label}[${i}]`, v, errors));
  if (value && typeof value === "object") {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      // Identifiers, URLs, ids and ledger notes are not visitor-facing prose.
      // `note` on a Location IS visitor-facing, so it is walked explicitly below.
      if (SKIP_KEYS.has(key)) continue;
      walk(`${label}.${key}`, v, errors);
    }
  }
}

export function assertContentIntegrity(): void {
  const errors: string[] = [];

  walk("site", site, errors);
  walk("locations", locations, errors);
  walk("locations.note", locations.map((l) => l.note), errors);
  walk("doctors", doctors, errors);
  walk("treatments", treatments, errors);
  walk("treatments.brands.note", treatments.map((t) => t.brands?.note ?? ""), errors);
  walk("treatments.offer.note", treatments.map((t) => t.offer?.note ?? ""), errors);
  walk("concerns", concerns, errors);
  walk("smileNotes", smileNotes, errors);
  walk("homepageFaqs", homepageFaqs, errors);
  walk("implantHero", implantHero, errors);
  walk("implantProcess", implantProcess, errors);
  walk("startingPoints", startingPoints, errors);
  walk("comparison", comparison, errors);
  walk("comparison.note", comparison.note, errors);
  walk("planFactors", planFactors, errors);
  walk("implantFaqs", implantFaqs, errors);
  walk("implantCapabilities", implantCapabilities, errors);
  walk("implantSystems", implantSystems, errors);
  walk("implantSystems.note", implantSystems.note, errors);
  walk("implantWarranty", { question: implantWarranty.question, answer: implantWarranty.answer }, errors);
  walk("technology", technology, errors);
  walk("resourceCategories", resourceCategories, errors);
  walk("proofMetrics.labels", proofMetrics.map((m) => `${m.label} ${m.detail ?? ""}`), errors);
  walk("reviewSample", reviewSampleInventory, errors);
  walk("videos", clinicVideos.map((v) => ({ title: v.title })), errors);
  walk("instagram", instagramReels.map((r) => ({ title: r.title, summary: r.summary, posterAlt: r.posterAlt })), errors);

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
  // Instagram content must be the clinic's own account, with a real shortcode.
  for (const r of instagramReels) {
    if (!/^[A-Za-z0-9_-]{8,14}$/.test(r.shortcode)) errors.push(`instagram reel "${r.title}" has an invalid shortcode`);
    if (r.url !== `https://www.instagram.com/reel/${r.shortcode}/`) errors.push(`instagram reel "${r.title}" does not link to its own reel on instagram.com`);
    if (r.account !== "khenielite") errors.push(`instagram reel "${r.title}" is not from @khenielite`);
  }

  // Sample testimonials may never carry a plausible name.
  for (const t of sampleTestimonials) {
    if (t.name !== "Sample patient") errors.push(`sample testimonial ${t.id} must be attributed to "Sample patient"`);
  }
  // Editorial lines are not quotations: no quote marks inside them.
  for (const l of editorialLines) {
    if (/["“”]/.test(l.line)) errors.push(`editorial line for ${l.doctorSlug} must not be written as a quotation`);
  }

  // The canonical origin must be the www host the apex redirects to.
  if (site.domain !== "https://www.khenidentalcare.com") errors.push(`site.domain must be https://www.khenidentalcare.com, got ${site.domain}`);
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "") !== site.domain) {
    errors.push(`NEXT_PUBLIC_SITE_URL (${process.env.NEXT_PUBLIC_SITE_URL}) does not match site.domain`);
  }

  // The current roster only, spelt as the clinic spelt it on its form (p15, p19).
  const historic = ["Asodariya", "Vidhi Patel", "Jinal Monapara", "Monapara"];
  for (const d of doctors) {
    if (historic.some((h) => d.name.includes(h))) errors.push(`doctor ${d.name} is from an old flyer or an old spelling, not the current roster`);
    if (d.branchSlugs.length === 0) errors.push(`doctor ${d.name} has no branch`);
    for (const slug of d.relatedTreatmentSlugs) {
      if (!treatments.some((t) => t.slug === slug)) errors.push(`doctor ${d.name} relates to unknown treatment ${slug}`);
    }
  }
  if (doctors.length !== 4) errors.push(`expected 4 doctors on the current roster, found ${doctors.length}`);
  for (const t of treatments) {
    for (const slug of t.doctorSlugs) {
      if (!doctors.some((d) => d.slug === slug)) errors.push(`treatment ${t.slug} names unknown doctor ${slug}`);
    }
  }

  // Review-sample guard: nothing sample or unproven on an indexable build.
  const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" || process.env.NEXT_PUBLIC_PRODUCTION === "true";
  if (indexable) {
    if (reviewSampleCount > 0) {
      errors.push(`NEXT_PUBLIC_ALLOW_INDEXING is true but ${reviewSampleCount} review-sample item(s) remain in src/content/review-sample.ts`);
    }
    if (unprovenDisplayedMetrics.length > 0) {
      errors.push(`NEXT_PUBLIC_ALLOW_INDEXING is true but these metrics still need evidence: ${unprovenDisplayedMetrics.map((m) => m.id).join(", ")}`);
    }
    const sampleGuides = resourceCategories.flatMap((c) => c.guides).filter((g) => g.source === "review_sample");
    if (sampleGuides.length) errors.push(`NEXT_PUBLIC_ALLOW_INDEXING is true but sample guides remain: ${sampleGuides.map((g) => g.id).join(", ")}`);
    const needsProof = doctors.flatMap((d) => [d.registration, d.college, d.memberships, d.courses].filter((f) => f?.status === "needs_proof"));
    if (needsProof.length) errors.push(`NEXT_PUBLIC_ALLOW_INDEXING is true but ${needsProof.length} doctor credential field(s) still need proof`);
    if (implantWarranty.status === "needs_proof") errors.push("NEXT_PUBLIC_ALLOW_INDEXING is true but the implant warranty wording is still unconfirmed");
    if (locations.some((l) => l.googleShareUrl?.status === "pending-verification")) {
      errors.push("NEXT_PUBLIC_ALLOW_INDEXING is true but a clinic-supplied Google share link is still unverified");
    }
  }

  if (errors.length) {
    throw new Error(["", "  Content integrity check failed:", "", ...errors.map((e) => `   - ${e}`), ""].join("\n"));
  }
}

assertContentIntegrity();
