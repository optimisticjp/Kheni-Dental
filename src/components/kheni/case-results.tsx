import { MediaFrame, PendingTag, gapBorder, showContentGaps } from "@/components/kheni/pending";
import { googleReputation } from "@/content/google-reputation";
import { PENDING_CASE_TILES, caseCategories, caseDisclaimer, caseResults } from "@/content/cases";
import { doctors, locations } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Before and after.
 *
 * Framed as case stories rather than a wall of tooth photographs. Thirty
 * identical pairs teach a patient nothing; one case told properly — what the
 * person arrived with, what was done, by whom, over how long — is what makes
 * somebody believe their own case has been thought about.
 *
 * So there are two presentations:
 *
 *   FeaturedCase   one case, given an editorial spread
 *   CaseArchive    the rest, compact and quiet
 *
 * The pending state holds the finished composition of each. Placeholders stay
 * recessive: on a page with no photographs yet, the layout should read as
 * deliberately awaiting images, not as a grid of alarm labels.
 */

const doctorName = (slug?: string) => doctors.find((d) => d.slug === slug)?.name;
const branchName = (slug?: string) => locations.find((l) => l.slug === slug)?.displayArea;

/** The Before / After chip that sits on each frame. */
function StageLabel({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[.58rem] font-semibold uppercase tracking-[.14em]",
        accent ? "bg-gold text-ink" : "bg-ink/80 text-white",
      )}
    >
      {children}
    </span>
  );
}

/** Side-by-side before/after pair. The only place the two images ever meet. */
function BeforeAfter({
  before,
  after,
  tone = "light",
  large = false,
}: {
  before?: string;
  after?: string;
  tone?: "dark" | "light";
  large?: boolean;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", large && "gap-3")}>
      <figure className="relative">
        {before ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={before} alt="Before treatment" className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
        ) : (
          <MediaFrame shot="Before" tone={tone} ratio="1 / 1" className="rounded-xl" compact />
        )}
        <StageLabel>Before</StageLabel>
      </figure>
      <figure className="relative">
        {after ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={after} alt="After treatment" className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
        ) : (
          <MediaFrame shot="After" tone={tone} ratio="1 / 1" className="rounded-xl" compact />
        )}
        <StageLabel accent>After</StageLabel>
      </figure>
    </div>
  );
}

/**
 * The lead case. An asymmetric spread: images on one side, the story on the
 * other, with the patient's starting concern set as the pull-quote because
 * that is the line a prospective patient recognises themselves in.
 */
