import { PendingTag, ProofNumber } from "@/components/kheni/pending";
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
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat) => (
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
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {credentials.map((item) => (
        <div
          key={item.id}
          className={cn(
            "flex min-h-20 flex-col justify-center rounded-xl border border-dashed px-4 py-3",
            tone === "dark" ? "border-white/12" : "border-border",
          )}
        >
          <p className={cn("text-sm font-medium", tone === "dark" ? "text-white/70" : "text-foreground")}>
            {item.title}
          </p>
          {item.status === "pending" && <PendingTag className="mt-2 self-start" label="To confirm" />}
        </div>
      ))}
    </div>
  );
}
