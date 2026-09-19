# Tracking Plan

Kheni Dental uses deliberately limited website tracking. Healthcare privacy is the governing rule: advertising platforms must never receive medical details, form-entered values, treatment choices, symptoms, diagnoses or other sensitive health information.

## Current architecture

- Website data layer -> Google Tag Manager -> GA4 / Google Ads when configured
- Website -> consent-gated Meta Pixel for basic Meta measurement
- Consent banner controls optional analytics and marketing technologies

Google Tag Manager remains optional and is configured through:

`NEXT_PUBLIC_GTM_ID`

Meta Pixel:

`1055188140670527`

The Meta Pixel does not load until the visitor chooses **Accept all**. Choosing **Essential only** leaves Meta disabled.

## Meta events

Meta receives only:

- `PageView`
- standard `Contact`

`Contact` is sent for these generic website actions:

- `whatsapp_click`
- `phone_click`
- `appointment_submit`

No custom parameters are attached to Meta events. In particular, Meta does not receive branch, treatment, placement, form field, symptom, diagnosis or medical-history values.

Automatic Meta Pixel configuration is disabled. No advanced-matching fields are supplied.

## Website data-layer events

Primary conversions:

- `appointment_submit`
- `whatsapp_click`
- `phone_click`

Secondary events:

- `appointment_start`
- `directions_click`
- `treatment_view`
- `concern_interaction`
- `implant_navigator_interaction`
- `international_patient_contact`
- `google_reviews_click`
- `review_click`
- `navigation_click`
- `video_play`
- `instagram_reel_open`
- `instagram_profile_click`
- `location_switch`

The website data layer can contain operational context such as placement or branch. That context is not forwarded to Meta by the direct Pixel integration.

## Healthcare privacy rule

Never send symptoms, diagnoses, medical history, form values, treatment-specific patient details, treatment selections or other sensitive health information to analytics or advertising platforms.

Do not use Meta custom events or custom parameters to encode dental concerns, procedures or patient status.

## Validation before paid-media optimisation

1. Confirm Meta Pixel does not load before marketing consent.
2. Confirm **Essential only** leaves Meta disabled.
3. Confirm **Accept all** sends one initial `PageView`.
4. Confirm client-side navigation sends one `PageView` per route.
5. Confirm phone, WhatsApp and appointment-submit actions send only standard `Contact`.
6. Confirm no form-entered values or health-related fields appear in Meta Test Events.
7. Keep Automatic Advanced Matching and automatic event detection disabled in Events Manager.
8. Test GTM separately if/when it is configured.
