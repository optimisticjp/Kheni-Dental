"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

import { locations, site } from "@/content/site";
import { pushTrackingEvent } from "@/lib/tracking";

/**
 * The minimal request form. Four fields, then WhatsApp opens with them
 * already typed. No backend, no medical questions. It exists for people who
 * would rather write than call, and as the no-JavaScript landing for every
 * Book button.
 */
const field =
  "mt-1.5 h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-base outline-none focus:border-cobalt focus:ring-[3px] focus:ring-cobalt/25";

export function ConsultationForm({ international = false }: { international?: boolean }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(international ? "" : "India");
  const [contact, setContact] = useState("");
  const [branch, setBranch] = useState("swastik-plaza");
  const [timing, setTiming] = useState("Any time");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const location = locations.find((item) => item.slug === branch) ?? locations[0];
    pushTrackingEvent({ event: "appointment_submit", placement: international ? "international_form" : "contact_form", branch: location.slug });
    const message = [
      "Hello Kheni Dental, I would like to request an appointment.",
      `Name: ${name || "Not provided"}`,
      international ? `Country: ${country || "Not provided"}` : null,
      `Clinic: ${location.shortName}, ${location.displayArea}`,
      `Preferred time: ${timing}`,
      `Phone or WhatsApp: ${contact || "Not provided"}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${location.whatsappNumber || site.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[1.5rem] border border-line bg-white p-5 sm:p-7" id="book">
      <div>
        <p className="t-eyebrow text-cobalt-deep">Request an appointment</p>
        <h2 className="t-h3 mt-2">Four details, then WhatsApp opens with them typed in.</h2>
      </div>
      <div>
        <label htmlFor="name" className="t-label">Your name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className={field} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {international && (
          <div>
            <label htmlFor="country" className="t-label">Country you live in</label>
            <input id="country" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" className={field} />
          </div>
        )}
        <div>
          <label htmlFor="contact" className="t-label">Phone or WhatsApp number</label>
          <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required inputMode="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="branch" className="t-label">Clinic you prefer</label>
          <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className={field}>
            {locations.map((location) => (
              <option key={location.slug} value={location.slug}>
                {location.displayArea} ({location.shortName})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timing" className="t-label">When suits you</label>
          <select id="timing" value={timing} onChange={(e) => setTiming(e.target.value)} className={field}>
            <option>Any time</option>
            <option>Morning (9:30 AM to 1 PM)</option>
            <option>Evening (4 PM to 8 PM)</option>
            <option>Saturday</option>
          </select>
        </div>
      </div>
      <p className="t-small text-ink-soft">Please leave out symptoms, diagnoses and medical history. This is only for your contact details. You can discuss the rest with the dentist.</p>
      <button type="submit" className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 text-base font-semibold text-white">
        <MessageCircle className="size-5" aria-hidden="true" />
        Continue on WhatsApp
        <ArrowRight className="cta-arrow size-4" aria-hidden="true" />
      </button>
    </form>
  );
}
