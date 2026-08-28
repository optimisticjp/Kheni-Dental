import type { Metadata } from "next";
import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "Privacy information for the Kheni Dental website." };

export default function PrivacyPage() {
  return <><PageHero eyebrow="Privacy" title="Privacy should be easy to understand too." copy="This notice explains how basic enquiries and optional website analytics are handled." /><Section spacing="lg"><Container width="4xl" className="prose-kheni"><h2>Information you choose to share</h2><p>The site may ask for basic contact details such as your name, phone number, country and preferred clinic so the team can respond to an enquiry. Do not use general enquiry forms to send medical history, diagnosis details or other sensitive health information.</p><h2>WhatsApp and phone contact</h2><p>When you choose WhatsApp, phone or email, your communication is handled by that service and by the clinic. Their own privacy practices may also apply.</p><h2>Analytics and advertising</h2><p>Optional analytics or advertising tools are intended to load only when configured and when the required consent rules are met. The site should not intentionally send patient medical details or form-entered health information to advertising platforms.</p><h2>Contact</h2><p>For privacy questions, contact <a href={`mailto:${site.email}`}>{site.email}</a>.</p></Container></Section></>;
}
