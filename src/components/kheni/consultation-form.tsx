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
  const [branch, setBranch] = useState("yogi-chowk");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const location = locations.find((item) => item.slug === branch) ?? locations[0];
    pushTrackingEvent({ event: "appointment_submit", placement: international ? "international_form" : "contact_form", branch: location.slug });
    const message = [
      "Hello Kheni Dental, I would like to request a consultation.",
      `Name: ${name || "Not provided"}`,
      `Country: ${country || "Not provided"}`,
      `Preferred branch: ${location.shortName}`,
      `Preferred contact: ${preference}`,
      `Phone/WhatsApp: ${contact || "Not provided"}`,
    ].join("\n");
    window.open(`https://wa.me/${location.whatsappNumber || site.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-[2rem] border border-gold/20 bg-card p-6 shadow-sm sm:p-8" id="book">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Request a consultation</p>
        <h2 className="mt-3 font-serif text-3xl">Tell us how to reach you.</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">No long medical form here. Share the basics and continue the conversation directly with the clinic.</p>
      </div>
      <div>
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="country" className="text-sm font-medium">Country</label>
          <input id="country" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold" />
        </div>
        <div>
          <label htmlFor="contact" className="text-sm font-medium">Phone / WhatsApp</label>
          <input id="contact" value={contact} onChange={(e) => setContact(e.target.value)} required inputMode="tel" autoComplete="tel" className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="branch" className="text-sm font-medium">Preferred branch</label>
          <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold">
            {locations.map((location) => <option key={location.slug} value={location.slug}>{location.shortName}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="preference" className="text-sm font-medium">Preferred contact</label>
          <select id="preference" value={preference} onChange={(e) => setPreference(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 outline-none focus:border-gold">
            <option>WhatsApp</option><option>Phone call</option><option>Email</option>
          </select>
        </div>
      </div>
      <p className="text-xs leading-5 text-muted-foreground">Please do not enter diagnosis, symptoms, medical history or other sensitive health information in general website forms.</p>
      <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5">Continue on WhatsApp <ArrowRight className="size-4" /></button>
    </form>
  );
}
