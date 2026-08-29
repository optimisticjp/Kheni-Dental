import { ProofNumber } from "@/components/kheni/pending";
import { Container } from "@/components/ui/container";
import { credentials, type ProofStat } from "@/content/clinic-proof";
import { cn } from "@/lib/utils";

/**
 * A row of proof numbers. This is the first thing a patient should hit after
 * the hero, because volume and experience are what Indian dental sites use to
 * establish credibility fastest.
 */
export function ProofBand({
  stats,
  className,
  tone = "dark",
}: {
  stats: ProofStat[];
  className?: string;
  tone?: "dark" | "light";
}) {
  // A figure the clinic has not sent yet is not shown at all.
  //
  // Ordering the placeholders last was not enough: "XX,XXX+" under "PATIENTS
  // TREATED" still rendered on the homepage, in the brand serif, at the same
  // size as "15 YEARS IN SURAT". A patient reading that does not see a
  // considered blank, they see a website that is not finished, and it costs
  // more trust than the missing number ever earned. The pending entries stay
  // in `clinic-proof.ts` so the clinic checklist is unchanged and filling one
  // in makes it appear here on its own.
  const shown = stats.filter((stat) => stat.value.status === "verified");
  if (shown.length === 0) return null;

  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-9 sm:gap-x-8",
        // The row lays out to however many real figures there are rather than
        // holding four slots open.
        shown.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {shown.map((stat) => (
        <ProofNumber
          key={stat.id}
          value={stat.value}
          label={stat.label}
          detail={stat.detail}
          tone={tone}
        />
      ))}
    </div>
  );
}

/** Full-width dark proof strip used directly under the homepage hero. */
export function ProofStrip({ stats }: { stats: ProofStat[] }) {
  return (
    <section className="border-y border-white/10 bg-ink py-10 text-white sm:py-12">
      <Container width="7xl">
        <ProofBand stats={stats} />
      </Container>
    </section>
  );
}

/**
 * Awards, certifications and memberships. Kept as a quiet strip rather than a
 * section with a headline, because it is reassurance and not a selling point.
 */
export function CredentialStrip({ tone = "light" }: { tone?: "dark" | "light" }) {
  // Four dashed boxes reading "Professional membership - to confirm" tell a
  // patient nothing except that nobody filled them in. Until at least one is
  // real, the strip does not exist.
  const shown = credentials.filter((item) => item.status === "verified");
  if (shown.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {shown.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex min-h-20 flex-col justify-center rounded-xl border px-4 py-3",
            tone === "dark" ? "border-white/12" : "border-border",
          )}
        >
          <p className={cn("text-sm font-medium", tone === "dark" ? "text-white/70" : "text-foreground")}>
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
}
