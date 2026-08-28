import type { Metadata } from "next";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Terms & Medical Disclaimer", description: "Medical information disclaimer for Kheni Dental." };

export default function TermsPage() {
  return <><PageHero eyebrow="Terms & medical disclaimer" title="Website information is not a diagnosis." copy="The site helps people understand common dental concerns and prepare for a consultation. Individual treatment decisions require professional assessment." /><Section spacing="lg"><Container width="4xl" className="prose-kheni"><h2>General information only</h2><p>Dental information on this site is educational. Symptoms that sound similar can have different causes, and online information cannot determine what treatment is right for you.</p><h2>Results and timelines vary</h2><p>Treatment descriptions, examples and case photographs are not guarantees. Suitability, healing, treatment time and results vary by patient.</p><h2>Emergency care</h2><p>This website is not an emergency service. If you have severe swelling, uncontrolled bleeding, significant trauma or another urgent medical concern, seek appropriate urgent care.</p></Container></Section></>;
}
