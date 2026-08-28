/**
 * Treatment cost and finance.
 *
 * Indian patients ask about cost early, and refusing to discuss it reads as
 * evasive. So the architecture exists and renders finished, but no figure is
 * published until the clinic approves it. Every amount below is a marked
 * placeholder.
 *
 * Never publish a price, an EMI amount, a finance partner or a "free
 * consultation" offer that the clinic has not confirmed.
 * See docs/CLINIC-CONTENT-NEEDED.md.
 */

export type PriceEntry = {
  id: string;
  treatment: string;
  treatmentSlug?: string;
  /** Displayed as "from ₹...". Placeholder until approved. */
  from: { status: "verified"; value: string } | { status: "pending"; placeholder: string };
  /** Optional upper end, so patients see a range rather than a teaser. */
  to?: { status: "verified"; value: string } | { status: "pending"; placeholder: string };
  /** What the quoted figure includes. */
  includes?: string;
};

export const priceList: PriceEntry[] = [
  {
    id: "implant",
    treatment: "Dental implant",
    treatmentSlug: "dental-implants-surat",
    from: { status: "pending", placeholder: "₹XX,XXX" },
    to: { status: "pending", placeholder: "₹XX,XXX" },
  },
  {
    id: "rct",
    treatment: "Root canal treatment",
    treatmentSlug: "root-canal-treatment-surat",
    from: { status: "pending", placeholder: "₹X,XXX" },
  },
  {
    id: "crown",
    treatment: "Crown",
    treatmentSlug: "crowns-and-bridges",
    from: { status: "pending", placeholder: "₹X,XXX" },
  },
  {
    id: "braces",
    treatment: "Braces and aligners",
    treatmentSlug: "braces-clear-aligners",
    from: { status: "pending", placeholder: "₹XX,XXX" },
  },
  {
    id: "smile",
    treatment: "Smile design",
    treatmentSlug: "cosmetic-smile-dentistry",
    from: { status: "pending", placeholder: "₹XX,XXX" },
  },
  {
    id: "consult",
    treatment: "Consultation",
    from: { status: "pending", placeholder: "₹XXX" },
  },
];

/**
 * Finance. Whether the clinic offers EMI at all still needs confirming, so
 * this renders as pending rather than as an offer.
 */
export const finance = {
  emiAvailable: "pending" as "pending" | "yes" | "no",
  monthlyFrom: { status: "pending" as const, placeholder: "₹X,XXX" },
  partners: [] as string[],
  /** TODO(clinic): confirm whether no-cost EMI is genuinely offered. */
  noCostEmi: "pending" as "pending" | "yes" | "no",
};

export const costNote =
  "The final figure depends on what the examination finds, how many teeth are involved and the materials chosen. You get the full plan with the cost of each stage before treatment starts.";
