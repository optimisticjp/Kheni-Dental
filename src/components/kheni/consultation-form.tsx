"use client";

import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { locations, site } from "@/content/site";
import { pushTrackingEvent } from "@/lib/tracking";

export function ConsultationForm({ international = false }: { international?: boolean }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(international ? "" : "India");
  const [contact, setContact] = useState("");
  const [preference, setPreference] = useState("WhatsApp");
  const [branch, setBranch] = useState("swastik-plaza");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const location = locations.find((item) => item.slug === branch) ?? locations[0];
    pushTrackingEvent({ event: "appointment_submit", placement: international ? "international_form" : "contact_form", branch: location.slug });
    const message = [
      "Hello Kheni Dental, I would like to request a consultation.",
      `Name: ${name || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      `Clinic: ${location.shortName}`,
      `Best way to reach me: ${preference}`,
      `Phone or WhatsApp: ${contact || "Not provided"}`,
    ].join("\n");
    window.open(`https://wa.me/${location.whatsappNumber || site.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-gold/20 bg-card p-6 shadow-sm sm:p-8" id="book">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Request a consultation</p>
        <h2 className="mt-3 font-serif text-3xl">Fill this in and WhatsApp opens.</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">We only ask for the basics. When you press the button, WhatsApp opens with what you entered already typed into a message, so you can add anything else in your own words before you send it.</p>
      </div>
      <div>
        <label htmlFor="name" className="text-sm font-medium">Your name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="text-sm font-medium">Country</label>
          <input id="country" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="contact" className="text-sm font-medium">Phone or WhatsApp number</label>
          <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required inputMode="tel" autoComplete="tel" className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="branch" className="text-sm font-medium">Clinic you prefer</label>
          <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold">
            {locations.map((location) => <option key={location.slug} value={location.slug}>{location.shortName}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="preference" className="text-sm font-medium">Best way to reach you</label>
          <select id="preference" value={preference} onChange={(e) => setPreference(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold">
            <option>WhatsApp</option><option>Phone call</option><option>Email</option>
          </select>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted-foreground">Please leave out symptoms, diagnoses, medical history and any other health details. This form is only for your contact details. You can discuss the rest with the dentist.</p>
      <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">Continue on WhatsApp <ArrowRight className="size-4" /></button>
    </form>
  );
}
