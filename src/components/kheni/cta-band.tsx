import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { Highlighted } from "@/components/kheni/section-intro";
import type { Hue, Location } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The closing action on a page. Near-black with warm grain and a low gold
 * bloom, one line in Fraunces, a gold Book and WhatsApp. Once per page.
 */
export function CtaBand({
  title,
  highlight,
  copy,
  placement,
  location,
  whatsappMessage,
  className,
}: {
  title: string;
  highlight?: string | string[];
  copy?: string;
  placement: string;
  hue?: Hue;
  location?: Location;
  whatsappMessage?: string;
  className?: string;
}) {
  return (
    <section className={cn("on-dark grain relative isolate overflow-hidden border-t border-ivory/10 bg-ink text-ivory", className)}>
      <div aria-hidden="true" className="bloom-gold pointer-events-none absolute inset-0" />
      <Container width="7xl" className="relative grid gap-6 sec lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <span aria-hidden="true" className="rule-gold mb-5 block h-px w-14" />
          <h2 className="t-h1 measure-head">
            <Highlighted title={title} highlight={highlight} />
          </h2>
          {copy && <p className="t-stand measure-stand mt-3 text-ivory/70">{copy}</p>}
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <BookButton placement={placement} branch={location?.slug} size="lg" />
          <WhatsAppButton placement={placement} location={location} message={whatsappMessage} size="lg" variant="onDark" />
        </div>
      </Container>
    </section>
  );
}
