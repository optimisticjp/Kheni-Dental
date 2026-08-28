import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MessageCircle } from "lucide-react";
import type { Doctor } from "@/content/site";
import { whatsappUrl } from "@/lib/links";
import { MediaPlaceholder } from "./media-placeholder";

function DoctorContent({ doctor }: { doctor: Doctor }) {
  const message = `Hello Kheni Dental, I would like to request a consultation with ${doctor.name}. Please share the available appointment options.`;
  return (
    <div className="flex h-full flex-col p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">{doctor.specialty}</p>
      <h3 className="mt-4 font-serif text-3xl">{doctor.name}</h3>
      <p className="mt-2 text-sm text-white/55">{doctor.credentials} · {doctor.yearsExperience} years of experience</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {doctor.badges.map((badge) => <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs text-gold"><BadgeCheck className="size-3.5" />{badge}</span>)}
      </div>
      <p className="mt-6 text-sm leading-6 text-white/65">{doctor.bio}</p>
      <div className="mt-auto flex flex-wrap gap-3 pt-7">
        <Link href={`/doctors/${doctor.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold hover:border-gold/40 hover:text-gold">View profile <ArrowUpRight className="size-4" /></Link>
        <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="doctor_card" className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-ink"><MessageCircle className="size-4" />WhatsApp</a>
      </div>
    </div>
  );
}

export function DoctorCard({ doctor, featured = false }: { doctor: Doctor; featured?: boolean }) {
  if (featured) {
    return (
      <article className="overflow-hidden rounded-[2rem] border border-gold/20 bg-ink text-white shadow-xl shadow-black/10">
        <div className="grid lg:grid-cols-[.92fr_1.08fr]">
          <MediaPlaceholder label={doctor.name} className="min-h-[30rem] rounded-none border-0" />
          <DoctorContent doctor={doctor} />
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-gold/20 bg-ink text-white shadow-xl shadow-black/10">
      <MediaPlaceholder label={doctor.name} className="min-h-[18rem] rounded-none border-0" />
      <DoctorContent doctor={doctor} />
    </article>
  );
}
