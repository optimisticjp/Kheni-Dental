import Script from "next/script";

import { GA4_ID, GTM_ID, PRODUCTION_HOST } from "@/lib/tracking-ids";

/**
 * Google Tag Manager and GA4, on every page. The Meta Pixel is separate, in
 * `meta-pixel.tsx`, because it has its own consent rules and does not
 * belong inside a container.
 *
 * Both ids are written into the page source, which is what Google's "is
 * your tag installed" check looks for, and both loaders refuse to run
 * unless the page is actually on the clinic's domain. A preview deploy
 * therefore ships the snippet but sends nothing. See `tracking-ids.ts` for
 * why this is a runtime check and not an environment variable.
 *
 * GA4 LOADS FROM HERE, NOT FROM INSIDE GTM. Both routes work and running
 * both at once double-counts every session, which is how a clinic ends up
 * reporting twice the traffic it has. The container is deliberately left
 * empty of a GA4 tag and kept for the Google Ads conversion tags, which is
 * what a container is actually for. If a GA4 configuration tag is ever
 * added inside GTM-MDNBGRX, delete the GA4 block below the same day.
 *
 * Consent Mode v2 denies storage before either tag loads;
 * `consent-banner.tsx` grants on the visitor's choice. The tags still load
 * and still measure, cookielessly, which is the point of consent mode.
 * `wait_for_update` holds them briefly so a quick "accept" is not missed.
 */
export function AnalyticsScripts() {
  return (
    <>
      {/* Consent defaults first, before anything can read them. */}
      <Script id="google-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
      </Script>

      {/* Google Tag Manager */}
      <Script id="gtm-loader" strategy="afterInteractive">
        {`if(location.hostname==='${PRODUCTION_HOST}'){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');}`}
      </Script>

      {/* Google tag (gtag.js) for GA4 */}
      <Script id="ga4-loader" strategy="afterInteractive">
        {`if(location.hostname==='${PRODUCTION_HOST}'){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';document.head.appendChild(s);gtag('js',new Date());gtag('config','${GA4_ID}');}`}
      </Script>
    </>
  );
}
