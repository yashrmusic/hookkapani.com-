'use client';

import { useEffect, useRef, useState } from 'react';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          description: message || 'General inquiry from contact form.',
          projectType: 'contact',
          budget: 'not-specified',
          timeline: 'not-specified',
          website,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setWebsite('');
    } catch {
      setSubmitError('Could not send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32 px-6 md:px-10 lg:px-16 bg-background">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <p
          className="mb-3 text-xs tracking-[0.4em] uppercase text-muted-foreground transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
          }}
        >
          Get in Touch
        </p>
        <h2
          className="font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: '150ms',
          }}
        >
          Start a Conversation
        </h2>
        <p
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transitionDelay: '300ms',
          }}
        >
          Whether you&apos;re a gallery curator, interior designer, collector, or
          simply curious about kinetic sculpture - we&apos;d love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex max-w-lg flex-col gap-6 transition-all duration-700"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '500ms',
          }}
        >
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex-1 relative z-40">
              <label htmlFor="name-input" className="sr-only">
                Name
              </label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none transition-colors duration-300"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email-input" className="sr-only">
                Email
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none transition-colors duration-300"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label htmlFor="message-input" className="sr-only">
              Message
            </label>
            <textarea
              id="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your project or inquiry"
              rows={3}
              className="w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/40 focus:border-accent focus:outline-none transition-colors duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="self-center border border-foreground/20 bg-transparent px-10 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent active:bg-accent/80 min-h-[44px] touch-manipulation disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : submitted ? 'Sent' : 'Send Message'}
          </button>
        </form>

        {submitted && (
          <p className="mt-6 text-xs tracking-[0.15em] uppercase text-accent animate-fade-up">
            Thank you. We&apos;ll be in touch soon.
          </p>
        )}
        {submitError && (
          <p className="mt-6 text-xs tracking-[0.12em] uppercase text-red-400">
            {submitError}
          </p>
        )}
      </div>
    </section>
  );
}
