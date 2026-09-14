import { BeforeAfterSlider } from "@/components/kheni/before-after-slider";
import { caseDisclaimer, caseResults } from "@/content/cases";
import { doctors, locations } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Before and after, only when it is real.
 *
 * With consented cases: an editorial spread, one slider per case, each with
 * the treatment, the doctor, the clinic and when the "after" was taken.
 * Without them this renders nothing at all. No demonstration frames, no
 * placeholders, no synthetic patients, ever.
 */
export function ResultsPreview({ limit = 2, className, category }: { limit?: number; className?: string; placement?: string; category?: string }) {
  const cases = caseResults.filter((c) => (category ? c.category === category : true)).slice(0, limit);
  const doctorName = (slug: string) => doctors.find((d) => d.slug === slug)?.name;
  const branchName = (slug: string) => locations.find((l) => l.slug === slug)?.displayArea;

  if (cases.length === 0) return null;

  return (
    <div className={cn("grid gap-5 lg:grid-cols-2", className)}>
      {cases.map((c) => (
        <article key={c.id} className={`mood-${c.hue} overflow-hidden rounded-[1.75rem] bg-white`}>
          <BeforeAfterSlider before={c.beforeImage} after={c.afterImage} beforeAlt={c.beforeAlt} afterAlt={c.afterAlt} className="rounded-none" caption={`${c.category}: ${c.result}`} />
          <div className="p-5">
            <p className="t-eyebrow text-m-text">{c.category}</p>
            <p className="t-card mt-2">&ldquo;{c.concern}&rdquo;</p>
            <p className="t-small mt-2 text-ink-soft">{c.result}</p>
            <p className="t-small mt-3 text-ink-soft/80">{[doctorName(c.doctorSlug), branchName(c.branchSlug), c.afterTakenAt, c.timeline].filter(Boolean).join(" · ")}</p>
          </div>
        </article>
      ))}
      <p className="t-small text-ink-soft lg:col-span-2">{caseDisclaimer}</p>
    </div>
  );
}

export const hasResults = caseResults.length > 0;
