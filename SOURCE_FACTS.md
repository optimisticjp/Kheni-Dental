# Source Facts and Verification Notes

Snapshot prepared 27 August 2026, updated 29 August 2026 (Google counts), 3 September 2026 (domain, YouTube) and 14 September 2026 (clinic information form; see docs/CLINIC-FORM-IMPLEMENTATION.md for every item and its status). Recheck public ratings and hours immediately before launch because these can change.

## Clinic-provided facts

### Brand
- Kheni Dental & Elite Implant Center
- Domain: https://www.khenidentalcare.com (canonical). The apex `khenidentalcare.com` redirects to www with a 301, preserving paths and query strings (verified 3 September 2026). Plain `http://` does not yet redirect to `https://`; enable "Always Use HTTPS" in Cloudflare before launch.
- Patient-facing email selected: smile@khenidentalcare.com

### Doctors (updated from the clinic information form, 14 September 2026)
- Dr. Mayur Kheni, B.D.S., Dental Surgeon, Implantologist & Cosmetic Dentistry, 15 years experience, both clinics. **By appointment at Hirabaug** (corrected by the clinic, 19 September 2026; the form's page 10 had been read as Yogi Chowk by appointment, which was the wrong way round). Yogi Chowk is his regular clinic, which is consistent with implant planning and treatment being based there. Reg. A-6277 and IDA/VDA/KDA memberships stated by the clinic, evidence pending.
- Dr. Jinali Monpara (spelling corrected by the clinic; was "Jinal Monapara"), B.D.S., Cosmetic Dental Surgeon, 10 years experience (was 9), both clinics. Reg. A-15753 stated, evidence pending.
- Dr. Ishita Dobariya, B.D.S., Dental Surgeon & Kids Specialist, 4 years experience, Yogi Chowk only. AMC Dental College, Ahmedabad.
- Dr. Parita Vastarpara, B.D.S., Dental Surgeon, 4 years experience, both clinics. Ahmedabad Dental College & Hospital.
- Clinic history (form p13): first clinic at Yogi Chowk 2012, Hirabaug 2020. Founder Dr. Mayur Kheni.
- Elite Implant Center location: the form gives conflicting answers (Hirabaug on p11, Yogi Chowk on p29 and p41). The site names no single implant location until the clinic confirms.

### Branch phone numbers from clinic material
- Swastik Plaza branch: +91 95101 12354
- Hirabaug: +91 97379 97543

### Maps links provided by the client (29 August 2026)
- Swastik Plaza: https://maps.app.goo.gl/WN2nDHXVK8RajDvE6 (Place ID ChIJddZdiXpP4DsRvtrOvXjbQqA, pin 21.2147921, 72.8881639)
- Hirabaug: https://maps.app.goo.gl/7TipkWprNZv2qEQk9 (Place ID ChIJ89yBAKVP4DsR3TYY_211oRg, pin 21.2127579, 72.8584163)

### Google reputation (clinic form, 14 September 2026)
- Swastik Plaza / Yogi Chowk: 4.9, 1,761 reviews (form p46; was 1,753 on 29 August 2026)
- Hirabaug: 4.9, 210 reviews (form p11, ticked Correct)
- Combined 1,971, always labelled as a sum across two listings. Recheck cadence: monthly (form p46); next due 14 October 2026.
- New share links supplied on p46 (https://share.google/VCStYdDSW14U7yNSx for Yogi Chowk, https://share.google/PS6JNyt10N2UJKRo8 for Hirabaug) resolve from this environment only to Google Search knowledge panels without address, phone or Place ID, so they are stored as pending verification and not linked. The 29 August Place IDs, pins and short links remain canonical.

### Clinic YouTube channel (re-checked 13 September 2026)
- https://www.youtube.com/channel/UCA4ralOJwb8mrttegjyZcEQ ("Kheni Dental & Elite Implant Center", handle @khenidentaleliteimplantcen1300). 26 public videos (16 Shorts, 10 longer videos) from this channel are listed in `src/content/videos.ts`, played only after a tap on the privacy-enhanced domain. Doctor names are attached only where the clinic's own title names the doctor (three Dr. Jinal videos).

### Instagram @khenielite (re-verified 14 September 2026)
- https://www.instagram.com/khenielite is public. Five Reels were opened individually and each confirmed as posted by khenielite, still public, with the poster frame matching the saved file (md5 identical to the 13 September capture): DO0n03ykk5a (children's dental camp, September 2025), C0BRyrdJCIu (consultation desk, November 2023), C0DxQZ-JuO2 (treatment in progress, November 2023), C0eOsV5JDeO (a young patient in the chair, December 2023), C0GzY-xpoJE (close work under the light, November 2023).
- Two further public posts were deliberately not used: ClQBekbIhIp (a before/after graphic; no written consent on file) and DL9OKL2xZCE (a stock-style image, not the clinic).
- Follower and post counts are not published anywhere on the site.
- Nothing from Instagram is embedded: each card is the clinic's own poster saved under `public/images/instagram/` and opens the exact Reel in a new tab.

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
