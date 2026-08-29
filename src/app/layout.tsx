import type { Metadata, Viewport } from "next";
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
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.domain),
  title: { default: `${site.name} | Dentist in Surat`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_IN", siteName: site.name },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0d0d0c", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
          Two variable families, one request. Fraunces carries the editorial
          display voice and has an optical-size axis, so large headings get the
          high contrast a premium clinic needs while small serif text stays
          sturdy. Inter does all body and interface work, which is what Indian
          mobile traffic actually reads.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* The no-page-custom-font rule targets the Pages Router, where a font
            link outside _document loads per page. This is the App Router root
            layout, so the link is emitted once for every route. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400..700&display=swap"
        />
      </head>
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