export function FeaturedCase({ tone = "light" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const featured = caseResults.find((c) => c.featured) ?? caseResults[0];

  // Field labels double as the brief for the clinic when the case is pending.
  const meta = featured
    ? [
        ["Treatment", featured.category],
        ["Treated by", doctorName(featured.doctorSlug) ?? "—"],
        ["Clinic", branchName(featured.branchSlug) ?? "—"],
        ["After photo", featured.afterTakenAt],
        ...(featured.timeline ? [["Visits", featured.timeline] as const] : []),
      ]
    : [
        ["Treatment", null],
        ["Treated by", null],
        ["Clinic", null],
        ["After photo", null],
        ["Visits", null],
      ];

  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-[1.5rem] border",
        dark ? "grain border-white/12 bg-white/[.03] text-white" : "border-border bg-card",
      )}
    >
      <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-12 lg:p-9">
        <BeforeAfter
          before={featured?.beforeImage}
          after={featured?.afterImage}
          tone={tone}
          large
        />

        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="font-mono text-[.65rem] text-gold">
              CASE 01
            </span>
            <span aria-hidden="true" className="rule-gold h-px w-12" />
          </div>

          {featured ? (
            <>
              <blockquote className="t-quote measure-narrow mt-6 text-gold">
                &ldquo;{featured.startingConcern}&rdquo;
              </blockquote>
              <p className={cn("t-body measure-narrow mt-5", dark ? "text-white/60" : "text-muted-foreground")}>
                {featured.whatWasDone ?? featured.resultSummary}
              </p>
              {featured.stages && featured.stages.length > 0 && (
                <ol className="mt-6 space-y-2.5">
                  {featured.stages.map((stage, index) => (
                    <li key={stage} className="flex gap-3 text-sm leading-6">
                      <span aria-hidden="true" className="font-mono text-[.6rem] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={dark ? "text-white/65" : "text-muted-foreground"}>{stage}</span>
                    </li>
                  ))}
                </ol>
              )}
            </>
          ) : (
            <>
              <p className={cn("t-quote measure-narrow mt-6", dark ? "text-white/25" : "text-foreground/25")}>
                &ldquo;The sentence the patient arrived with.&rdquo;
              </p>
              <p className={cn("t-body measure-narrow mt-5", dark ? "text-white/35" : "text-muted-foreground/60")}>
                What was actually done, in plain words, followed by the stages it took.
              </p>
              <PendingTag className="mt-5" label="Consented case needed" tone="marked" />
            </>
          )}

          <dl className={cn("mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-6 sm:grid-cols-3", dark ? "border-white/10" : "border-border")}>
            {meta.map(([label, value]) => (
              <div key={label as string}>
                <dt className={cn("t-eyebrow", dark ? "text-white/35" : "text-muted-foreground/70")}>{label}</dt>
                <dd
                  className={cn(
                    "mt-1.5 text-sm",
                    value ? "font-medium" : dark ? "text-white/20" : "text-foreground/20",
                  )}
                >
                  {value ?? "—"}
                </dd>
              </div>
            ))}
          </dl>

          {featured?.patientComment && (
            <p className={cn("t-small mt-6 border-l-2 border-gold/40 pl-4 italic", dark ? "text-white/55" : "text-muted-foreground")}>
              {featured.patientComment}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * The archive. Compact and repeatable, sized so a real set of cases reads as
 * a body of work rather than a slideshow.
 */
export function CaseResultsGrid({ limit, tone = "light" }: { limit?: number; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  const rest = caseResults.filter((c) => !c.featured);
  const cases = limit ? rest.slice(0, limit) : rest;

  if (cases.length > 0) {
    return (
      <>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.id}
              className={cn("rounded-2xl border p-3", dark ? "border-white/10 bg-white/[.03] text-white" : "border-border bg-card")}
            >
              <BeforeAfter before={item.beforeImage} after={item.afterImage} tone={tone} />
              <div className="p-3 pt-4">
                <p className="t-eyebrow text-gold">{item.category}</p>
                <p className="t-card mt-2">{item.startingConcern}</p>
                <p className={cn("t-small mt-2", dark ? "text-white/50" : "text-muted-foreground")}>
                  {item.resultSummary}
                </p>
                <p className={cn("t-small mt-3", dark ? "text-white/30" : "text-muted-foreground/70")}>
                  {[doctorName(item.doctorSlug), branchName(item.branchSlug), item.afterTakenAt]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className={cn("t-small mt-6", dark ? "text-white/40" : "text-muted-foreground")}>{caseDisclaimer}</p>
      </>
    );
  }

  // Pending.
  //
  // This used to render six cards, each with an empty before and after plate
  // under the words "The patient's starting concern". Twelve blank frames
  // arranged as an archive is not a preview of results, it is a claim to have
  // results and then not showing them, which is the one thing a before-and-
  // after page must not do. So the archive shape is for the clinic's own
  // review, and a patient gets one honest panel instead.
  if (showContentGaps) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit ?? PENDING_CASE_TILES }).map((_, index) => (
          <article
            key={index}
            className={cn("rounded-2xl border p-3", gapBorder, dark ? "border-white/10" : "border-border/70")}
          >
            <BeforeAfter tone={tone} />
            <div className="p-3 pt-4">
              <p className={cn("t-eyebrow", dark ? "text-white/30" : "text-muted-foreground/60")}>
                {caseCategories[index % caseCategories.length]}
              </p>
              <p className={cn("t-card mt-2", dark ? "text-white/20" : "text-foreground/20")}>
                The patient&rsquo;s starting concern
              </p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-8",
        dark ? "border-white/10 bg-white/[.03] text-white" : "border-border bg-card",
      )}
    >
      <p className="t-card measure-narrow">
        We photograph results only when the patient has agreed to it in writing.
      </p>
      <p className={cn("t-small measure-body mt-3", dark ? "text-white/55" : "text-muted-foreground")}>
        That consent is being collected case by case, across {caseCategories.length} treatment areas, so this page
        fills up slowly rather than all at once. Until then the honest answer about what is possible in your case is
        the one Dr. Mayur gives you after looking at it.
      </p>
      <p className={cn("t-small mt-4", dark ? "text-white/40" : "text-muted-foreground/80")}>
        Our {googleReputation.combinedReviews} Google reviews, across both clinics, are written by those patients in
        the meantime.
      </p>
    </div>
  );
}
