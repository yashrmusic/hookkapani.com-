import { Hero } from "@/components/hero";
import { ProjectsEnhanced } from "@/components/projects-enhanced";
import { StudioGallery } from "@/components/studio-gallery";
import { CommissionForm } from "@/components/commission-form";
import { Manifesto } from "@/components/manifesto";
import { Practice } from "@/components/practice";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsEnhanced />
      <StudioGallery />
      <Manifesto />
      <Practice />
      <CommissionForm />
      <Contact />
    </>
  );
}
