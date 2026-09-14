import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { Highlighted } from "@/components/kheni/section-intro";
import type { Hue, Location } from "@/content/site";
import { cn, fieldClass } from "@/lib/utils";

/**
 * The closing action on a page. A full electric blue field, one line set
 * large, Book (butter) and WhatsApp. Used once per page, at the end.
 */
export function CtaBand({
  title,
  highlight,
  copy,
  placement,
  hue = "blue",
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
    <section className={cn(fieldClass(hue), "relative isolate overflow-hidden", className)}>
      <div aria-hidden="true" className="absolute -right-24 -top-32 size-[28rem] rounded-full bg-white/10" />
      <Container width="7xl" className="relative grid gap-7 py-14 sm:py-18 lg:grid-cols-[1.2fr_auto] lg:items-center lg:py-24">
        <div>
          <h2 className="t-h1 measure-head">
            <Highlighted title={title} highlight={highlight} />
          </h2>
          {copy && <p className="t-lead measure-lead muted mt-4">{copy}</p>}
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
          <BookButton placement={placement} branch={location?.slug} size="lg" variant={hue === "butter" ? "ink" : "butter"} />
          <WhatsAppButton placement={placement} location={location} message={whatsappMessage} size="lg" />
        </div>
      </Container>
    </section>
  );
}
