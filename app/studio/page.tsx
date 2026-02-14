'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { VideoPlayer } from '@/components/video-player';

const processVideos = [
  {
    id: 1,
    title: 'The Initial Strike',
    caption: 'Metal forging in the early hours.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sparks-flying-from-welding-2680-large.mp4',
    tag: 'Studio',
  },
  {
    id: 2,
    title: 'Linear Precision',
    caption: "Precision welding of the Sitar player's frame.",
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-welder-working-in-a-workshop-40545-large.mp4',
    tag: 'Metal',
  },
  {
    id: 3,
    title: 'Material Memory',
    caption: 'Bending hand-drawn copper wire into form.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-factory-machine-working-on-a-production-line-43896-large.mp4',
    tag: 'Process',
  },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:text-accent transition-colors">H/K</Link>
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Studio Process Feed - Vol 01</span>
      </nav>

      <div className="pt-24 pb-32">
        <header className="container mx-auto px-6 mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white"
          >
            PROCESS.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60 max-w-2xl font-mono uppercase tracking-widest leading-relaxed"
          >
            A raw look into the material logic, mechanical tension, and honest construction of the studio&apos;s latest works.
          </motion.p>
        </header>

        <section className="container mx-auto px-6 space-y-32 md:space-y-64">
          {processVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="relative w-full md:w-2/3 aspect-video bg-zinc-800 overflow-hidden group border border-white/5">
                <VideoPlayer video={video} />
              </div>

              <div className="w-full md:w-1/3">
                <span className="inline-block px-3 py-1 border border-white/20 text-[10px] uppercase font-mono tracking-widest mb-6 text-accent">
                  {video.tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter text-white">{video.title}</h3>
                <p className="text-white/60 leading-relaxed font-mono text-sm underline underline-offset-8 decoration-white/20">
                  {video.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        <footer className="mt-32 border-t border-white/5 pt-12 text-center overflow-hidden">
          <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap overflow-visible">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="text-8xl font-bold opacity-10 tracking-tighter text-white">
                MATERIAL LOGIC - HONEST CONSTRUCTION - MECHANICAL TENSION -
              </span>
            ))}
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
