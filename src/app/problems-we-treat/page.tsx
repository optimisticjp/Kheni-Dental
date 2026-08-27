import type { Metadata } from "next";
import { ProblemsInteractive } from "@/components/kheni/problems-interactive";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export const metadata:Metadata={title:"Dental Problems We Treat in Surat",description:"Start with the dental problem you are experiencing and explore relevant treatment information at Kheni Dental in Surat."};
export default function ProblemsPage(){return <><PageHero eyebrow="Problems we treat" title="Start with what is bothering you." copy="Patients usually know the problem before they know the treatment name. Use these common concerns to find useful information, then let an examination confirm the cause."/><Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><ProblemsInteractive/></Container></Section></>}
