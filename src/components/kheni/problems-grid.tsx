import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { problems } from "@/content/site";

export function ProblemsGrid({ compact = false }: { compact?: boolean }) {
  const items = compact ? problems.slice(0, 6) : problems;
  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card md:grid-cols-2">
      {items.map((problem, index) => (
        <Link
          key={problem.title}
          href={problem.href}
          data-track="problem_interaction"
          data-placement="problems_we_treat"
          className="group relative min-h-56 border-border p-6 transition-colors hover:bg-gold/8 sm:p-8 [&:nth-child(odd)]:md:border-r [&:not(:last-child)]:border-b"
        >
          <div className="flex items-start justify-between gap-6">
            <span className="font-mono text-xs text-gold">0{index + 1}</span>
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
          </div>
          <h3 className="mt-10 font-serif text-2xl sm:text-3xl">{problem.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground opacity-100 transition-opacity md:opacity-60 md:group-hover:opacity-100">{problem.detail}</p>
          <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore options</span>
        </Link>
      ))}
    </div>
  );
}
