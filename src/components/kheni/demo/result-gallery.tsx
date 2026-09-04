import { BeforeAfterSlider } from "@/components/kheni/before-after-slider";
import { ResultFrame } from "@/components/kheni/demo/art";
import { demoCases, demoResultDump } from "@/content/demo";
import { cn } from "@/lib/utils";

/** Renders an SVG frame as a data URI, so the slider can take it as an image src. */
const frameSrc = (tone: [string, string]) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="${tone[0]}"/><circle cx="300" cy="80" r="90" fill="${tone[1]}" opacity=".75"/><circle cx="90" cy="240" r="70" fill="${tone[1]}" opacity=".5"/>${Array.from(
      { length: 9 },
      (_, i) => {
        const t = (i - 4) / 4;
        const x = 200 + t * 118;
        const y = 168 + t * t * 34;
        const h = 40 - Math.abs(t) * 12;
        return `<rect x="${x - 13}" y="${y}" width="26" height="${h}" rx="9" fill="#ffffff" opacity=".92"/>`;
      },
    ).join("")}</svg>`,
  )}`;

/**
 * The unlabelled result grid.
 *
 * The reference clinics publish a wall of before/after crops with no
 * treatment, no dentist and no date attached. This is that pattern, drawn
 * rather than photographed: every frame is an illustration, not a patient.
 */
export function ResultDump({ limit = 12, className }: { limit?: number; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4", className)}>
      {demoResultDump.slice(0, limit).map((item) => (
        <li key={item.id} className={`hue-${item.hue} overflow-hidden rounded-xl border border-line bg-h-tint`}>
          <div className="relative aspect-[4/3]">
            <ResultFrame tone={item.tone} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** The labelled version: four sliders with the treatment and the timeline named. */
export function CaseWall({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {demoCases.map((c) => (
        <article key={c.id} className={`hue-${c.hue} overflow-hidden rounded-[1.5rem] border border-line bg-white`}>
          <BeforeAfterSlider
            before={frameSrc(c.before)}
            after={frameSrc(c.after)}
            beforeAlt={`Illustration standing in for a 'before' photograph: ${c.label}`}
            afterAlt={`Illustration standing in for an 'after' photograph: ${c.label}`}
            className="rounded-none"
          />
          <div className="p-4 sm:p-5">
            <p className="t-eyebrow text-h-text">{c.detail}</p>
            <p className="t-card mt-1.5">{c.label}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
