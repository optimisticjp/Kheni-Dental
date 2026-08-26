import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { treatments } from "@/content/site";

export const metadata: Metadata = { title: "Dental Treatments", description: "Explore implant, restorative, orthodontic, cosmetic, surgical and general dental care at Kheni Elite in Surat." };
export default function TreatmentsPage(){return <><PageHero eyebrow="Treatments" title="Comprehensive dentistry, organized around patient needs." copy="Each treatment page is designed to educate first and convert second, with clear next steps and conservative clinical language."/><Section spacing="lg"><Container width="7xl"><div className="grid gap-4 md:grid-cols-2">{treatments.map((t,i)=><Link key={t.slug} href={`/treatments/${t.slug}`} data-track="treatment_view" data-placement="treatments_index" className="group min-h-64 rounded-[2rem] border border-border bg-card p-7 transition hover:border-gold/50 hover:shadow-xl"><div className="flex justify-between"><span className="font-mono text-xs text-gold">0{i+1}</span><ArrowUpRight className="size-5 text-muted-foreground group-hover:text-gold"/></div><h2 className="mt-12 font-serif text-3xl">{t.title}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{t.short}</p><p className="mt-6 text-xs font-semibold uppercase tracking-[.18em] text-gold">{t.eyebrow}</p></Link>)}</div></Container></Section></>}
