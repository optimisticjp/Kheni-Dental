import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { treatments } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/treatments/" },
  title: "Dental Treatments in Surat",
  description: "Dental implants, root canals, crowns, braces, gum care, kids dentistry and smile design in Surat. See what each treatment involves before you decide anything.",
};

export default function TreatmentsPage() {
  return <><PageHero eyebrow="Treatments in Surat" title="You do not need the name of the treatment." copy="Have a look through these pages if it helps you put words to the problem. If it does not, describe what you are feeling when you call and let the examination decide where care starts."/><Section spacing="lg"><Container width="7xl"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{treatments.map((treatment,index)=><Link key={treatment.slug} href={`/treatments/${treatment.slug}/`} className="group flex min-h-80 flex-col rounded-[2rem] border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"><div className="flex items-start justify-between"><span className="font-mono text-xs text-gold">{String(index+1).padStart(2,"0")}</span><ArrowRight className="size-4 -rotate-45 text-muted-foreground transition-transform group-hover:rotate-0 group-hover:text-gold"/></div><div className="mt-auto"><p className="text-xs uppercase tracking-[.18em] text-muted-foreground">{treatment.eyebrow}</p><h2 className="mt-3 font-serif text-3xl">{treatment.title}</h2><p className="mt-4 font-serif text-xl leading-tight text-gold">{treatment.emotionalHeadline}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{treatment.short}</p></div></Link>)}</div></Container></Section></>;
}
