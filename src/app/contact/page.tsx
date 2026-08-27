import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/kheni/page-hero";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { LocationCard } from "@/components/kheni/location-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = { title: "Contact Kheni Dental Surat", description: "Contact Kheni Dental in Yogi Chowk or Hirabaug, Surat by phone, WhatsApp, email or consultation request." };

export default function ContactPage(){return <>
  <PageHero eyebrow="Contact" title="Tell us what is bothering you. We will help with the next step." copy="Call a branch, ask on WhatsApp or request a consultation. You do not need to choose a treatment before contacting the clinic."/>
  <Section spacing="lg"><Container width="7xl"><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><div className="rounded-[2rem] bg-ink p-7 text-white"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Quick contact</p><a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="contact_page" className="mt-5 flex items-center gap-3 font-serif text-2xl"><MessageCircle className="size-5 text-gold"/>Ask us on WhatsApp</a><a href={`tel:${site.primaryPhoneHref}`} data-track="phone_click" data-placement="contact_page" className="mt-5 flex items-center gap-3 font-serif text-2xl"><Phone className="size-5 text-gold"/>{site.primaryPhoneDisplay}</a><a href={`mailto:${site.email}`} className="mt-5 flex items-center gap-3 text-sm text-white/65"><Mail className="size-4 text-gold"/>{site.email}</a></div><div className="mt-5 rounded-2xl border border-border bg-card p-6"><MapPin className="size-5 text-gold"/><h2 className="mt-4 font-serif text-2xl">Not sure which branch?</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Tell the team what you are coming in for and where you are travelling from. They can help you choose between Yogi Chowk and Hirabaug.</p></div></div><ConsultationForm/></div></Container></Section>
  <Section className="bg-[#f1eee7]" spacing="lg"><Container width="7xl"><div className="grid gap-5 lg:grid-cols-2">{locations.map(location=><LocationCard key={location.slug} location={location}/>)}</div></Container></Section>
</>}
