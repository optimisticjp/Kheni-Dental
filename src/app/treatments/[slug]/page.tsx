import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { SectionHeading } from "@/components/kheni/section-heading";
import { doctors, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

/**
 * Dental implants has its own flagship route at
 * `src/app/treatments/dental-implants-surat/page.tsx`. It is excluded here so
 * the slug is never prerendered twice and there is no duplicate content. Every
 * other treatment continues to use this generic template unchanged.
 */
const SPECIALIZED_SLUGS = new Set(["dental-implants-surat"]);

export function generateStaticParams(){return treatments.filter(t=>!SPECIALIZED_SLUGS.has(t.slug)).map(t=>({slug:t.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;if(SPECIALIZED_SLUGS.has(slug))return{};const t=treatments.find(x=>x.slug===slug);if(!t)return{};return{title:t.seoTitle,description:t.metaDescription}}

export default async function TreatmentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;if(SPECIALIZED_SLUGS.has(slug))notFound();const t=treatments.find(x=>x.slug===slug);if(!t)notFound();
  const relatedDoctors=doctors.filter(doctor=>doctor.relatedTreatmentSlugs.includes(t.slug));
  const message=`Hello Kheni Dental, I would like to ask about ${t.title}. Please share the available consultation options.`;
  return <>
    <section className="bg-ink text-white"><Container width="7xl" className="grid min-h-[68vh] items-center gap-12 py-16 lg:grid-cols-[1fr_.9fr] lg:py-24"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">{t.eyebrow}</p><h1 className="mt-6 font-serif text-5xl leading-[.94] tracking-[-.045em] sm:text-6xl lg:text-7xl">{t.emotionalHeadline}</h1><p className="mt-5 font-serif text-2xl text-gold">{t.title}</p><p className="mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg">{t.short}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#book" data-track="appointment_start" data-placement="treatment_hero" className="rounded-full bg-gold px-6 py-3.5 text-center text-sm font-semibold text-ink">Book a consultation</Link><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="treatment_hero" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm"><MessageCircle className="size-4 text-gold"/>Ask on WhatsApp</a></div></div><MediaPlaceholder label={`${t.title} at Kheni Dental, Surat`} className="min-h-[30rem]"/></Container></section>
    <Section spacing="lg"><Container width="7xl"><div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><SectionHeading eyebrow="What patients come in with" title={t.problem} copy={t.intro}/><div className="mt-8 grid gap-3 sm:grid-cols-2">{t.benefits.map(b=><div key={b} className="flex gap-3 rounded-2xl border border-border bg-card p-5 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Check className="size-4"/></span><span>{b}</span></div>)}</div></div><div className="rounded-[2rem] bg-[#f1eee7] p-7"><p className="text-xs uppercase tracking-[.2em] text-gold">Important</p><p className="mt-4 font-serif text-3xl">{t.aside.title}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{t.aside.copy}</p></div></div></Container></Section>
    <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="How planning usually works" title={t.processHeading}/><div className="mt-10 grid gap-3 md:grid-cols-4">{t.process.map((step,i)=><article key={step.title} className="rounded-2xl border border-white/10 p-6"><span className="font-mono text-xs text-gold">0{i+1}</span><h2 className="mt-8 font-serif text-2xl">{step.title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{step.copy}</p></article>)}</div></Container></Section>
    {relatedDoctors.length>0&&<Section spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Who you may see" title="The doctors who work in this area." copy="Who treats you depends on the clinic schedule and on what the dentist finds. These profiles tell you what each doctor works on."/><div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{relatedDoctors.map(doctor=><Link key={doctor.slug} href={`/doctors/${doctor.slug}`} className="rounded-2xl border border-border bg-card p-6"><p className="text-xs uppercase tracking-[.18em] text-gold">{doctor.specialty}</p><h2 className="mt-3 font-serif text-2xl">{doctor.name}</h2><p className="mt-2 text-sm text-muted-foreground">{doctor.credentials} · {doctor.yearsExperience} years of experience</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold">View profile <ArrowRight className="size-4"/></span></Link>)}</div></Container></Section>}
    <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><SectionHeading eyebrow="Before you decide" title="Reviews you can check for yourself, on Google." copy="A review cannot tell you what is happening in your own mouth. It can tell you how a clinic talks to people and how patients describe their visits."/><GoogleTrustCard dark placement={`treatment_${t.slug}_google`} /></div></Container></Section>
    <Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="Patient questions" title={`Common questions about ${t.title.toLowerCase()}.`} copy="These answers are general. What applies to you can only be settled after an examination."/><Accordion items={t.faqs} className="bg-white"/></div></Container></Section>
    <section className="bg-gold py-14"><Container width="7xl" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em]">Next step</p><h2 className="mt-2 font-serif text-4xl">{t.ctaTitle}</h2></div><Link href="/contact#book" className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white">Book a consultation <ArrowRight className="size-4"/></Link></Container></section>
  </>;
}
