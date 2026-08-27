# Tracking Plan

Tracking is intentionally dormant until the design and URLs are stable.

## Architecture

Website data layer -> Google Tag Manager -> GA4 / Google Ads / Meta as needed

Configure through:

`NEXT_PUBLIC_GTM_ID`

The consent banner does not appear when GTM is not configured.

## Primary conversions

- `appointment_submit`
- `whatsapp_click`
- `phone_click`

## Secondary events

- `appointment_start`
- `directions_click`
- `treatment_view`
- `problem_interaction`
- `international_patient_contact`
- `review_click`
- `resource_download`

## Healthcare privacy rule

Never send symptoms, diagnoses, medical history, form values, treatment-specific patient details or other sensitive health information to analytics or advertising platforms.

Branch name can be tracked because it is operational location context, not medical information.

## Launch validation

Before enabling paid media:

1. Test GTM in preview mode.
2. Confirm consent defaults are denied until user choice where required.
3. Confirm WhatsApp, phone, appointment and direction events fire once.
4. Confirm no form-entered values enter the data layer.
5. Test Google Ads conversions with Tag Assistant.
6. Test Meta Pixel only after reviewing current healthcare advertising restrictions.
