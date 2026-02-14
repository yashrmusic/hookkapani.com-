'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/client-analytics';

type ProjectBriefData = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  decisionRole: string;
  projectType: string;
  location: string;
  dimensions: string;
  budget: string;
  timeline: string;
  description: string;
  website: string;
};

const initialFormData: ProjectBriefData = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  decisionRole: '',
  projectType: '',
  location: '',
  dimensions: '',
  budget: '',
  timeline: '',
  description: '',
  website: '',
};

const selectClassName =
  'w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white cursor-pointer';
const optionClassName = 'bg-white text-black';

export function CommissionForm() {
  const [formData, setFormData] = useState<ProjectBriefData>(initialFormData);
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

      trackEvent('project_brief_submitted', {
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
      });

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch {
      setSubmitError('Could not send your project brief. Please try again.');
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
        className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center mb-16">
          <h2 className="text-headline mb-6">Submit a Project Brief</h2>
          <p className="text-body text-muted-foreground max-w-3xl mx-auto">
            For serious commissioning inquiries. Share project scope, constraints, timeline, and budget
            so we can respond with a clear next-step proposal.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-16 border border-accent/30 bg-accent/5">
            <div className="text-5xl mb-4">Success</div>
            <h3 className="text-title mb-2">Project Brief Received</h3>
            <p className="text-muted-foreground">Our studio will respond within 2 business days.</p>
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
              <Field label="Full Name" id="name">
                <input id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40" placeholder="Your name" />
              </Field>
              <Field label="Work Email" id="email">
                <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40" placeholder="name@company.com" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Phone" id="phone">
                <input id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40" placeholder="+91 ..." />
              </Field>
              <Field label="Company / Institution" id="companyName">
                <input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40" placeholder="Organization name" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Your Role in Decision" id="decisionRole">
                <select id="decisionRole" name="decisionRole" required value={formData.decisionRole} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                  <option value="" disabled className={optionClassName}>Select role</option>
                  <option value="owner" className={optionClassName}>Owner / Founder</option>
                  <option value="curator" className={optionClassName}>Curator</option>
                  <option value="designer" className={optionClassName}>Architect / Designer</option>
                  <option value="procurement" className={optionClassName}>Procurement</option>
                  <option value="other" className={optionClassName}>Other</option>
                </select>
              </Field>
              <Field label="Project Type" id="projectType">
                <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                  <option value="" disabled className={optionClassName}>Select type</option>
                  <option value="private-commission" className={optionClassName}>Private Commission</option>
                  <option value="public-installation" className={optionClassName}>Public Installation</option>
                  <option value="gallery-exhibition" className={optionClassName}>Gallery Exhibition</option>
                  <option value="hospitality" className={optionClassName}>Hospitality / Commercial</option>
                </select>
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Project Location" id="location">
                <input id="location" name="location" required value={formData.location} onChange={handleChange} className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40" placeholder="City, Country" />
              </Field>
              <Field label="Available Installation Dimensions" id="dimensions">
                <input id="dimensions" name="dimensions" required value={formData.dimensions} onChange={handleChange} className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40" placeholder="e.g. 4m x 3m x 2m" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Budget Range" id="budget">
                <select id="budget" name="budget" required value={formData.budget} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                  <option value="" disabled className={optionClassName}>Select range</option>
                  <option value="under-200k" className={optionClassName}>Under INR 2,00,000</option>
                  <option value="200k-500k" className={optionClassName}>INR 2,00,000 - INR 5,00,000</option>
                  <option value="500k-2m" className={optionClassName}>INR 5,00,000 - INR 20,00,000</option>
                  <option value="2m-plus" className={optionClassName}>Above INR 20,00,000</option>
                </select>
              </Field>
              <Field label="Target Timeline" id="timeline">
                <select id="timeline" name="timeline" required value={formData.timeline} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                  <option value="" disabled className={optionClassName}>Select timeline</option>
                  <option value="1-3-months" className={optionClassName}>1-3 months</option>
                  <option value="3-6-months" className={optionClassName}>3-6 months</option>
                  <option value="6-12-months" className={optionClassName}>6-12 months</option>
                  <option value="12-plus-months" className={optionClassName}>12+ months</option>
                </select>
              </Field>
            </div>

            <Field label="Project Goals, Constraints, and Context" id="description">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
                className="w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40 resize-none"
                placeholder="Describe the site, context, curatorial direction, technical constraints, and desired outcome..."
              />
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Project Brief'}
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

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-label mb-2">{label}</label>
      {children}
    </div>
  );
}
