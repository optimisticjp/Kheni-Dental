import { Container } from "@/components/ui/container";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28 lg:py-32">
      <div className="absolute -right-24 -top-24 size-96 rounded-full bg-gold/10 blur-3xl" />
      <Container width="7xl" className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[.98] tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{copy}</p>
      </Container>
    </section>
  );
}
