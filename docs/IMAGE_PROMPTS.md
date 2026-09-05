# Image prompts

Every image slot on the site, with a ChatGPT prompt, the exact file name to
save it as, and the size to generate. Generate, save with the file name
given, send the folder over, and each one is wired into its frame with no
layout change.

## How to use

1. Paste the **style prefix** below at the start of every prompt. It is what
   makes thirty separate generations look like one photographer shot them.
2. Generate at the size listed. ChatGPT makes three sizes: square
   (1024×1024), landscape (1536×1024) and portrait (1024×1536). The site
   crops to the exact frame.
3. Save as JPG with the file name shown. Do not resize or compress; that is
   handled at build.
4. If a result has text, a logo, a watermark, or teeth that look bleached,
   regenerate. Those never pass.

## Style prefix

Paste this first, every time:

> Editorial lifestyle photograph for a modern dental clinic in Surat, India.
> Warm porcelain white and soft cream surroundings, gentle daylight from a
> large window, shallow depth of field, slightly soft 35mm film look.
> Colour kept to deep navy, cobalt blue and pale pastel tints of teal,
> coral and sunshine yellow. Calm, optimistic, premium but human. Indian
> people with natural skin tones and real expressions, never posed like
> stock photography. No text, no logos, no watermarks, no exaggerated white
> teeth, no clinical instruments in the mouth.

## What not to generate

Two kinds of image should never be AI made, even as placeholders:

- **Before and after results.** The slider and the result grid stay on drawn
  frames until the clinic supplies consented patient photographs. A
  generated "after" is a fabricated clinical outcome on a healthcare site.
- **The four dentists' faces.** Prompts are included below so the layout can
  be judged, but an AI face on a named real doctor is the first thing to
  replace. A phone photo against a plain wall is better than a perfect
  generated one.

---

## A. Homepage

### 1. Hero
`public/images/home/hero-dentist.jpg` · portrait 1024×1536 · shown 4:3.4 on phones, 5:5.4 on desktop

> A dentist in his early forties in a pale blue clinical shirt, seated
> beside a treatment chair in a bright, uncluttered room, turned toward a
> patient just out of frame and pointing at something on a tablet, mid
> explanation. Cobalt blue accent on the chair upholstery. Warm side light,
> soft focus on the room behind. Confident, unhurried.

### 2. Social share image
`public/images/og-default.jpg` · landscape 1536×1024 · cropped to 1200×630

This is the picture that appears when the site is shared on WhatsApp, which
is where most of it will be shared.

> Wide, quiet shot of a modern dental clinic reception in Surat at nine in
> the morning. Porcelain white counter, one cobalt blue chair, a tall plant,
> morning light across a polished floor. Nobody in frame. Composed with
> empty space on the left third.

---

## B. Doctors

Portrait 1024×1536, shown 4:5. Placeholders only, see above.

### 3. Dr. Mayur Kheni
`public/images/doctors/dr-mayur-kheni.jpg`

> Head and shoulders portrait of an Indian man in his early forties, short
> dark hair, light stubble, in a white clinical coat over a navy shirt,
> standing in a bright treatment room. Direct, warm, slight smile with lips
> together. Cobalt tinted wall out of focus behind.

### 4. Dr. Jinal Monapara
`public/images/doctors/dr-jinal-monapara.jpg`

> Head and shoulders portrait of an Indian woman in her mid thirties, hair
> tied back, white clinical coat, standing near a window in a light room.
> Calm, attentive, small smile. Soft coral tinted wall out of focus behind.

### 5. Dr. Ishita Dobariya
`public/images/doctors/dr-ishita-dobariya.jpg`

> Head and shoulders portrait of an Indian woman in her late twenties,
> white clinical coat, a child sized dental mirror visible in her coat
> pocket, warm open expression. Pale mint tinted wall out of focus behind.

### 6. Dr. Parita Vastarpara
`public/images/doctors/dr-parita-vastarpara.jpg`

> Head and shoulders portrait of an Indian woman in her late twenties,
> white clinical coat, hair loose to the shoulder, composed and friendly.
> Soft teal tinted wall out of focus behind.

---

## C. Treatments

Landscape 1536×1024. Each is used twice: in the poster on the treatments
index (16:10) and in the hero of that treatment's own page (4:3). One image
covers both. These carry the most weight on the site, so the brief for each
is a still life or a moment, not a mouth.

### 7. Dental implants
`public/images/treatments/dental-implants-surat.jpg`

> Macro still life of a single titanium dental implant and a white zirconia
> crown standing upright on a porcelain surface, lit from the side so they
> cast one long cobalt blue shadow. Nothing else in frame.

### 8. Root canal
`public/images/treatments/root-canal-treatment-surat.jpg`

> A woman in her thirties asleep on her side in soft morning light, face
> relaxed, one hand resting near her cheek. White bedding, pale teal wall.
> The picture is about a night of pain that has ended.

### 9. Braces and clear aligners
`public/images/treatments/braces-clear-aligners.jpg`

> A clear dental aligner held up between two fingertips against a bright
> window so light passes through it. Slight violet tint in the background.
> Shallow focus, the aligner sharp, everything else soft.

### 10. Smile design
`public/images/treatments/cosmetic-smile-dentistry.jpg`

> Close crop of a woman in her late twenties caught mid laugh, head tilted
> back slightly, one hand near her cheek, eyes closed. Coral tinted
> background. Natural teeth, not bleached. Joy, not a pose.

