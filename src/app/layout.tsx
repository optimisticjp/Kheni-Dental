import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MobileCta } from "@/components/kheni/mobile-cta";
import { Ticker } from "@/components/kheni/ticker";
import { AnalyticsScripts } from "@/components/tracking/analytics";
import { ConsentBanner } from "@/components/tracking/consent-banner";
import { TrackLinks } from "@/components/tracking/track-links";
import { StructuredData } from "@/components/tracking/structured-data";
import { site } from "@/content/site";
// Fails the build if a branch's Place ID drifts or two branches ever share
// map, phone or listing data. See the file for what it guards against.
import "@/content/__checks__/branch-data.check";
// Refuses to build an indexable site while invented testimonials are active.
import "@/content/__checks__/demo-content.check";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.domain),
  title: { default: `${site.name} | Dentist in Surat`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  // One canonical per route. `trailingSlash: true` means /contact and
  // /contact/ both resolve, and without this Google is free to treat them as
  // two pages. Sub-routes override `alternates.canonical` with their own path.
  alternates: { canonical: "/" },
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

/**
 * Fonts, self-hosted at build time.
 *
 * These were two <link> tags to fonts.googleapis.com in <head>: render
 * blocking, on a third-party origin, in the critical path of every page. On
 * an Indian 4G connection that is a direct hit to LCP and it makes first
 * paint depend on a domain we do not control.
 *
 * `next/font/google` downloads both families at build time and serves them
 * from our own origin with the @font-face rules inlined, so there is no
 * extra connection, no extra round trip and no layout shift when they land.
 *
 * Fraunces carries the display voice and has an optical-size axis, so a
 * 3.75rem hero and a 1rem card title can share one family. Inter does body
 * and interface work, which is what Indian mobile traffic actually reads.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  // No `weight`: both families ship as variable fonts, which is the whole
  // reason they were chosen. Naming static weights here would download five
  // separate files and lose the opsz axis.
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0d0c", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col pb-[calc(4rem+1px+env(safe-area-inset-bottom))] md:pb-0">
        <AnalyticsScripts />
        <StructuredData />
        <TrackLinks />
        <Ticker />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCta />
        <ConsentBanner />
      </body>
    </html>
  );
}
