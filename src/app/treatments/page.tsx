import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { treatments } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Treatments in Surat",
  description: "Explore dental implants, root canal treatment, smile design, kids dentistry, gum care and other treatment areas at Kheni Dental in Surat.",
};

export default function TreatmentsPage() {
  return <><PageHero eyebrow="Treatments" title="Start with the problem. Understand the options. Then decide." copy="Each treatment page explains what it may help with, how planning usually works and what questions are worth asking before treatment."/><Section spacing="lg"><Container width="7xl"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{treatments.map((treatment,index)=><Link key={treatment.slug} href={`/treatments/${treatment.slug}`} className="group flex min-h-80 flex-col rounded-[2rem] border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"><div className="flex items-start justify-between"><span className="font-mono text-xs text-gold">{String(index+1).padStart(2,"0")}</span><ArrowRight className="size-4 -rotate-45 text-muted-foreground transition-transform group-hover:rotate-0 group-hover:text-gold"/></div><div className="mt-auto"><p className="text-xs uppercase tracking-[.18em] text-muted-foreground">{treatment.eyebrow}</p><h2 className="mt-3 font-serif text-3xl">{treatment.title}</h2><p className="mt-4 font-serif text-xl leading-tight text-gold">{treatment.emotionalHeadline}</p><p className="mt-4 text-sm leading-6 text-muted-foreground">{treatment.short}</p></div></Link>)}</div></Container></Section></>;
}
