import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ConcernGlyph } from "@/components/kheni/art/treatment-art";
import { concerns, treatments, type Hue } from "@/content/site";
import { cn, fieldClass } from "@/lib/utils";

/**
 * "What is bothering you?"
 *
 * Nine big colour cards, each a real link to the right treatment page. On
 * a phone they run as a swipe rail with the next card peeking in; from lg
 * they sit in a grid. Colour rotates through the four bright moods so the
 * rail reads as one bold piece rather than nine chips. Nothing depends on
 * hover, nothing diagnoses: the cards point, the dentist decides.
 */
const ROTATION: Hue[] = ["coral", "aqua", "butter", "blue"];

export function ConcernCards({ placement = "concern_cards", className, limit }: { placement?: string; className?: string; limit?: number }) {
  const list = limit ? concerns.slice(0, limit) : concerns;
  return (
    <div className={cn("-mx-4 sm:-mx-6 lg:mx-0", className)}>
      <ul className="rail px-4 sm:px-6 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0">
        {list.map((concern, index) => {
          const hue = ROTATION[index % ROTATION.length];
          const treatment = treatments.find((t) => `/treatments/${t.slug}/` === concern.href);
          return (
            <li key={concern.id} className="w-[68vw] max-w-[18rem] sm:w-[40vw] lg:w-auto lg:max-w-none">
              <Link
                href={concern.href}
                data-track="treatment_view"
                data-placement={placement}
                className={cn(fieldClass(hue), "lift group flex h-full min-h-[15rem] flex-col justify-between rounded-[1.5rem] p-5 lg:min-h-[14rem]")}
              >
                <span className="flex items-start justify-between">
                  <span className={cn("grid size-12 place-items-center rounded-full", hue === "blue" ? "bg-white/15 text-white" : "bg-ink text-white")}>
                    <ConcernGlyph icon={concern.icon} className="size-6" />
                  </span>
                  <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-[1.75rem] font-extrabold leading-[.95] tracking-[-.035em]">{concern.label}</span>
                  <span className="muted mt-2 block text-sm font-medium">{concern.sub}</span>
                  {treatment && (
                    <span className={cn("mt-3 inline-block rounded-full px-2.5 py-1 text-[.7rem] font-bold uppercase tracking-[.1em]", hue === "blue" ? "bg-white/15" : "bg-ink/10")}>
                      {treatment.title}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
