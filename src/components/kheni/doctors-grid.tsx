import { BadgeCheck, MessageCircle } from "lucide-react";
import { doctors } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { MediaPlaceholder } from "./media-placeholder";

export function DoctorsGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {doctors.map((doctor, index) => (
        <article key={`${doctor.name}-${index}`} className="overflow-hidden rounded-[2rem] border border-gold/20 bg-ink text-white shadow-2xl shadow-black/10">
          <div className="grid md:grid-cols-[0.8fr_1.2fr]">
            <MediaPlaceholder label="Doctor portrait" className="min-h-[24rem] rounded-none border-0" />
            <div className="flex flex-col p-7 sm:p-9">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{doctor.specialty}</p>
              <h3 className="mt-4 font-serif text-3xl">{doctor.name}</h3>
              <p className="mt-2 text-sm text-white/55">{doctor.credentials}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {doctor.badges.map((badge) => <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs text-gold"><BadgeCheck className="size-3.5" />{badge}</span>)}
              </div>
              <p className="mt-6 text-sm leading-6 text-white/65">{doctor.bio}</p>
              <div className="mt-auto pt-8">
                <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="doctor_card" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"><MessageCircle className="size-4" />Consult on WhatsApp</a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
