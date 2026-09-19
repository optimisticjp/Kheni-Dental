import Script from "next/script";

/**
 * The two Google tags. The Meta Pixel is separate, in `meta-pixel.tsx`,
 * because it has its own consent rules and does not belong in a container.
 *
 *   Google Tag Manager   NEXT_PUBLIC_GTM_ID
 *   GA4                  NEXT_PUBLIC_GA4_ID
 *
 * Each loads only when its id is set. The ids are supplied by the
 * production deploy workflow alone, so a preview build sets neither and
 * cannot send a hit to the clinic's real properties.
 *
 * GA4 LOADS FROM HERE, NOT FROM INSIDE GTM. Both routes work and running
 * both at once double-counts every session, which is how a clinic ends up
 * reporting twice the traffic it has. The container is deliberately left
 * empty of a GA4 tag and kept for the Google Ads conversion tags, which is
 * what a container is actually for. If a GA4 configuration tag is ever
 * added inside GTM-MDNBGRX, remove NEXT_PUBLIC_GA4_ID from
 * .github/workflows/deploy-cloudflare.yml the same day.
 *
 * Consent Mode v2 denies everything before either tag loads;
 * `consent-banner.tsx` grants on the visitor's choice. `wait_for_update`
 * holds the tags briefly so a quick "accept" is not missed.
 */
export function AnalyticsScripts() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

  if (!gtmId && !ga4Id) return null;

  return (
    <>
      {/* Must run before either tag, so it is first and everything here
          shares the same afterInteractive strategy. */}
      <Script id="google-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
      </Script>

      {gtmId && (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      )}

      {ga4Id && (
        <>
          <Script id="ga4-lib" src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4-config" strategy="afterInteractive">
            {`gtag('js',new Date());gtag('config','${ga4Id}');`}
          </Script>
        </>
      )}
    </>
  );
}
