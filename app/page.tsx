import { Hero } from "@/components/hero";
import { ProjectsEnhanced } from "@/components/projects-enhanced";
import { StudioGallery } from "@/components/studio-gallery";
import { TextMarquee } from "@/components/text-marquee";
import { CommissionForm } from "@/components/commission-form";
import { Manifesto } from "@/components/manifesto";
import { Practice } from "@/components/practice";
import { CapabilityProof } from "@/components/capability-proof";
import { ClientsCollaborations } from "@/components/clients-collaborations";
import { CaseStudiesPreview } from "@/components/case-studies-preview";
import { getCmsContent } from "@/lib/cms-content";

export default async function Home() {
  const content = await getCmsContent();

  return (
    <>
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        infoCards={content.hero.infoCards}
      />
      <ProjectsEnhanced />
      <CapabilityProof />
      <ClientsCollaborations />
      <CaseStudiesPreview />
      <Manifesto />
      <StudioGallery />
      <Practice />
      <CommissionForm />
      <TextMarquee />
    </>
  );
}
