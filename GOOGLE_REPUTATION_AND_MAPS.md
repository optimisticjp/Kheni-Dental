# Google Reputation and Maps Strategy

This build treats Google reputation and clinic location as core trust and conversion systems, not footer widgets.

## Current public proof used
- Swastik Plaza (Yogi Chowk): 4.9, 1,753 reviews. Hirabaug: 4.9, 210 reviews. Both clinic-verified 29 August 2026.
- Each branch shows only its own figure. The combined 1,963 is always labelled as a sum across two listings.
- Review counts are time-sensitive. Refresh before production launch.

## Where Google proof appears (V4)
Used at decision points rather than on every route:
- Homepage hero (rating, count, per-branch chips) and the reviews block
- Implant page hero chip and Hirabaug branch card
- Treatment page FAQ column (proof cluster)
- Doctors, about and contact (proof cluster)
- Location pages (this branch's own figure only)
- Dedicated reviews page (per branch, verbatim excerpts, write-a-review)

## Google actions supported
- Read reviews
- Open Google profile
- Write a review
- Get directions

## Maps approach
The homepage does not load two heavy Google Maps iframes. Each clinic uses a custom branded location card and hands the user to Google Maps for routing and travel time.

## Branch integrity
- Swastik Plaza and Hirabaug remain separate Google entities.
- Never display the Swastik Plaza rating as the Hirabaug rating.
- Do not mix Google and third-party review counts without clear source labels.

## Future live data option
If exact live rating/count becomes important, use Google Places data server-side with caching and current Google display/attribution rules. Do not add a random third-party review widget just to make the count live.

## Analytics events already prepared
- `review_click`
- `directions_click`
- `phone_click`
- `whatsapp_click`
- `appointment_start`
- `appointment_submit`

Keep event payloads generic. Do not send symptoms, diagnoses or patient-entered health data to advertising platforms.