### 11. Full mouth rehabilitation
`public/images/treatments/full-mouth-rehabilitation.jpg`

> A man in his seventies standing at a kitchen counter biting into a whole
> red apple, morning light through a window behind him, small satisfied
> crinkle around the eyes. Sunshine yellow tint on the wall.

### 12. Crowns and bridges
`public/images/treatments/crowns-and-bridges.jpg`

> Macro of four ceramic dental crowns arranged on a pale grey laboratory
> tray beside a shade guide, warm golden side light. Precise, quiet,
> craftsman like.

### 13. Kids dentistry
`public/images/treatments/kids-dentistry-surat.jpg`

> A six year old boy sitting in an oversized dental chair holding a small
> round dental mirror up to his own face and giggling at what he sees.
> Mint green tint on the wall behind. Nobody else in frame.

### 14. Gum care
`public/images/treatments/gum-care-surat.jpg`

> Extreme close up of a soft bristled toothbrush head with a single drop of
> water on it, against a fresh green leaf, morning light. Clean, cool,
> fresh.

### 15. Wisdom tooth removal
`public/images/treatments/wisdom-tooth-oral-surgery.jpg`

> A cup of masala chai and a folded soft blanket on a sofa arm, afternoon
> light, pale lavender wall. The picture is about the quiet weekend after,
> not the procedure.

### 16. Check-up
`public/images/treatments/dental-check-up-surat.jpg`

> A dental mirror and probe laid neatly on a folded white cloth on a
> porcelain tray, sky blue tint, top down, plenty of empty space. Calm,
> orderly, unthreatening.

### 17. Fillings
`public/images/treatments/tooth-fillings-surat.jpg`

> Macro of a tooth coloured composite shade guide, the tabs fanned out
> from white to warm ivory, on a navy surface with soft window light.

---

## D. Clinics

Square 1024×1024. Three per clinic: one large, two small. These are the
easiest to replace with real photographs and the most worth replacing.

### 18. Hirabaug, large
`public/images/locations/hirabaug-1.jpg`

> Wide interior of a modern implant treatment room: white chair with cobalt
> blue upholstery, a wall mounted screen showing a soft abstract blue
> gradient, a large window with sheer blinds. Empty, immaculate, morning.

### 19. Hirabaug, small
`public/images/locations/hirabaug-2.jpg`

> Close up of a sterilisation cabinet with sealed instrument pouches lined
> up in rows, cool white light. Order and cleanliness.

### 20. Hirabaug, small
`public/images/locations/hirabaug-3.jpg`

> A reception counter with a small vase of marigolds and a sunshine yellow
> chair in soft focus behind. Warm, welcoming.

### 21. Yogi Chowk, large
`public/images/locations/swastik-plaza-1.jpg`

> Wide interior of a bright family dental treatment room, white chair with
> teal upholstery, a colourful children's poster just visible on one wall,
> window light. Empty, tidy, friendly.

### 22. Yogi Chowk, small
`public/images/locations/swastik-plaza-2.jpg`

> A waiting area with three teal chairs, a low table with a plant, a window
> with a Surat street softly out of focus beyond. Mid morning.

### 23. Yogi Chowk, small
`public/images/locations/swastik-plaza-3.jpg`

> Close up of a child height hand basin with a small step stool and a
> mint green towel. Made for small visitors.

---

## E. About

### 24. Clinic story
`public/images/about/team.jpg` · landscape 1536×1024, shown 4:3

> Four dentists in white coats walking together down a bright clinic
> corridor toward the camera, mid conversation, one laughing, seen from
> slightly above so faces are partly turned away. Cobalt blue accent on
> the far door. Motion, warmth, a team.

---

## F. Notable patients

Landscape 1536×1024, shown 4:3. Fictional people; the prompts describe the
role, not a real person.

### 25. Playback singer
`public/images/notables/ravi-deshmukh.jpg`

> An Indian man in his forties at a studio microphone, headphones around
> his neck, eyes closed, mid note. Coral tinted studio light. Waist up.

### 26. Television actor
`public/images/notables/kavya-trivedi.jpg`

> An Indian woman in her thirties in a makeup chair, looking into a lit
> mirror, hair being pinned by hands from out of frame. Violet tinted
> backstage light. Seen in the mirror.

### 27. Cricketer
`public/images/notables/hardik-rathod.jpg`

> An Indian man in his late twenties in cricket whites at practice nets,
> bat resting on his shoulder, looking off to the side, late afternoon
> sun. Cobalt blue net posts.

### 28. Textile entrepreneur
`public/images/notables/meera-shah.jpg`

> An Indian woman in her fifties in a textile showroom, one hand on a bolt
> of sunshine yellow silk, looking directly at the camera with quiet
> authority. Rows of fabric softly out of focus behind.

---

## G. NRI and international

### 29. Planning a visit
`public/images/international/plan-your-visit.jpg` · landscape 1536×1024

Optional. The page currently uses a drawn globe with Surat marked, which
works. Generate this only if you prefer photography there.

> Top down still life on a warm wooden table: an open passport, a boarding
> pass, a phone showing a blank chat screen, and a folded note. Coral
> tinted morning light from one side.

---

## H. Not needed

- **Treatment tiles in the hero**, the **implant diagram**, the **tooth
  anatomy diagram** and the **service glyphs** are drawn on purpose and
  should stay drawn. They are the site's own illustration system.
- **Video walls** use YouTube's own poster frames.
- **Before and after** stays on drawn frames until real consented cases
  arrive. See "What not to generate".
