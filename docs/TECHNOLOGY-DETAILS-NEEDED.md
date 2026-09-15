# Technology details still needed

Internal. From page 43 of the clinic information form (14 September 2026).

The clinic ticked the categories below but left every brand and model field blank.
The website therefore names the **category** only, from `src/content/technology.ts`,
with `clinicConfirmed: true` and `modelConfirmed: false`. No manufacturer, model,
year or "latest" wording appears until the clinic supplies it.

For each item we need: manufacturer and model, which clinic it is at, a photograph
(optional), and one sentence on what it lets the dentist see or do for the patient.

## Ticked on page 43 (shown by category)

| Category on site | Clinic confirmed | Model known | Which clinic | Notes |
|---|---|---|---|---|
| Digital dental X-ray | yes | no | ? | Also supports "X-rays" from page 28 and "examination & xrays" on page 31. |
| Intraoral scanner | yes | no | ? | Do not name a brand. Relevant to aligners and crowns. |
| Intraoral camera | yes | no | ? | |
| Dental microscope | yes | no | ? | Page 31 confirms microscope use in root canal treatment. |
| Rotary endodontic system | yes | no | ? | Page 31 confirms rotary. |
| Apex locator | yes | no | ? | Page 31 confirms. |
| Dental laser | yes | no | ? | Listed as equipment only. Laser gum treatment was NOT ticked on page 39, so no laser procedure is offered on the gum page. Which procedures is the laser actually used for? |
| CAD/CAM | yes | no | ? | Is this in-clinic milling or lab-side? Page 42 says prosthetic work is by a lab partner. |
| Implant planning software | yes | no | ? | Name not required publicly; useful to know. |
| Guided implant kit | yes | no | ? | Page 29 and 41 confirm guided implant surgery. Which system? |
| Autoclave / sterilisation | yes | no | both? | Class B autoclave? Pouch sealing? Photo of the sterilisation area would help. |
| Ultrasonic scaler | yes | no | both? | |
| Other | ticked, blank | | | What was meant? |

## Not ticked on page 43 (not shown as equipment)

| Item | Where the form disagrees | Question |
|---|---|---|
| OPG (panoramic X-ray) | Page 39 ticks "X-ray / OPG" for wisdom teeth | Is there an OPG machine at either clinic, or is it referred out? |
| CBCT / 3D scan | Page 29 says implant assessment uses "xray and cbct" | In-house at which clinic, or referred to an imaging centre? The implant page currently says "3D imaging (CBCT) where the case needs it" with a TO CONFIRM marker. |
| Digital Smile Design software | Page 35 says a preview before treatment is offered | How is the preview produced (software, mock-up, photographs)? The site says "a preview of the planned result" without naming software. |
| 3D printer | | Not mentioned anywhere. |

## Implant systems (pages 4, 29, 42)

- Osstem (Korea) and DIO (Korea): confirmed. Shown as text. Logo use needs the
  manufacturer's permission; not requested yet.
- Surgical guide production: in-house or lab?

## Restorative materials (page 35)

- 3M and GC: confirmed, shown as text on the smile design page.
- "WISDENT RESTORATIVE": no exact brand match (Pidilite's brand is Wizdent). Hidden
  until the spelling is confirmed.

## Warranty (pages 4, 30)

Clinic wording, verbatim: "lifetime warranty implant no specify crown warranty its
depend on oral health" and "DEPENDS ON ORAL CONDITION". Before anything stronger than
"warranty information is available from the clinic" can be printed we need the
written terms: what is covered, for how long, conditions (maintenance visits,
smoking, grinding), and whether the crown is covered at all.
