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
      <body className="flex min-h-dvh flex-col pb-16 md:pb-0">
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
