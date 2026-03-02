import { Hero } from "@/components/hero";
import { ProjectsEnhanced } from "@/components/projects-enhanced";
import { TextMarquee } from "@/components/text-marquee";
import { CommissionForm } from "@/components/commission-form";
import { Manifesto } from "@/components/manifesto";
import { Practice } from "@/components/practice";
import { CapabilityProof } from "@/components/capability-proof";
import { ClientsCollaborations } from "@/components/clients-collaborations";
import { CaseStudiesPreview } from "@/components/case-studies-preview";
import { VideoPlayer } from "@/components/video-player";
import { getCmsContent } from "@/lib/cms-content";

const homeVideos = [
  {
    id: 1,
    title: 'Kinetic Motion I',
    caption: 'Motion as medium, time as material.',
    videoUrl: '/videos/video1.mp4',
    tag: 'Studio',
  },
  {
    id: 2,
    title: 'Kinetic Motion II',
    caption: 'The poetry of mechanical movement.',
    videoUrl: '/videos/video2.mp4',
    tag: 'Process',
  },
];

export default async function Home() {
  const content = await getCmsContent();

  return (
    <>
      <Hero />
      <ProjectsEnhanced />
      <CapabilityProof />
      <ClientsCollaborations />
      <CaseStudiesPreview />

      <section className="py-24 px-6 md:px-10 lg:px-16 bg-zinc-950">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-white">MOTION</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeVideos.map((video) => (
              <div key={video.id} className="space-y-4">
                <div className="relative aspect-video bg-zinc-900 overflow-hidden border border-white/10">
                  <VideoPlayer video={video} />
                </div>
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-accent">{video.tag}</span>
                  <h3 className="text-2xl font-bold text-white">{video.title}</h3>
                  <p className="text-white/60">{video.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Manifesto />
      <Practice />
      <CommissionForm />
      <TextMarquee />
    </>
  );
}
