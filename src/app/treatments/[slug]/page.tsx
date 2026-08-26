import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { SectionHeading } from "@/components/kheni/section-heading";
import { treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export function generateStaticParams(){return treatments.map(t=>({slug:t.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const t=treatments.find(x=>x.slug===slug);if(!t)return{};return{title:t.title,description:t.short}}

export default async function TreatmentPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const t=treatments.find(x=>x.slug===slug);if(!t)notFound();
  return <>
    <section className="bg-ink text-white"><Container width="7xl" className="grid min-h-[68vh] items-center gap-12 py-16 lg:grid-cols-[1fr_.9fr] lg:py-24"><div><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">{t.eyebrow}</p><h1 className="mt-6 font-serif text-5xl leading-[.95] tracking-[-.045em] sm:text-6xl lg:text-7xl">{t.title}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-white/60">{t.short}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/contact#book" data-track="appointment_start" data-placement="treatment_hero" className="rounded-full bg-gold px-6 py-3.5 text-center text-sm font-semibold text-ink">Book consultation</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="treatment_hero" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm"><MessageCircle className="size-4 text-gold"/>WhatsApp</a></div></div><MediaPlaceholder label={`${t.title}: replace with real clinical / doctor / treatment photography`} className="min-h-[30rem]"/></Container></section>
    <Section spacing="lg"><Container width="7xl"><div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><SectionHeading eyebrow="Understanding treatment" title={`What to know about ${t.title.toLowerCase()}.`} copy={t.intro}/><div className="mt-8 grid gap-3 sm:grid-cols-2">{t.benefits.map(b=><div key={b} className="flex gap-3 rounded-2xl border border-border bg-card p-5 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Check className="size-4"/></span><span>{b}</span></div>)}</div></div><div className="rounded-[2rem] bg-[#f1eee7] p-7"><p className="text-xs uppercase tracking-[.2em] text-gold">Common concern</p><p className="mt-4 font-serif text-3xl">{t.problem}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">Do not self-diagnose from this page. Similar symptoms can have different causes, and treatment decisions require appropriate professional assessment.</p></div></div></Container></Section>
    <Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Patient journey" title="A clear, staged treatment process."/><div className="mt-10 grid gap-3 md:grid-cols-4">{t.process.map((step,i)=><article key={step.title} className="rounded-2xl border border-white/10 p-6"><span className="font-mono text-xs text-gold">0{i+1}</span><h2 className="mt-8 font-serif text-2xl">{step.title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{step.copy}</p></article>)}</div></Container></Section>
    <Section spacing="lg"><Container width="7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="Questions" title={`Common questions about ${t.title.toLowerCase()}.`} copy="These answers are educational and should be reviewed by the treating doctors before publication."/><Accordion items={t.faqs}/></div></Container></Section>
    <section className="bg-gold py-14"><Container width="7xl" className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em]">Next step</p><h2 className="mt-2 font-serif text-4xl">Discuss your case with the clinic.</h2></div><Link href="/contact#book" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white">Book consultation <ArrowRight className="size-4"/></Link></Container></section>
  </>;
}
