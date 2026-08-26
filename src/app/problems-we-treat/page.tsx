import type { Metadata } from "next";
import { PageHero } from "@/components/kheni/page-hero";
import { ProblemsInteractive } from "@/components/kheni/problems-interactive";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export const metadata: Metadata={title:"Problems We Treat",description:"Start with your dental concern and explore relevant educational treatment pathways at Kheni Elite."};
export default function ProblemsPage(){return <><PageHero eyebrow="Problems we treat" title="Start with what you feel, not a procedure name." copy="An interactive patient-first way to explore dental concerns without encouraging self-diagnosis."/><Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Explore concerns" title="Every concern deserves the right diagnosis." copy="Hover on desktop or tap on mobile to expand a concern and follow the relevant educational pathway."/><div className="mt-12"><ProblemsInteractive/></div></Container></Section></>}
