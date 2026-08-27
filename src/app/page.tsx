import Link from "next/link";
import { ArrowRight, Globe2, HeartHandshake, MessageCircle, ShieldCheck, Sparkles, Star, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Accordion } from "@/components/ui/accordion";
import { DoctorsGrid } from "@/components/kheni/doctors-grid";
import { LocationCard } from "@/components/kheni/location-card";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { ProblemsInteractive } from "@/components/kheni/problems-interactive";
import { SectionHeading } from "@/components/kheni/section-heading";
import { homepageFaqs, locations, resources, site, treatments } from "@/content/site";
import { whatsappUrl } from "@/lib/links";

const trust = [
  { icon: Stethoscope, title: "15 years in Surat", copy: "A long-standing local dental practice led by Dr. Mayur Kheni." },
  { icon: ShieldCheck, title: "Clear treatment conversations", copy: "Understand the concern, options and next steps before making a decision." },
  { icon: HeartHandshake, title: "Care across ages", copy: "General, restorative, cosmetic, implant and kids dental care within one team." },
  { icon: Globe2, title: "Two Surat locations", copy: "Visit Kheni Dental in Yogi Chowk or Hirabaug." },
];

const journey = ["Tell us what is bothering you", "Examination and diagnosis", "Understand your options", "Choose your plan", "Follow-up and care"];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(206,173,108,.18),transparent_31%),radial-gradient(circle_at_13%_82%,rgba(206,173,108,.08),transparent_30%)]" />
        <Container width="7xl" className="relative grid min-h-[78vh] items-center gap-12 py-14 lg:grid-cols-[1.04fr_.96fr] lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/8 px-3 py-1.5 text-xs font-medium uppercase tracking-[.18em] text-gold"><Sparkles className="size-3.5" />Kheni Dental · Surat</div>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(2.75rem,7vw,7.1rem)] leading-[.88] tracking-[-.055em]">Feel comfortable.<br/>Understand your options.<br/><span className="gold-text">Smile with confidence.</span></h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/62 sm:text-lg">Dental, implant, cosmetic and family care in Surat, with conversations that start with what is bothering you, not a list of procedures.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact#book" data-track="appointment_start" data-placement="home_hero" className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-ink">Book a consultation <ArrowRight className="size-4" /></Link>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="home_hero" className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white"><MessageCircle className="size-4 text-gold" />Ask us on WhatsApp</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-5">
              <div className="pr-4"><div className="flex items-center gap-1 font-serif text-2xl text-gold"><Star className="size-4 fill-current" />{site.googleRating}</div><p className="mt-1 text-[.66rem] uppercase tracking-[.14em] text-white/40">Google rating</p></div>
              <div className="px-4"><p className="font-serif text-2xl text-gold">{site.googleReviewCount}</p><p className="mt-1 text-[.66rem] uppercase tracking-[.14em] text-white/40">Yogi Chowk reviews</p></div>
              <div className="pl-4"><p className="font-serif text-2xl text-gold">{site.yearsInSurat}</p><p className="mt-1 text-[.66rem] uppercase tracking-[.14em] text-white/40">Years experience</p></div>
            </div>
          </div>
          <div className="relative">
            <MediaPlaceholder label="Dr. Mayur Kheni in the clinic" className="min-h-[31rem] lg:min-h-[40rem]" />
            <div className="absolute -bottom-5 left-3 right-3 rounded-2xl border border-gold/20 bg-[#131311]/95 p-5 shadow-2xl backdrop-blur sm:left-auto sm:right-auto sm:max-w-sm lg:-left-5">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Our approach</p>
              <p className="mt-2 font-serif text-xl">Listen carefully. Explain clearly. Plan responsibly.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background">
        <Container width="7xl" className="grid md:grid-cols-2 lg:grid-cols-4">
          {trust.map((item) => <div key={item.title} className="border-border px-5 py-8 first:pl-0 md:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0"><item.icon className="size-5 text-gold" /><h2 className="mt-4 font-serif text-xl">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p></div>)}
        </Container>
      </section>

      <Section spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Start with how you feel" title="You do not need to know the treatment name before you call." copy="Find the concern that sounds most like yours. The website can explain common options, but the dentist still needs to examine the cause before recommending treatment." />
          <div className="mt-12"><ProblemsInteractive limit={6} /></div>
          <div className="mt-8"><Link href="/problems-we-treat" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">See all common concerns <ArrowRight className="size-4" /></Link></div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Treatments" title="The right treatment should make sense before it starts." copy="Explore the main areas of care at Kheni Dental. Each page explains what the treatment may help with, how planning works and what questions to ask." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {treatments.map((t, index) => <Link key={t.slug} href={`/treatments/${t.slug}`} data-track="treatment_view" data-placement="home_services" className="group flex min-h-64 flex-col rounded-[1.5rem] border border-border bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-xl"><div className="flex justify-between"><span className="font-mono text-xs text-gold">{String(index + 1).padStart(2, "0")}</span><ArrowRight className="size-4 -rotate-45 text-muted-foreground transition-transform group-hover:rotate-0 group-hover:text-gold" /></div><div className="mt-auto"><p className="text-xs uppercase tracking-[.15em] text-muted-foreground">{t.eyebrow}</p><h3 className="mt-3 font-serif text-2xl">{t.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{t.short}</p></div></Link>)}
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Your dental team" title="Meet the people behind your care." copy="Real credentials, real experience and a clear idea of who may be involved in your treatment." /><Link href="/doctors" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">Meet all four doctors <ArrowRight className="size-4" /></Link></div>
          <div className="mt-12"><DoctorsGrid /></div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div><SectionHeading eyebrow="15 years in Surat" title="Built around conversations patients can understand." copy="Kheni Dental's story will be expanded with Dr. Mayur's own account of how the clinic started and grew. The website will keep that story personal rather than turning it into corporate mission statements." /><div className="mt-8 flex flex-wrap gap-3"><Link href="/about" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Our story</Link><Link href="/locations" className="rounded-full border border-border px-5 py-3 text-sm font-semibold">Find a branch</Link></div></div>
            <MediaPlaceholder label="Clinic history, team or consultation photography" className="min-h-[31rem]" />
          </div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
            <SectionHeading eyebrow="What to expect" title="A dental visit should leave you with fewer questions, not more." copy="The exact clinical steps vary, but the conversation should always be clear." />
            <div className="grid gap-3 sm:grid-cols-2">
              {journey.map((item, index) => <div key={item} className="rounded-2xl border border-white/10 p-5 last:sm:col-span-2"><span className="font-mono text-xs text-gold">0{index + 1}</span><p className="mt-5 font-serif text-xl">{item}</p></div>)}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl">
          <SectionHeading eyebrow="Two Surat locations" title="Choose the clinic that is easier for your visit." copy="Kheni Dental is currently operating in Yogi Chowk and Hirabaug. Call the branch if you need help choosing a location for a particular doctor or treatment." />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">{locations.map((location) => <LocationCard key={location.slug} location={location} />)}</div>
        </Container>
      </Section>

      <Section className="bg-ink text-white" spacing="lg">
        <Container width="7xl">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div>
              <SectionHeading eyebrow="International and NRI patients" title="Planning dental care while you are in Surat? Start the conversation before you travel." copy="Share your travel window and the kind of dental concern you want assessed. The clinic can then confirm what can realistically be planned before you make treatment assumptions." />
              <div className="mt-8 flex flex-wrap gap-3"><Link href="/international-patients" className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink">Plan an international enquiry</Link><a href={whatsappUrl("Hello Kheni Dental, I am an international/NRI patient and would like information about planning a dental visit in Surat.")} target="_blank" rel="noreferrer" data-track="international_patient_contact" data-placement="home_international" className="rounded-full border border-white/15 px-5 py-3 text-sm">Ask on WhatsApp</a></div>
            </div>
            <MediaPlaceholder label="Surat, clinic and international patient care photography" className="min-h-[30rem]" />
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container width="7xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><SectionHeading eyebrow="Patient resources" title="Better decisions start with better information." copy="Short guides that help patients know what to ask, what to expect and when to contact the clinic." /><Link href="/patient-resources" className="inline-flex items-center gap-2 text-sm font-semibold text-gold">View all resources <ArrowRight className="size-4" /></Link></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{resources.map((resource) => <Link key={resource.title} href={resource.href} className="group rounded-[1.5rem] border border-border bg-card p-6"><p className="font-serif text-2xl">{resource.title}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{resource.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">Read guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div>
        </Container>
      </Section>

      <Section className="bg-[#f1eee7]" spacing="lg">
        <Container width="7xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading eyebrow="Common questions" title="Clear answers before the appointment." copy="General information can prepare you for a visit, but it cannot replace an examination." /><Accordion items={homepageFaqs} className="bg-white" /></div></Container>
      </Section>

      <section className="bg-gold py-16 text-ink sm:py-20">
        <Container width="7xl" className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[.22em]">Start with a conversation</p><h2 className="mt-3 max-w-3xl font-serif text-4xl leading-none tracking-[-.04em] sm:text-5xl">Tell us what is bothering you.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-ink/65">You do not need to choose a treatment before you contact the clinic. Ask for an appointment and let the assessment guide the next step.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><Link href="/contact#book" data-track="appointment_start" data-placement="home_final_cta" className="rounded-full bg-ink px-6 py-3.5 text-center text-sm font-semibold text-white">Book a consultation</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" data-track="whatsapp_click" data-placement="home_final_cta" className="rounded-full border border-ink/20 px-6 py-3.5 text-center text-sm font-semibold">WhatsApp</a></div>
        </Container>
      </section>
    </>
  );
}
