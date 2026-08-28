import Link from "next/link";
import { ArrowRight, Globe2, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { LocationCard } from "@/components/kheni/location-card";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { ProblemsInteractive } from "@/components/kheni/problems-interactive";
import { SectionHeading } from "@/components/kheni/section-heading";
import { homepageFaqs, locations, resources, site, treatments } from "@/content/site";
import { GoogleProofStrip } from "@/components/kheni/google-proof-strip";
import { GoogleReputationSection } from "@/components/kheni/google-reputation-section";
import { whatsappUrl } from "@/lib/links";

const trust = [
  { icon: Stethoscope, title: "15 years in Surat", copy: "Dr. Mayur Kheni leads the practice, so your dental history stays in one place." },
  { icon: ShieldCheck, title: "Answers before decisions", copy: "You hear the findings and the choices before anything is booked." },
  { icon: HeartHandshake, title: "From a child's first visit onwards", copy: "Check-ups, gum care, braces, root canals and implants, all handled by the same four doctors." },
  { icon: Globe2, title: "Two clinics in Surat", copy: "Swastik Plaza in Nana Varachha and Hirabaug on Varachha Main Road, each with its own number." },
];

const visitSteps = ["You tell us what you noticed", "An examination shows the cause", "You hear the options, including waiting", "You decide what happens next", "We check how it has settled"];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(206,173,108,.18),transparent_31%),radial-gradient(circle_at_13%_82%,rgba(206,173,108,.08),transparent_30%)]" />
        <Container width="7xl" className="relative grid min-h-[78vh] items-center gap-12 py-14 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs font-medium uppercase tracking-[.18em] text-gold"><Sparkles className="size-3.5" />Kheni Dental · Dentist in Surat</div>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(2.75rem,7vw,7.1rem)] leading-[.88] tracking-[-.055em]">Come in with<br/>a question,<br/><span className="gold-text">not a diagnosis.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/62 sm:text-lg">Implants, root canals, braces, gum care and family check-ups at two clinics in Surat. Describe the problem in your own words and let the dentist work out the cause.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#book" data-track="appointment_start" data-placement="home_hero" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink">Book a consultation <ArrowRight className="size-4" /></Link>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="home_hero" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white"><MessageCircle className="size-4 text-gold" />Ask on WhatsApp</a>
            </div>
            <div className="mt-7"><GoogleProofStrip placement="home_hero_google" /></div>
            <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
              <div className="pr-4"><p className="font-serif text-2xl text-gold">{site.yearsInSurat}</p><p className="mt-1 text-[.66rem] uppercase tracking-[.14em] text-white/40">Years serving Surat</p></div>
              <div className="px-4"><p className="font-serif text-2xl text-gold">4</p><p className="mt-1 text-[.66rem] uppercase tracking-[.14em] text-white/40">Doctors on the team</p></div>
              <div className="pl-4"><p className="font-serif text-2xl text-gold">2</p><p className="mt-1 text-[.66rem] uppercase tracking-[.14em] text-white/40">Clinics in Surat</p></div>
            </div>
          </div>
          <div className="relative">
            <MediaPlaceholder label="Dr. Mayur Kheni in the clinic" className="min-h-[31rem] lg:min-h-[40rem]" />
            <div className="absolute -bottom-5 left-3 right-3 rounded-2xl border border-gold/20 bg-[#131311]/95 p-5 shadow-2xl backdrop-blur sm:left-auto sm:right-auto sm:max-w-sm lg:-left-5">
              <p className="text-xs uppercase tracking-[.18em] text-gold">How we work</p>
              <p className="mt-2 font-serif text-xl">We explain the reason before we suggest the treatment.</p>
            </div>
          </div>
        </Container>
      </section>

      <GoogleReputationSection />

      <section className="border-b border-border bg-background">
        <Container width="7xl" className="grid md:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => <div key={item.title} className="border-border px-5 py-8 first:pl-0 md:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"><item.icon className="size-5 text-gold" /><h2 className="mt-4 font-serif text-xl">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p></div>)}
        </Container>
      </section>

      <Section spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Common concerns" title="Which of these sounds closest to you?" copy="Pick the one nearest your situation to see what is usually involved. Reading helps you prepare, but only an examination can name the cause." />
          <div className="mt-12"><ProblemsInteractive limit={6} /></div>
          <div className="mt-8"><Link href="/problems-we-treat" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">See the full list of concerns <ArrowRight className="size-4" /></Link></div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Areas of care" title="Read about a treatment before anyone suggests it." copy="Each page covers what the treatment is for, how planning usually works, what it asks of you and the questions worth asking before you agree to anything." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {treatments.map((t, index) => <Link key={t.slug} href={`/treatments/${t.slug}`} data-track="treatment_view" data-placement="home_services" className="group flex min-h-64 flex-col rounded-[1.5rem] border border-border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-xl"><div className="flex justify-between"><span className="font-mono text-xs text-gold">{String(index + 1).padStart(2, "0")}</span><ArrowRight className="size-4 -rotate-45 text-muted-foreground transition-transform group-hover:rotate-0 group-hover:text-gold" /></div><div className="mt-auto"><p className="text-xs uppercase tracking-[.15em] text-muted-foreground">{t.eyebrow}</p><h3 className="mt-3 font-serif text-2xl">{t.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{t.short}</p></div></Link>)}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="The four doctors" title="Know who will be sitting across from you." copy="Names, degrees, years in practice and the treatments each doctor works with most often." /><Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">See all four profiles <ArrowRight className="size-4" /></Link></div>
          <div className="mt-12"><DoctorsGrid /></div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div><SectionHeading eyebrow="About the practice" title="Why we explain so much before we treat." copy="Kheni Dental has worked in Surat for 15 years, now four doctors across two clinics. Patients decide better when they know what was found and why it matters." /><div className="mt-8 flex flex-wrap gap-3"><Link href="/about" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">How the clinic grew</Link><Link href="/locations" className="rounded-full border border-border px-5 py-3 text-sm font-semibold">See both clinics</Link></div></div>
            <MediaPlaceholder label="The Kheni Dental team in Surat" className="min-h-[31rem]" />
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
            <SectionHeading eyebrow="How a visit runs" title="Five steps, from your first sentence to the review." copy="What happens clinically depends on the diagnosis. The order of the conversation does not change." />
            <div className="grid gap-3 sm:grid-cols-2">
              {visitSteps.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 p-5 last:sm:col-span-2"><span className="font-mono text-xs text-gold">0{index + 1}</span><p className="mt-5 font-serif text-xl">{item}</p></div>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Two addresses" title="Pick whichever clinic is the shorter trip." copy="Both clinics belong to the same practice and follow the same posted hours. Each card opens straight into Google Maps so you can check the route first." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="Coming from abroad" title="Write to us before you book the flight." copy="Tell us the dates you will be in Surat and what you want looked at. The clinic can say what fits in that window and what would need a second visit." />
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/international-patients" className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink">Plan a visit from abroad</Link><a href={whatsappUrl("Hello Kheni Dental, I am an international/NRI patient and would like information about planning a dental visit in Surat.")} target="_blank" rel="noreferrer" data-track="international_patient_contact" data-placement="home_international" className="rounded-full border border-white/15 px-5 py-3 text-sm">Message us on WhatsApp</a></div>
            </div>
            <MediaPlaceholder label="Planning a dental visit to Surat" className="min-h-[30rem]" />
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container width="7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Before you come in" title="Four things worth reading first." copy="First visits, implant planning, root canal aftercare and taking a child to the dentist, in plain words." /><Link href="/patient-resources" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">Read all the guides <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{resources.map((resource) => <Link key={resource.title} href={resource.href} className="group rounded-[1.5rem] border border-border bg-card p-6"><p className="font-serif text-2xl">{resource.title}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{resource.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">Open this guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="Questions we get asked" title="Short answers to what people ask first." copy="These can help you prepare for a visit. They cannot tell you what is happening in your own mouth." /><Accordion items={homepageFaqs} className="bg-white" /></div></Container>
      </Section>

      <section className="bg-gold py-16 text-ink sm:py-20">
        <Container width="7xl" className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.22em]">If you have been putting it off</p><h2 className="mt-3 max-w-3xl font-serif text-4xl leading-none tracking-[-.04em] sm:text-5xl">A phone call is not a commitment.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-ink/65">You do not need to know the treatment, or be sure you want one. Asking how serious something is, or asking for a parent or a child, is reason enough.</p><p className="mt-4 text-xs font-semibold uppercase tracking-[.14em] text-ink/55">★★★★★ {site.googleRating} on Google, Swastik Plaza · {site.googleReviewDisplay} reviews · {site.yearsInSurat} years in Surat</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><Link href="/contact#book" data-track="appointment_start" data-placement="home_final_cta" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm font-semibold text-white">Book a consultation</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="home_final_cta" className="rounded-full border border-ink/20 px-6 py-3.5 text-center text-sm font-semibold">WhatsApp us</a></div>
        </Container>
      </section>
    </>
  );
}
