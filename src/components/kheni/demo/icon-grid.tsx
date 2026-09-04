import Link from "next/link";

import { ServiceGlyph } from "@/components/kheni/demo/art";
import { demoServiceTiles } from "@/content/demo";
import { cn } from "@/lib/utils";

/**
 * The icon service grid.
 *
 * Twelve flat glyphs in a tinted circle, four across on a phone. The glyphs
 * are drawn here rather than pulled from an icon pack, so they share the
 * site's stroke weight instead of arriving from three different libraries.
 */
export function IconServiceGrid({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6 lg:gap-4", className)}>
      {demoServiceTiles.map((service) => (
        <li key={service.id} className={`hue-${service.hue}`}>
          <Link
            href={`/treatments/${service.slug}/`}
            data-track="treatment_view"
            data-placement="icon_grid"
            className="lift flex h-full flex-col items-center gap-2.5 rounded-2xl border border-line bg-white p-3 text-center sm:gap-3 sm:p-4"
          >
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-h-tint text-h-text sm:size-14">
              <ServiceGlyph glyph={service.glyph} className="size-6 sm:size-7" />
            </span>
            <span className="text-[.78rem] font-semibold leading-tight text-ink sm:text-[.875rem]">{service.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
