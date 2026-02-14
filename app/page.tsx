import { Hero } from "@/components/hero";
import { ProjectsEnhanced } from "@/components/projects-enhanced";
import { StudioGallery } from "@/components/studio-gallery";
import { TextMarquee } from "@/components/text-marquee";
import { CommissionForm } from "@/components/commission-form";
import { Manifesto } from "@/components/manifesto";
import { Practice } from "@/components/practice";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsEnhanced />
      <Manifesto />
      <StudioGallery />
      <Practice />
      <CommissionForm />
      <TextMarquee />
    </>
  );
}
