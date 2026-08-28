import { sectionNav } from "@/content/implant-center";

/**
 * In-page navigation for the implant experience.
 *
 * Real anchor links, so they work with the keyboard, with the browser's back
 * button and with JavaScript unavailable. Targets carry `.implant-anchor`,
 * which sets `scroll-margin-top` so a heading never lands underneath the
 * sticky header.
 *
 * Below `lg` this is a normal, non-fixed scrollable chip row. It is deliberately
 * not sticky on mobile: the five-action MobileCta dock already owns fixed
 * space there, and a second bar would crowd it.
 *
 * Server Component.
 */
export function ImplantSectionNav() {
  return (
    <nav
      aria-label="Sections on this page"
      className="border-b border-white/8 bg-ink/95 backdrop-blur lg:sticky lg:top-[74px] lg:z-30"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="-mx-1 flex snap-x snap-mandatory gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] lg:mx-0 lg:justify-start lg:gap-1.5 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {sectionNav.map((item) => (
            <li key={item.id} className="snap-start">
              <a
                href={`#${item.id}`}
                data-track="implant_section_navigation"
                data-placement={`implant_nav_${item.id}`}
                className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 text-[.8rem] font-medium text-white/55 transition-colors hover:bg-white/[.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
