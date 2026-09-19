import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BeforeAfterSlider } from "@/components/kheni/before-after-slider";
import { GoogleQuotes } from "@/components/kheni/proof";
import { caseCategories, caseDisclaimer, caseResults } from "@/content/cases";
import { sampleCases } from "@/content/review-sample";
import { doctors, locations } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Before and after.
 *
 * With real, consented cases: an editorial spread, one slider per case, with
 * the treatment and whatever of the doctor, the clinic and the "after" date
 * the clinic has attributed. Those three are optional and the meta line
 * filters out what is missing, because the clinic shows that the work was
 * done rather than who did it, and a case with no line under it is better
 * than a case with a guessed one.
 *
 * Until those arrive, the same layout runs on placeholder case facts from
 * `review-sample.ts`. The IMAGES are not faked: the slider carries designed
 * graphics rather than an invented mouth, because a fabricated clinical
 * photograph is evidence rather than decoration. Real consented photographs
 * drop into exactly these frames with no layout change.
 */

/** Two abstract frames drawn as data-URI SVGs, so the slider can be shown without a photograph. */
const demoFrame = (label: string, a: string, b: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="${a}"/><circle cx="560" cy="180" r="170" fill="${b}" opacity=".7"/><circle cx="190" cy="470" r="150" fill="${b}" opacity=".45"/><text x="400" y="318" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#1a1512" opacity=".5">${label}</text></svg>`,
  )}`;

const BEFORE = demoFrame("Before", "#f1ede6", "#e4ded2");
const AFTER = demoFrame("After", "#faf8f5", "#f7e6ae");

export function ResultsPreview({ limit = 2, className, placement = "results" }: { limit?: number; className?: string; placement?: string }) {
  const cases = caseResults.slice(0, limit);
  const doctorName = (slug?: string) => (slug ? doctors.find((d) => d.slug === slug)?.name : undefined);
  const branchName = (slug?: string) => (slug ? locations.find((l) => l.slug === slug)?.displayArea : undefined);

  if (cases.length > 0) {
    return (
      <div className={cn("grid gap-5 lg:grid-cols-2", className)}>
        {cases.map((c) => (
          <article key={c.id} className={`hue-${c.hue} overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
            <BeforeAfterSlider before={c.beforeImage} after={c.afterImage} beforeAlt={c.beforeAlt} afterAlt={c.afterAlt} className="rounded-none" caption={`${c.category}: ${c.result}`} />
            <div className="p-5">
              <p className="t-eyebrow text-h-text">{c.category}</p>
              {/* No quote marks. `concern` is a description of what the
                  patient came in with, written here; wrapped in quotes it
                  reads as a sentence the patient said, which it is not. */}
              <p className="t-card mt-2">{c.concern}</p>
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

  return (
    <div className={cn("grid gap-5 lg:grid-cols-2", className)}>
      {sampleCases.slice(0, limit).map((c) => (
        <article key={c.id} className={`hue-${c.hue} overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
          <BeforeAfterSlider
            before={BEFORE}
            after={AFTER}
            beforeAlt="Illustration standing in for the before photograph, so the comparison slider can be shown"
            afterAlt="Illustration standing in for the after photograph, so the comparison slider can be shown"
            className="rounded-none"
            caption={`${c.category}: ${c.result}`}
          />
          <div className="p-5">
            <p className="t-eyebrow text-h-text">{c.category}</p>
            <p className="t-card mt-2">&ldquo;{c.concern}&rdquo;</p>
            <p className="t-small mt-2 text-ink-soft">{c.treatment}. {c.result}.</p>
            <dl className="t-small mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-ink-soft">
              <dt className="font-semibold text-ink">Treating dentist</dt>
              <dd>{c.doctor}</dd>
              <dt className="font-semibold text-ink">Clinic</dt>
              <dd>{c.branch}</dd>
              <dt className="font-semibold text-ink">Timeline</dt>
              <dd>{c.timeline}</dd>
              <dt className="font-semibold text-ink">Visits</dt>
              <dd>{c.visits}</dd>
            </dl>
          </div>
        </article>
      ))}
      <div className="lg:col-span-2">
        <p className="t-small text-ink-soft">{caseDisclaimer}</p>
        <Link href="/reviews/" data-track="review_click" data-placement={placement} className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-text">
          Read what patients say on Google
          <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export { GoogleQuotes, caseCategories };
