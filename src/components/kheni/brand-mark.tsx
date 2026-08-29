import Link from "next/link";

export function BrandMark() {
  return (
    <Link href="/" className="group inline-flex shrink-0 items-center gap-3" aria-label="Kheni Dental home">
      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/35 bg-gold/8 font-serif text-xl text-gold">K</span>
      <span className="leading-none">
        <span className="block whitespace-nowrap text-sm font-semibold uppercase tracking-[.12em] text-white">Kheni Dental</span>
        <span className="mt-1 block whitespace-nowrap text-[.62rem] uppercase tracking-[.18em] text-gold/85">Elite Implant Center</span>
      </span>
    </Link>
  );
}
