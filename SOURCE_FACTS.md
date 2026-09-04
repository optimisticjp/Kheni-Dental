# Source Facts and Verification Notes

Snapshot prepared 27 August 2026, updated 29 August 2026 (Google counts) and 3 September 2026 (domain, YouTube). Recheck public ratings and hours immediately before launch because these can change.

## Clinic-provided facts

### Brand
- Kheni Dental & Elite Implant Center
- Domain: https://www.khenidentalcare.com (canonical). The apex `khenidentalcare.com` redirects to www with a 301, preserving paths and query strings (verified 3 September 2026). Plain `http://` does not yet redirect to `https://`; enable "Always Use HTTPS" in Cloudflare before launch.
- Patient-facing email selected: smile@khenidentalcare.com

### Doctors
- Dr. Mayur Kheni, B.D.S., Implantologist & Cosmetic Dental Surgeon, 15 years experience
- Dr. Jinal Monapara, B.D.S., Dental Surgeon & Smile Designing Specialist, 9 years experience
- Dr. Ishita Dobariya, B.D.S., Dental Surgeon & Kids Specialist, 4 years experience
- Dr. Parita Vastarpara, B.D.S., Dental Surgeon, 4 years experience

### Branch phone numbers from clinic material
- Swastik Plaza branch: +91 95101 12354
- Hirabaug: +91 97379 97543

### Maps links provided by the client (29 August 2026)
- Swastik Plaza: https://maps.app.goo.gl/WN2nDHXVK8RajDvE6 (Place ID ChIJddZdiXpP4DsRvtrOvXjbQqA, pin 21.2147921, 72.8881639)
- Hirabaug: https://maps.app.goo.gl/7TipkWprNZv2qEQk9 (Place ID ChIJ89yBAKVP4DsR3TYY_211oRg, pin 21.2127579, 72.8584163)

### Google reputation (clinic-verified 29 August 2026)
- Swastik Plaza / Yogi Chowk: 4.9, 1,753 reviews
- Hirabaug: 4.9, 210 reviews
- Combined 1,963, always labelled as a sum across two listings. A live re-check from this environment was not possible (Google serves a script shell), so the clinic-verified values stand.

### Clinic YouTube channel (verified 3 September 2026)
- https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ ("Kheni Dental & Elite Implant Center"). Public Shorts from this channel are linked in `src/content/videos.ts` and played only after a tap.
- Instagram @khenielite is clinic-provided and linked, not embedded; its public content could not be verified from this environment.

## Public profile snapshot

### Swastik Plaza / Nana Varachha
Google business result observed on 27 August 2026:
- Rating: 4.9
- Review count: 1,593
- Phone: +91 95101 12354
- Address surfaced as Shop No. 38-39, Swastik Plaza, Yogi Chowk Ground, Chikuwadi, Nana Varachha, Surat, Gujarat 395011
- Categories include dental clinic, cosmetic dentist, dental implants, endodontist, oral surgery, orthodontist, pediatric dentist and periodontist

Public directory reference:
https://www.bharatibiz.com/en/kheni-dental-clinic_1r-095101-12354

### Hirabaug
Google business result observed on 27 August 2026:
- Operating Kheni Dental Clinic result on Varachha Main Road, above Shiv Plywood, near New Shakti Vijay Society, Hirabaug
- Google result did not surface a usable current rating count in the structured response used for this audit

Justdial snapshot:
- Rating: 4.8
- 190 ratings
Reference:
https://www.justdial.com/Surat/Kheni-Dental-Clinic-Elite-Implant-Center-Above-Shiv-Plywood-Near-New-Shakti-Vijay-Societyopposite-Surat-Varachha-Road/0261PX261-X261-220319203844-X7U8_BZDET

## Hours note

Clinic material supplied by the client lists Monday-Saturday 9:30 AM-1:00 PM and 4:00 PM-8:00 PM. The current Google result for the Swastik Plaza profile surfaces different hours, so the site shows the clinic-provided schedule with a reminder to call before a time-sensitive visit. Reconfirm both branches immediately before production launch.
