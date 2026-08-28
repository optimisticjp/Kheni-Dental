import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, MessageCircle } from "lucide-react";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { doctors, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function generateStaticParams() { return doctors.map((doctor) => ({ slug: doctor.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) return {};
  return { title: `${doctor.name} | Dentist in Surat`, description: doctor.metaDescription };
}

export default async function DoctorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find((item) => item.slug === slug);
  if (!doctor) notFound();
  const related = treatments.filter((treatment) => doctor.relatedTreatmentSlugs.includes(treatment.slug));
  const message = `Hello Kheni Dental, I would like to request a consultation with ${doctor.name}. Please share the available appointment options.`;

  return <>
    <section className="bg-ink text-white"><Container width="7xl" className="grid min-h-[68vh] items-center gap-12 py-16 lg:grid-cols-[.92fr_1.08fr] lg:py-24"><MediaPlaceholder label={doctor.name} className="min-h-[32rem] lg:order-1"/><div><p className="text-xs font-semibold uppercase tracking-[.22em] text-gold">{doctor.specialty}</p><h1 className="mt-5 font-serif text-5xl leading-[.95] tracking-[-.04em] sm:text-6xl">{doctor.name}</h1><p className="mt-4 text-lg text-white/60">{doctor.credentials} · {doctor.yearsExperience} years of experience</p><div className="mt-6 flex flex-wrap gap-2">{doctor.badges.map((badge) => <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs text-gold"><BadgeCheck className="size-3.5" />{badge}</span>)}</div><p className="mt-7 max-w-xl text-base leading-7 text-white/65">{doctor.bio}</p><div className="mt-8 flex flex-wrap gap-3"><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="doctor_profile" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink"><MessageCircle className="size-4" />Ask about an appointment</a><Link href="/contact#book" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold">Book a consultation</Link></div></div></Container></section>
    <Section spacing="lg"><Container width="7xl"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><SectionHeading eyebrow="Approach to care" title={doctor.approachHeading}/><blockquote className="rounded-[2rem] bg-[#f1eee7] p-7 font-serif text-3xl leading-tight">“{doctor.philosophy}”</blockquote></div></Container></Section>
    <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Related care" title={`Treatments listed under ${doctor.name}.`} copy="Treat these as reading, not as a booking rule. The clinic confirms who you will see when your appointment is arranged."/><div className="mt-10 grid gap-4 md:grid-cols-3">{related.map((treatment) => <Link key={treatment.slug} href={`/treatments/${treatment.slug}`} className="group rounded-2xl border border-white/10 p-6"><p className="text-xs uppercase tracking-[.18em] text-gold">{treatment.eyebrow}</p><h2 className="mt-4 font-serif text-2xl">{treatment.title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{treatment.short}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">See what is involved <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></Container></Section>
  </>;
}
