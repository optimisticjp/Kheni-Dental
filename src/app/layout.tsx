import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BookSheet } from "@/components/kheni/book-sheet";
import { MobileDock } from "@/components/kheni/mobile-dock";
import { AnalyticsScripts } from "@/components/tracking/analytics";
import { ConsentBanner } from "@/components/tracking/consent-banner";
import { TrackLinks } from "@/components/tracking/track-links";
import { StructuredData } from "@/components/tracking/structured-data";
import { site } from "@/content/site";
// Fails the build if a branch's Place ID drifts or two branches ever share
// map, phone or listing data.
import "@/content/__checks__/branch-data.check";
// Fails the build on prices, "painless", superlatives, unconfirmed claims,
// unconsented proof or a wrong canonical origin.
import "@/content/__checks__/content-integrity.check";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.domain),
  title: { default: `${site.name} | Dentist in Surat`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

/**
 * Fonts, self-hosted at build time via next/font. Fraunces is variable with
 * optical size, SOFT and WONK axes, so one file covers a hero heading and a
 * card title. Inter carries body and interface text.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fffbf6",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      {/* Bottom padding reserves the mobile dock's height plus the phone's safe area. */}
      <body className="flex min-h-dvh flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <AnalyticsScripts />
        <StructuredData />
        <TrackLinks />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileDock />
        <BookSheet />
        <ConsentBanner />
      </body>
    </html>
  );
}
