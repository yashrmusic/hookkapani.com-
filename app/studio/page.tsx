'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { VideoPlayer } from '@/components/video-player';
import { AlertsSignup } from '@/components/alerts-signup';
import { FOUNDER_TRAINING, SCALE_INTERVIEW, STUDIO_REACH } from '@/data/founder';

const processVideos = [
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

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-white">
      <div className="pt-28 md:pt-32 pb-32">
        <header className="container mx-auto px-6 mb-20">
          <span className="block text-[10px] font-mono uppercase tracking-[0.3em] text-white/60 mb-6">
            Studio Process · Vol. 01
          </span>
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
            An unvarnished look at the material logic, mechanical tension and honest construction behind the studio&apos;s latest works.
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter text-white">{video.title}</h2>
                <p className="text-white/60 leading-relaxed font-mono text-sm underline underline-offset-8 decoration-white/20">
                  {video.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Plain markup, no entrance animation: the bio must be readable without JavaScript. */}
        <section aria-labelledby="founder-heading" className="container mx-auto px-6 mt-32 max-w-3xl">
          <h2 id="founder-heading" className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter text-white">
            Vishal Gupta, founder and lead artist
          </h2>
          <p className="text-white/75 leading-relaxed mb-4">
            Vishal Gupta is the founder and lead artist of Hookkapani Studio, a
            kinetic sculpture studio based in New Delhi, India. {FOUNDER_TRAINING} {STUDIO_REACH}
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Source:{' '}
            <a
              href={SCALE_INTERVIEW.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80"
            >
              {SCALE_INTERVIEW.title}
            </a>{' '}
            — {SCALE_INTERVIEW.publication}, {SCALE_INTERVIEW.date}. Full biographies are in the{' '}
            <Link href="/press-kit" className="text-accent hover:text-accent/80">
              press kit
            </Link>
            .
          </p>
        </section>

        <section className="container mx-auto px-6 mt-32 max-w-2xl">
          <AlertsSignup />
        </section>

        <footer className="mt-24 border-t border-white/5 pt-12 pb-4 text-center">
          <p className="text-2xl md:text-4xl font-bold opacity-40 tracking-tighter text-white">
            MATERIAL LOGIC · HONEST CONSTRUCTION · MECHANICAL TENSION
          </p>
        </footer>
      </div>
    </div>
  );
}
