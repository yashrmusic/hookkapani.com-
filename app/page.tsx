import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ProjectsEnhanced } from "@/components/projects-enhanced";
import { CommissionCta } from "@/components/commission-cta";
import { Manifesto } from "@/components/manifesto";
import { Practice } from "@/components/practice";
import { CapabilityProof } from "@/components/capability-proof";
import { ClientsCollaborations } from "@/components/clients-collaborations";
import { CaseStudiesPreview } from "@/components/case-studies-preview";
import { getCmsContent } from "@/lib/cms-content";
import { HOME_TITLE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const content = await getCmsContent();

  return (
    <>
      <Hero />
      <ProjectsEnhanced featured />
      <CaseStudiesPreview />
      <CapabilityProof />
      <Practice />
      <ClientsCollaborations />
      <Manifesto />
      <CommissionCta />
    </>
  );
}
