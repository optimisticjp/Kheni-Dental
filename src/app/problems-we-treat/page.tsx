import type { Metadata } from "next";
import { ProblemsInteractive } from "@/components/kheni/problems-interactive";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export const metadata:Metadata={title:"Dental Problems We Treat in Surat",description:"Tooth pain, bleeding gums, a missing tooth, a nervous child, crowded teeth. Start with the problem you have and see what usually comes next in Surat."};
export default function ProblemsPage(){return <><PageHero eyebrow="Problems we treat" title="It usually starts with a sentence like one of these." copy="You do not have to name the problem correctly to get help with it. Pick the one that sounds closest, read what it usually points to, then let a dentist check the real cause."/><Section className="bg-ink text-white" spacing="lg"><Container width="7xl"><ProblemsInteractive/></Container></Section></>}
