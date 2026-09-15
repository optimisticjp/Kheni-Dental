import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BeforeAfterSlider } from "@/components/kheni/before-after-slider";
import { GoogleQuotes } from "@/components/kheni/proof";
import { SampleTag } from "@/components/kheni/sample-tag";
import { caseCategories, caseDisclaimer, caseResults } from "@/content/cases";
import { reviewPreview } from "@/content/provenance";
import { sampleCases } from "@/content/review-sample";
import { doctors, locations } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Before and after.
 *
 * With real, consented cases: an editorial spread, one slider per case, each
 * with the treatment, the doctor, the clinic and when the "after" was taken.
 *
 * Without them, on the review preview: neutral SAMPLE CASE frames (plain
 * graphics, never a mouth) laid out exactly as real cases will be, so the
 * clinic can see the shape of the section. On an indexable build the section
 * falls back to a plain explanation and the Google proof. No synthetic
 * patients, ever.
 */

/** Two abstract frames drawn as data-URI SVGs, so the slider can be demonstrated without a photograph. */
const demoFrame = (label: string, a: string, b: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="${a}"/><circle cx="560" cy="180" r="170" fill="${b}" opacity=".7"/><circle cx="190" cy="470" r="150" fill="${b}" opacity=".45"/><text x="400" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#0d0d0c" opacity=".5">${label}</text></svg>`,
  )}`;

export function ResultsPreview({ limit = 2, className, placement = "results" }: { limit?: number; className?: string; placement?: string }) {
  const cases = caseResults.slice(0, limit);
  const doctorName = (slug: string) => doctors.find((d) => d.slug === slug)?.name;
  const branchName = (slug: string) => locations.find((l) => l.slug === slug)?.displayArea;

  if (cases.length > 0) {
    return (
      <div className={cn("grid gap-5 lg:grid-cols-2", className)}>
        {cases.map((c) => (
          <article key={c.id} className={`hue-${c.hue} overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
            <BeforeAfterSlider before={c.beforeImage} after={c.afterImage} beforeAlt={c.beforeAlt} afterAlt={c.afterAlt} className="rounded-none" caption={`${c.category}: ${c.result}`} />
            <div className="p-5">
              <p className="t-eyebrow text-h-text">{c.category}</p>
              <p className="t-card mt-2">&ldquo;{c.concern}&rdquo;</p>
              <p className="t-small mt-2 text-ink-soft">{c.result}</p>
              <p className="t-small mt-3 text-ink-soft/80">
                {[doctorName(c.doctorSlug), branchName(c.branchSlug), c.afterTakenAt, c.timeline].filter(Boolean).join(" · ")}
              </p>
            </div>
          </article>
        ))}
        <p className="t-small text-ink-soft lg:col-span-2">{caseDisclaimer}</p>
      </div>
    );
  }

  if (reviewPreview) {
    return (
      <div className={cn("grid gap-5 lg:grid-cols-2", className)}>
        {sampleCases.slice(0, limit).map((c) => (
          <article key={c.id} className={`hue-${c.hue} overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
            <BeforeAfterSlider
              before={demoFrame("Before", "#f1eee7", "#e6e1d6")}
              after={demoFrame("After", "#fbfaf7", "#ead49e")}
              beforeAlt="Sample frame only: a plain 'before' graphic, not a patient"
              afterAlt="Sample frame only: a plain 'after' graphic, not a patient"
              className="rounded-none"
              caption="Sample case frame. A real, consented photograph pair goes here."
            />
            <div className="p-5">
              <p className="t-eyebrow flex items-center gap-2 text-h-text">
                {c.category}
                <SampleTag />
              </p>
              <p className="t-card mt-2">{c.treatment}</p>
              <dl className="t-small mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-ink-soft">
                <dt className="font-semibold text-ink">Came in with</dt>
                <dd>{c.concern}</dd>
                <dt className="font-semibold text-ink">Treatment</dt>
                <dd>{c.result}</dd>
                <dt className="font-semibold text-ink">{c.doctorLabel}</dt>
                <dd>Sample: name to follow</dd>
                <dt className="font-semibold text-ink">{c.branchLabel}</dt>
                <dd>Sample: clinic to follow</dd>
                <dt className="font-semibold text-ink">Timeline</dt>
                <dd>{c.timeline}</dd>
                <dt className="font-semibold text-ink">Visits</dt>
                <dd>{c.visits}</dd>
              </dl>
            </div>
          </article>
        ))}
        <p className="t-small text-ink-soft lg:col-span-2">
          Sample frames for layout review. Real cases are published only with the patient&rsquo;s written permission, across {caseCategories.length} treatment areas. {caseDisclaimer}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-center", className)}>
      <div className="hue-gold">
        <BeforeAfterSlider
          before={demoFrame("Before", "#f1eee7", "#e6e1d6")}
          after={demoFrame("After", "#fbfaf7", "#ead49e")}
          beforeAlt="Illustration only: a plain 'before' frame, used to demonstrate the comparison slider"
          afterAlt="Illustration only: a plain 'after' frame, used to demonstrate the comparison slider"
          caption="A demonstration of the before and after slider using plain illustrations, not a patient."
        />
        <p className="t-small mt-2 text-ink-soft">Drag the handle or use the arrow keys. This is a demonstration of the slider, not a patient.</p>
      </div>
      <div>
        <p className="t-card">Real results, published only with written permission.</p>
        <p className="t-body mt-3 text-ink-soft">
          Before and after photographs go here as patients agree to share them, across {caseCategories.length} treatment areas:{" "}
          {caseCategories.slice(0, -1).join(", ").toLowerCase()} and {caseCategories.at(-1)?.toLowerCase()}. Until then, the honest answer about what is possible
          for you is the one the dentist gives after looking.
        </p>
        <Link href="/reviews/" data-track="review_click" data-placement={placement} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-text">
          Read what patients say on Google
          <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export { GoogleQuotes };
