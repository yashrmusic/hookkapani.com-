import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Projects } from "@/components/projects";
import { Practice } from "@/components/practice";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <Manifesto />
      <Projects />
      <Practice />
      <Contact />
      <Footer />
    </main>
  );
}
