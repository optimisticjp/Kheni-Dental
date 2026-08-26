# Kheni Elite Tracking Plan

## Architecture
All marketing/analytics logic should be managed through the **clinic-owned Google Tag Manager container**. The website only loads GTM when `NEXT_PUBLIC_GTM_ID` is set and provides clean generic dataLayer events.

Recommended connected platforms:
- Google Analytics 4
- Google Ads conversion tracking
- Meta Pixel through GTM
- Google Search Console (not a tag)
- Optional Cloudflare Web Analytics as infrastructure-level traffic visibility

## Consent
The starter implements:
- Google Consent Mode defaults set to denied before GTM loads.
- A banner with “Essential only” and “Accept”.
- `kheni_consent_update` dataLayer event.
- Analytics + advertising consent granted only after explicit acceptance.

Configure Meta tags in GTM to fire only when the marketing-consent condition is true.

## Website events already implemented
Primary / commercial intent:
- `appointment_start`
- `appointment_submit`
- `whatsapp_click`
- `phone_click`

Secondary / engagement:
- `directions_click`
- `doctor_profile_view`
- `treatment_view`
- `international_patient_contact`
- `resource_download`
- `review_click`
- `problem_interaction`
- `gallery_interaction`

Each event may include only generic fields such as:
- `placement`
- `interaction`

## Healthcare privacy rule
DO NOT add the following to analytics events, GTM variables, Meta custom data or Google Ads parameters:
- symptoms
- diagnosis
- health history
- patient name
- phone/email
- uploaded records
- X-rays
- treatment details tied to an identifiable person
- free-text medical messages

Keep marketing events generic. Clinical communication should continue through the clinic's appropriate private workflow.

## GTM implementation checklist
1. Create clinic-owned GTM web container.
2. Set `NEXT_PUBLIC_GTM_ID`.
3. Connect GA4 via Google tag.
4. Create GA4 event tags for approved generic dataLayer events.
5. Mark only true lead events as key events/conversions.
6. Connect Google Ads conversion actions for appointment, WhatsApp and phone leads.
7. Install Meta Pixel through GTM only after consent.
8. Use GTM Preview / Tag Assistant to validate every event.
9. Test iOS Safari, Android Chrome and desktop browsers.
10. Verify no PII or health data appears in analytics debug payloads.

## Suggested Google Ads primary conversions
- Appointment request submitted
- WhatsApp lead initiation (after defining a meaningful threshold/behavior)
- Phone lead

Do not optimize bidding toward page views, treatment views, FAQ opens or directions as primary conversions.

## UTMs
Use a consistent naming convention, for example:
- `utm_source=google`
- `utm_medium=cpc`
- `utm_campaign=implant_search_surat`
- `utm_content=<creative-or-adgroup>`

Meta example:
- `utm_source=meta`
- `utm_medium=paid_social`
- `utm_campaign=<campaign_name>`

Avoid putting medical/patient PII into UTM values.
