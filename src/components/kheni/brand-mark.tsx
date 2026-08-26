import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Kheni Elite home" className={cn("group inline-flex items-center gap-3", className)}>
      <span aria-hidden="true" className="grid size-10 place-items-center rounded-full border border-gold/60 bg-gold/10 font-serif text-lg text-gold shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]">K</span>
      <span className="leading-none">
        <span className="block font-serif text-lg tracking-[0.08em] text-current">KHENI ELITE</span>
        <span className="mt-1 block text-[0.58rem] font-medium uppercase tracking-[0.24em] text-current/55">Dental & Implant Center</span>
      </span>
    </Link>
  );
}
