/**
 * NRI and international patient services.
 *
 * Page 55 of the clinic information form lists thirteen services and asks the
 * clinic to tick the ones it really provides. The clinic ticked none of them
 * and left every write-in field blank, and the form's own instruction is
 * explicit: "Unticked items will not be promised."
 *
 * So nothing here is promised. Every line is carried at `awaiting` until the
 * clinic says otherwise, and the page renders that state honestly instead of
 * either inventing a travel-agency offer or deleting the section and leaving
 * the clinic nothing to react to. The clinic asked to see the whole thing and
 * tell us what to keep, which is exactly what this list is for.
 *
 * Two items are marked `confirmed` because they are proven elsewhere on the
 * form rather than on page 55: WhatsApp contact for both branches is ticked on
 * page 56, and Gujarati, Hindi and English are confirmed for every doctor on
 * pages 17, 20, 23 and 26.
 *
 * Moving an item to `confirmed` is the only edit needed once the clinic
 * answers. Nothing else on the page has to change.
 */

export type NriServiceStatus = "confirmed" | "awaiting";

export type NriService = {
  id: string;
  label: string;
  /** What it would mean in practice, in the clinic's voice. */
  copy: string;
  status: NriServiceStatus;
  /** Where the status came from. */
  source: string;
};

export const nriServices: NriService[] = [
  {
    id: "whatsapp",
    label: "WhatsApp before you travel",
    copy: "Message either clinic with your dates and what is bothering you. Both branch numbers are answered by the clinic team.",
    status: "confirmed",
    source: "form p56 (WhatsApp ticked for both branches)",
  },
  {
    id: "languages",
    label: "Gujarati, Hindi and English",
    copy: "Every dentist here consults in all three, so you can describe the problem in whichever one comes naturally.",
    status: "confirmed",
    source: "form p17, p20, p23, p26",
  },
  { id: "video-consult", label: "Pre-travel video consultation", copy: "A call before you fly, so you arrive knowing roughly what to expect.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "records-review", label: "Review of X-rays and reports before travel", copy: "Send what your dentist at home has already taken, and we look at it before your trip.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "timeline", label: "Treatment timeline planning", copy: "What can be finished on this trip, and what would need a second one, written out in advance.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "reserved-slots", label: "Appointments reserved around your dates", copy: "Chair time held for your travel window rather than booked when you land.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "stay", label: "Guidance on where to stay", copy: "Suggestions for somewhere close to the clinic you are being treated at.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "transport", label: "Help with local transport", copy: "Directions and travel advice for getting between your stay and the clinic.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "remote-followup", label: "Follow-up after you fly home", copy: "A way to ask questions once you are back, and help explaining the treatment to a dentist where you live.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "emergency-contact", label: "Contact during treatment", copy: "Someone to reach while a staged treatment is still in progress.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "airport", label: "Airport pickup", copy: "Collection from Surat airport on arrival.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "visa", label: "Visa support letter", copy: "A letter confirming your treatment dates, where a visa application asks for one.", status: "awaiting", source: "form p55 (not ticked)" },
  { id: "always-on", label: "Round-the-clock support", copy: "Contact outside clinic hours.", status: "awaiting", source: "form p55 (not ticked)" },
];

export const confirmedNriServices = nriServices.filter((s) => s.status === "confirmed");
export const awaitingNriServices = nriServices.filter((s) => s.status === "awaiting");

/** True while anything on this page is still unconfirmed. Blocks indexing. */
export const nriHasUnconfirmed = awaitingNriServices.length > 0;

/**
 * Shown above the awaiting list so a reader is never misled about what is on
 * offer today. Written for the clinic's review, and true for a patient too.
 */
export const nriAwaitingNote =
  "These are services the clinic has not confirmed yet, so treat none of them as offered. They are listed here so the clinic can tell us which ones to keep, and everything else comes off the page.";

/**
 * What the clinic has not yet told us, kept alongside the services so the
 * ledger and the page stay in step. All five fields on form p55 were blank.
 */
export const nriStillNeeded = [
  "How many NRI and international patients have actually been treated",
  "Which countries patients have travelled from",
  "Who handles international enquiries, and how quickly they normally reply",
  "Which records a patient can usefully send before travelling",
  "Whether any international patient has agreed to their story being published",
] as const;
