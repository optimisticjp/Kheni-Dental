import type { Metadata } from "next";
import { PageHero } from "@/components/kheni/page-hero";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export const metadata:Metadata={title:"Smile Gallery | Kheni Dental",description:"Future patient-approved before and after dental cases from Kheni Dental in Surat."};
export default function SmileGallery(){return <><PageHero eyebrow="Smile gallery" title="Real work should speak for itself." copy="This gallery is reserved for genuine Kheni Dental cases with appropriate patient consent. No stock before-and-after images or fabricated results."/><Section spacing="lg"><Container width="7xl"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{['Dental implant case','Smile design case','Restorative dentistry case','Alignment case','Full mouth case','Kids or preventive case'].map(label=><MediaPlaceholder key={label} label={label} className="min-h-[24rem]"/>)}</div><p className="mt-8 text-sm leading-6 text-muted-foreground">Results vary by patient. Final case captions should state the treatment performed and avoid promises that imply every patient will get the same outcome.</p></Container></Section></>}
