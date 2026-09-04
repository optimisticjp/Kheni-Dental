import { BookButton, WhatsAppButton } from "@/components/ui/cta";
import { Container } from "@/components/ui/container";
import { Highlighted } from "@/components/kheni/section-intro";
import type { Hue, Location } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The closing action on a page. Deep navy with a colour bloom, one line,
 * Book and WhatsApp. Used once per page, at the end.
 */
export function CtaBand({
  title,
  highlight,
  copy,
  placement,
  hue = "cobalt",
  location,
  whatsappMessage,
  className,
}: {
  title: string;
  highlight?: string;
  copy?: string;
  placement: string;
  hue?: Hue;
  location?: Location;
  whatsappMessage?: string;
  className?: string;
}) {
  return (
    <section className={cn(`hue-${hue} relative isolate overflow-hidden bg-ink text-white`, className)}>
      <div aria-hidden="true" className="absolute -left-20 -top-24 size-72 rounded-full bg-h-fill opacity-30 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 right-0 size-72 rounded-full bg-coral opacity-25 blur-3xl" />
      <Container width="7xl" className="relative grid gap-6 py-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
        <div>
          <h2 className="t-h1 measure-head [--h-text:var(--sunshine)] [--h-soft:transparent]">
            <Highlighted title={title} highlight={highlight} />
          </h2>
          {copy && <p className="t-stand measure-stand mt-3 text-white/75">{copy}</p>}
        </div>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <BookButton placement={placement} branch={location?.slug} size="lg" className="bg-white text-ink shadow-none hover:bg-porcelain" />
          <WhatsAppButton placement={placement} location={location} message={whatsappMessage} size="lg" />
        </div>
      </Container>
    </section>
  );
}
