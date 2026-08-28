# Google Reputation and Maps Strategy

This build treats Google reputation and clinic location as core trust and conversion systems, not footer widgets.

## Current public proof used
- Established Swastik Plaza Google profile: 4.9 rating, 1,593 reviews at the time of the August 2026 research pass.
- Hirabaug has its own Google profile. A rating is intentionally not mirrored from Swastik Plaza.
- Review counts are time-sensitive. Refresh before production launch.

## Where Google proof appears
- Hero trust pill
- Moving trust ticker
- Large homepage reputation section
- Treatment pages
- Doctors page
- About page
- Contact page
- Location detail pages
- Dedicated reviews page
- Footer links

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
