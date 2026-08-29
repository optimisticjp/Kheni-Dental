import { verifiedBranches } from "@/content/google-reputation";
import { site, tickerItems } from "@/content/site";

/**
 * The positioning rail.
 *
 * Deliberately not a stock-market crawl. The reference the clinic responded to
 * uses large, quiet display type moving slowly with faded edges, so it reads as
 * a masthead rather than an advertisement. The rules that keep it that way:
 *
 *   - display type at a readable size, never 10px uppercase
 *   - one accent colour, used only on the figure inside an item
 *   - slow travel, paused on hover or keyboard focus
 *   - edges dissolved by a mask, so nothing is visibly clipped
 *   - fixed height and a duplicated track, so it cannot shift layout
 *
 * Reduced motion is handled globally: the animation duration collapses, which
 * leaves the first copy of the list sitting still and fully readable.
 */

type RailItem = { figure?: string; text: string };

const branchItems: RailItem[] = verifiedBranches.flatMap((branch) => [
  { figure: `${branch.rating} ★`, text: branch.location.displayArea },
  { figure: branch.reviewCount, text: "Google reviews" },
]);

const items: RailItem[] = [
  { figure: String(site.yearsInSurat), text: "years in Surat" },
  ...branchItems,
  { text: "Elite Implant Center" },
  ...tickerItems.map((text) => ({ text })),
];

export function Ticker() {
  // The track carries the list twice so a -50% translate loops seamlessly.
  const track = [...items, ...items];

  return (
    <div className="marquee dark-gold relative isolate overflow-hidden border-b border-gold/12 bg-[#0a0a09]">
      <div aria-hidden="true" className="bloom-gold-soft pointer-events-none absolute inset-0" />
      <div className="edge-fade-dark relative py-1.5 sm:py-3">
        <div
          className="marquee-track flex w-max items-center"
          style={{ ["--marquee-duration" as string]: "58s" }}
        >
          {track.map((item, index) => (
            <span
              key={`${item.text}-${index}`}
              className="flex items-baseline gap-1.5 whitespace-nowrap px-3.5 font-serif text-[.82rem] tracking-[-.01em] text-white/55 sm:px-5 sm:text-[1.05rem]"
              // The list is duplicated for the loop; announcing it twice would
              // be noise, so the rail is decorative to assistive technology and
              // every fact in it is stated properly elsewhere on the page.
              aria-hidden="true"
            >
              {item.figure && <strong className="font-medium text-gold">{item.figure}</strong>}
              {item.text}
              <span className="ml-3 select-none text-gold/45 sm:ml-4">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
