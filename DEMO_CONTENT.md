# Demo content layer

**No prices anywhere.** The doctor's standing instruction that treatment
rates are not published holds in this layer too: there are no rupee figures,
ranges, EMI lines or estimates on any page, with the flag on or off.

Everything in `src/content/demo/` and `src/components/kheni/demo/` is
**invented**. It exists so the clinic can see what the marketing patterns the
verified site leaves out actually look like on this design, and decide which
of them to keep.

## The switch

```
NEXT_PUBLIC_DEMO_CONTENT=false   # verified site only, invented content gone
                                  # (anything else, including unset, = demo on)
NEXT_PUBLIC_ALLOW_INDEXING=true  # search indexing on
```

`src/content/__checks__/content-integrity.check.ts` **fails the build** if
both are on at once. An invented price or an invented award can therefore be
reviewed on a private preview and can never reach a search engine.

To go live on real content: replace what is listed below, set
`NEXT_PUBLIC_DEMO_CONTENT=false`, delete `src/content/demo/` and
`src/components/kheni/demo/`, then remove the demo blocks from the pages.

## What is invented

| Item | Where | Notes |
| --- | --- | --- |
| Volume counters (32,400 patients, 9,600 implants, and the rest) | `demoStats` | Nothing is counted. Numbers chosen to look plausible. |
| Superlative hero copy ("best", "#1", "painless", "world-class", "guaranteed") | `demoSuperHero`, `demoMarqueeClaims` | None of it is supportable. |
| Process promises (new teeth in a day, 98.6% success, lifetime warranty) | `demoPromises` | Timing, success rate and warranty are all made up. |
| Dentist qualifications and memberships (M.D.S., fellowships, certifications) | `demoCredentials` | **Highest risk.** These are fabricated qualifications attached to four real, named dentists. All four hold B.D.S. Replace or delete before anything goes public. |
| Awards and accreditation | `demoAwards`, `demoAccreditations` | Fictional award bodies. |
| Press mastheads and quotes | `demoPress` | Fictional publications. No real outlet has covered the clinic. |
| Notable patients | `demoNotables` | Fictional people. Nobody has endorsed the clinic. |
| Written testimonials (16) | `demoTestimonials` | Invented names, cities, quotes, ratings and dates. |
| Rating summary (4.9, 1,284 reviews) | `demoRatingSummary` | Not the clinic's real Google figures, which are in `src/content/google-reputation.ts`. |
| Video testimonials (8) | `demoVideoStories` | The YouTube ids are **real** clips from the clinic's own channel, used only so a poster frame loads. The names, places, treatments and quotes attached to them are invented and do not describe those videos. |
| Before/after cases and the unlabelled result wall | `demoCases`, `demoResultDump` | Drawn SVG frames, not patients. |
| Photography | `src/components/kheni/demo/art.tsx` | Drawn gradient fields at the exact crop a real photograph will take. No stock imagery is used or linked. |
| "Free consultation" CTA | `demoSuperHero` | Not confirmed as free. The "Ask a dentist" side tab offers a look at a photo, not an estimate. |

## Where each pattern renders

- **Homepage** stock hero, claim marquee, press strip, promise strip, icon
  grid, horizontal accordion, stat band, six testimonials plus the rating
  summary, four video testimonials, awards row, press quotes, the labelled
  case wall.
- **/treatments/** icon grid.
- **/treatments/[slug]/** the treatment's testimonials and a four-tile result
  grid.
- **/treatments/dental-implants-surat/** promise strip, implant stat band,
  testimonials, case wall, video wall.
- **/reviews/** rating summary, full sixteen-card testimonial wall, video
  wall, awards and press.
- **/smile-gallery/** labelled case wall, the unlabelled twelve-tile grid,
  video wall.
- **/problems-we-treat/** the fourteen-panel horizontal accordion.
- **/doctors/[slug]/** invented qualifications and the doctor's testimonials.
- **/about/** stat band, claim marquee, press strip, awards, press quotes,
  notable patients.
- **Every page** the rotated "Ask a dentist" side tab and a one-line sample
  content notice above the footer.

## Known costs of these patterns

Worth weighing before keeping any of them.

- The homepage runs to about 19,000px on a 390px phone, well over the
  verified 12,400px. Eleven marketing patterns stacked on one page is what
  that costs.
- The rotated side tab is fixed to the right edge and floats over whatever is
  behind it, including headings. That is what a fixed side tab does; it is not
  a layout bug that can be fixed while keeping the pattern.
- Fourteen accordion panels only fit a desktop row at 3.25rem spines. Add a
  fifteenth and the open panel starts losing width.

## Live in production

As of 5 September 2026 this layer is deployed to https://www.khenidentalcare.com
with `NEXT_PUBLIC_DEMO_CONTENT` unset, which means **on**. The clinic owner
asked for it to go live so the patterns can be judged on the real domain.

What that means in practice:

- Search engines are still shut out. The build refuses to compile with demo
  content active and `NEXT_PUBLIC_ALLOW_INDEXING=true`, so production carries
  `<meta name="robots" content="noindex, nofollow">` and a robots.txt that
  names every major crawler. Google will not list these pages.
- The pages are still publicly reachable. Anyone with a link, or anyone who
  types the address, sees the invented content.

To take it down, set `NEXT_PUBLIC_DEMO_CONTENT=false` in the deploy
environment (`.github/workflows/deploy-cloudflare.yml`, the "Build for
Cloudflare" step) and push. Production reverts to the verified site with no
code changes.

### Replace before this site is promoted anywhere

In priority order:

1. `demoCredentials` in `src/content/demo/index.ts`. Fabricated M.D.S.
   degrees, fellowships and certifications on Dr. Mayur Kheni, Dr. Jinal
   Monapara, Dr. Ishita Dobariya and Dr. Parita Vastarpara. All four hold
   B.D.S. This is a claim about identifiable real people's professional
   qualifications, published on a healthcare site.
2. `demoTestimonials` and `demoVideoStories`. Sixteen invented patients and
   eight invented video captions. The video ids are real clinic clips; the
   people named on those cards did not say those things.
3. `demoAwards` and `demoPress`. Fictional award bodies and mastheads.
4. `demoNotables`. Fictional public figures presented as patients.
5. `demoStats`, `demoPromises`, `demoSuperHero`, `demoMarqueeClaims`. The
   volume counts, the 98.6% success rate, the lifetime warranty, "painless",
   "#1" and "guaranteed".
