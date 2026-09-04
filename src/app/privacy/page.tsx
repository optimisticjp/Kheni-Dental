import type { Metadata } from "next";

import { PageHero } from "@/components/kheni/page-hero";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy/" },
  title: "Privacy Policy",
  description: "How Kheni Dental handles the details you share through this website, WhatsApp, phone and email, and what you should not send through an enquiry form.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacy should be easy to understand too." highlight="easy" copy="A short note on what happens to the details you send us, and what this website itself collects." hue="sky" proof={false} compact />
      <section className="py-10 sm:py-14">
        <Container width="4xl" className="prose-kheni">
          <h2>Information you choose to share</h2>
          <p>This site may ask for basic contact details, such as your name, phone number, country and the clinic you prefer, so the team can reply to your enquiry. Please do not use a general enquiry form to send medical history, diagnosis details or other sensitive health information.</p>
          <h2>WhatsApp, phone and email</h2>
          <p>If you contact us on WhatsApp, by phone or by email, that message is handled by the service you used as well as by the clinic. The privacy practices of that service may also apply.</p>
          <h2>Videos</h2>
          <p>Videos on this site are hosted on YouTube and load only after you tap play, on YouTube&rsquo;s privacy-enhanced domain. Map imagery on clinic pages is provided by Microsoft Bing Maps.</p>
          <h2>Analytics and advertising</h2>
          <p>Analytics and advertising tools are optional. They load only if we have switched them on and only where you have given the consent that applies to you. We do not send your medical details, or anything you type into a form on this site, to advertising platforms.</p>
          <h2>Contact</h2>
          <p>
            If you have a question about any of this, please write to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
