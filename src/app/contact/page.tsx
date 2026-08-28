import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { GoogleTrustCard } from "@/components/kheni/google-trust-card";
import { PageHero } from "@/components/kheni/page-hero";
import { ConsultationForm } from "@/components/kheni/consultation-form";
import { LocationCard } from "@/components/kheni/location-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { locations, site } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact the Clinic in Surat",
  description: "Call Kheni Dental in Surat, message us on WhatsApp or email the clinic. You do not need to know which treatment you need before you get in touch.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Getting in touch should be the easy part." copy="Call the clinic, send a WhatsApp message, or leave your details in the short form below and carry on the conversation there. You do not need a diagnosis or the name of a treatment to start. Say what is troubling you, in whatever words you would use, and the team will take it from there." />
      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <div className="rounded-[2rem] bg-ink p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Reach us directly</p>
                <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="contact_page" className="mt-5 flex items-center gap-3 font-serif text-2xl"><MessageCircle className="size-5 text-gold" />Message us on WhatsApp</a>
                <a href={`tel:${site.primaryPhoneHref}`} data-track="phone_click" data-placement="contact_page" className="mt-5 flex items-center gap-3 font-serif text-2xl"><Phone className="size-5 text-gold" />{site.primaryPhoneDisplay}</a>
                <p className="mt-2 text-xs text-white/45">That number reaches Swastik Plaza. Hirabaug has its own line, listed with the clinics below.</p>
                <a href={`mailto:${site.email}`} className="mt-5 flex items-center gap-3 text-sm text-white/65"><Mail className="size-4 text-gold" />{site.email}</a>
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-card p-6"><MapPin className="size-5 text-gold" /><h2 className="mt-4 font-serif text-2xl">Not sure which branch to pick?</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Tell us where you are travelling from and what the visit is about. We will point you to whichever branch is easier to reach, Swastik Plaza or Hirabaug.</p></div>
              <GoogleTrustCard className="mt-5" placement="contact_google" />
            </div>
            <ConsultationForm />
          </div>
        </Container>
      </Section>
      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <div className="mb-10 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Choose your clinic</p><h2 className="mt-4 font-serif text-4xl sm:text-5xl">Both clinics are one tap away here.</h2></div>
          <div className="grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</div>
        </Container>
      </Section>
    </>
  );
}
