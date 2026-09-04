import { Container } from "@/components/ui/container";
import { demoPromises } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * The process promise strip: new teeth in a day, zero pain, a success rate
 * and a lifetime warranty. Four claims the verified site will not make and
 * none of which is confirmed.
 */
export function PromiseStrip({ className }: { className?: string }) {
  return (
    <section className={cn("hue-sunshine bg-sunshine-tint py-10 sm:py-14", className)}>
      <Container width="7xl">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {demoPromises.map((promise) => (
            <li key={promise.id} className="rounded-[1.25rem] border border-line bg-white p-5">
              <p className="font-serif text-[2rem] font-semibold leading-none text-ink">{promise.value}</p>
              <p className="mt-2 text-[.9375rem] font-semibold text-ink">{promise.title}</p>
              <p className="t-small mt-2 leading-snug text-ink-soft">{promise.copy}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
