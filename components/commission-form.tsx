'use client';

import { useEffect, useRef, useState } from 'react';

type CommissionFormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  website: string;
};

const initialFormData: CommissionFormData = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  timeline: '',
  description: '',
  website: '',
};

export function CommissionForm() {
  const [formData, setFormData] = useState<CommissionFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError('Could not send your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="commission"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-headline mb-6">Commission a Work</h2>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Each piece is developed through dialogue. Share your vision, space, and intentions,
            and we&apos;ll explore how kinetic sculpture can transform your environment.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-16 border border-accent/30 bg-accent/5">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="text-title mb-2">Inquiry Received</h3>
            <p className="text-muted-foreground">We&apos;ll respond within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative z-40">
                <label htmlFor="name" className="block text-label mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-label mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative z-40">
                <label htmlFor="projectType" className="block text-label mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-border focus:border-accent py-3 px-0 outline-none transition-colors text-foreground cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" disabled className="bg-black text-white">Select type</option>
                  <option value="sculpture" className="bg-black text-white">Kinetic Sculpture</option>
                  <option value="installation" className="bg-black text-white">Site Installation</option>
                  <option value="collaboration" className="bg-black text-white">Collaboration</option>
                  <option value="other" className="bg-black text-white">Other</option>
                </select>
              </div>
              <div className="relative z-40">
                <label htmlFor="budget" className="block text-label mb-2">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-border focus:border-accent py-3 px-0 outline-none transition-colors text-foreground cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                >
                  <option value="" disabled className="bg-black text-white">Select range</option>
                  <option value="under-50k" className="bg-black text-white">Under INR 50,000</option>
                  <option value="50k-2l" className="bg-black text-white">INR 50,000 - INR 2,00,000</option>
                  <option value="2l-5l" className="bg-black text-white">INR 2,00,000 - INR 5,00,000</option>
                  <option value="5l+" className="bg-black text-white">Above INR 5,00,000</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="timeline" className="block text-label mb-2">
                Expected Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b-2 border-border focus:border-accent py-3 px-0 outline-none transition-colors text-foreground cursor-pointer"
                style={{ colorScheme: 'dark' }}
              >
                <option value="" disabled className="bg-black text-white">Select timeline</option>
                <option value="1-3-months" className="bg-black text-white">1-3 months</option>
                <option value="3-6-months" className="bg-black text-white">3-6 months</option>
                <option value="6-12-months" className="bg-black text-white">6-12 months</option>
                <option value="flexible" className="bg-black text-white">Flexible</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-label mb-2">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40 resize-none"
                placeholder="Describe your vision, space, and any specific requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
            {submitError && (
              <p className="text-sm text-red-400">{submitError}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
