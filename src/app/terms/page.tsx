import type { Metadata } from "next";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = { title: "Terms & Medical Disclaimer", description: "What the information on the Kheni Dental website can and cannot do, why results differ from patient to patient, and what to do if your problem is urgent." };

export default function TermsPage() {
  return <><PageHero eyebrow="Terms & medical disclaimer" title="Website information is not a diagnosis." copy="This site can help you understand a common dental problem and walk into a consultation better prepared. It cannot tell you what is wrong or which treatment you need. That takes an examination." /><Section spacing="lg"><Container width="4xl" className="prose-kheni"><h2>General information only</h2><p>Everything written here is for general education. Two problems can sound identical and still have completely different causes, so nothing you read online can decide what treatment is right for you.</p><h2>Results and timelines vary</h2><p>Treatment descriptions, examples and case photographs on this site are not guarantees. Whether a treatment suits you, how you heal, how long it takes and what the result looks like all vary from patient to patient.</p><h2>Emergency care</h2><p>This website is not an emergency service. If you have severe swelling, bleeding that will not stop, a significant injury or another urgent medical concern, please seek appropriate urgent care straight away.</p></Container></Section></>;
}
