import type { Metadata } from "next";
import { PageHero } from "@/components/kheni/page-hero";
import { MediaPlaceholder } from "@/components/kheni/media-placeholder";
import { SectionHeading } from "@/components/kheni/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
export const metadata:Metadata={title:"Smile Gallery",description:"A future gallery for consented Kheni Elite treatment cases and smile transformations."};
export default function GalleryPage(){return <><PageHero eyebrow="Smile gallery" title="Real cases. Carefully documented." copy="This gallery is intentionally built with placeholders until the clinic provides approved before-and-after cases and patient consent."/><Section spacing="lg"><Container width="7xl"><SectionHeading eyebrow="Case library" title="Use proof responsibly." copy="Each published case should state what was done without implying that every patient will achieve the same result."/><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{Array.from({length:6}).map((_,i)=><MediaPlaceholder key={i} label={`Before / after case ${i+1}`} className="min-h-80"/>)}</div></Container></Section></>}
