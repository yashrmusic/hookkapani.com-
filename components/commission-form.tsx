'use client';

import { useEffect, useRef, useState } from 'react';
import { trackEvent } from '@/lib/client-analytics';
import { artworks } from '@/data/artworks';

type ProjectBriefData = {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  decisionRole: string;
  projectType: string;
  location: string;
  dimensions: string;
  ceilingHeight: string;
  mounting: string;
  environment: string;
  powerAvailable: string;
  siteMediaLink: string;
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
  ceilingHeight: '',
  mounting: '',
  environment: '',
  powerAvailable: '',
  siteMediaLink: '',
  budget: '',
  timeline: '',
  description: '',
  website: '',
};

const selectClassName =
  'w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white cursor-pointer';
const inputClassName =
  'w-full bg-transparent border-b-2 border-white/20 focus:border-accent py-3 px-0 outline-none transition-colors text-white placeholder:text-white/40';
const optionClassName = 'bg-white text-black';

const STEPS = ['About you', 'The site', 'Scope & timeline'];
const STEP_FIELDS: (keyof ProjectBriefData)[][] = [
  ['name', 'email', 'decisionRole'],
  ['projectType', 'location', 'dimensions'],
  ['timeline', 'budget', 'description'],
];
const STEP_FIRST_FIELD = ['name', 'projectType', 'timeline'];

export function CommissionForm({ hideHeader = false }: { hideHeader?: boolean }) {
  const [formData, setFormData] = useState<ProjectBriefData>(initialFormData);
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState('');
  const [referenceIds, setReferenceIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const goToStep = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => document.getElementById(STEP_FIRST_FIELD[next])?.focus());
  };

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reference works arrive from work pages (?work= / ?works=) or the saved shortlist.
  useEffect(() => {
    const ids = new Set<string>();
    const params = new URLSearchParams(window.location.search);
    const single = params.get('work');
    if (single) ids.add(single);
    const multi = params.get('works');
    if (multi) multi.split(',').forEach((id) => id.trim() && ids.add(id.trim()));
    try {
      const raw = window.localStorage.getItem('hk-shortlist');
      if (raw) (JSON.parse(raw) as string[]).forEach((id) => ids.add(id));
    } catch {
      /* ignore */
    }
    setReferenceIds([...ids].filter((id) => artworks.some((a) => a.id === id)));
  }, []);

  const referenceWorks = referenceIds
    .map((id) => artworks.find((a) => a.id === id))
    .filter(Boolean)
    .map((a) => `${a!.title} (hookkapani.com/work/${a!.id})`)
    .join('; ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStep = (s: number): boolean => {
    const missing = STEP_FIELDS[s].find((f) => !formData[f]?.trim());
    if (missing) {
      setStepError('Please complete the required fields in this step before continuing.');
      return false;
    }
    if (s === 0 && formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStepError('Please enter a valid email address.');
      return false;
    }
    setStepError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/commission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, referenceWorks }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || 'Submission failed');
      }

      trackEvent('project_brief_submitted', {
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        referenceWorksCount: referenceIds.length,
      });

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not send your project brief. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="commission-form" className={hideHeader ? '' : 'py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-background'}>
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {!hideHeader && (
          <div className="text-center mb-16">
            <h2 className="text-headline mb-6">Submit a Project Brief</h2>
            <p className="text-body text-muted-foreground max-w-3xl mx-auto">
              For commissioning enquiries. Share the project scope, constraints and timeline, and
              the studio will respond with a clear proposal for the next steps.
            </p>
          </div>
        )}

        {isSubmitted ? (
          <div
            ref={successRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="text-center py-16 border border-accent/30 bg-accent/5"
          >
            <h3 className="text-title mb-2">Thank you — your brief has been received</h3>
            <p className="text-muted-foreground">
              The studio will respond within two business days; a site survey and a written
              proposal follow.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-10"
            aria-busy={isSubmitting}
            data-hydrated={isHydrated}
          >
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

            {/* Progress */}
            <div>
              <div className="flex justify-between gap-2 mb-3">
                {STEPS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => i < step && goToStep(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className={`text-sm font-medium ${i === step ? 'text-accent' : i < step ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {i + 1}. {label}
                  </button>
                ))}
              </div>
              <div className="h-1 bg-white/10">
                <div className="h-full bg-accent transition-all duration-300" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
              </div>
            </div>

            {referenceIds.length > 0 && (
              <div className="border border-accent/40 bg-accent/5 p-4">
                <p className="text-sm font-medium mb-2">Reference works attached to this brief</p>
                <div className="flex flex-wrap gap-2">
                  {referenceIds.map((id) => {
                    const a = artworks.find((x) => x.id === id);
                    if (!a) return null;
                    return (
                      <span key={id} className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-sm">
                        {a.title}
                        <button
                          type="button"
                          aria-label={`Remove ${a.title}`}
                          onClick={() => setReferenceIds((prev) => prev.filter((x) => x !== id))}
                          className="text-accent hover:text-foreground"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 0 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full Name *" id="name">
                    <input id="name" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className={inputClassName} placeholder="Your name" />
                  </Field>
                  <Field label="Work Email *" id="email">
                    <input id="email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className={inputClassName} placeholder="name@company.com" />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Phone" id="phone">
                    <input id="phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={inputClassName} placeholder="+91 ..." />
                  </Field>
                  <Field label="Company / Institution" id="companyName">
                    <input id="companyName" name="companyName" autoComplete="organization" value={formData.companyName} onChange={handleChange} className={inputClassName} placeholder="Organisation name" />
                  </Field>
                </div>
                <Field label="Your Role in the Decision *" id="decisionRole">
                  <select id="decisionRole" name="decisionRole" required value={formData.decisionRole} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                    <option value="" disabled className={optionClassName}>Select role</option>
                    <option value="owner" className={optionClassName}>Owner / Founder</option>
                    <option value="curator" className={optionClassName}>Curator</option>
                    <option value="designer" className={optionClassName}>Architect / Designer</option>
                    <option value="procurement" className={optionClassName}>Procurement</option>
                    <option value="other" className={optionClassName}>Other</option>
                  </select>
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Project Type *" id="projectType">
                    <select id="projectType" name="projectType" required value={formData.projectType} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                      <option value="" disabled className={optionClassName}>Select type</option>
                      <option value="private-commission" className={optionClassName}>Private Commission</option>
                      <option value="public-installation" className={optionClassName}>Public Installation</option>
                      <option value="gallery-exhibition" className={optionClassName}>Gallery Exhibition</option>
                      <option value="hospitality" className={optionClassName}>Hospitality / Commercial</option>
                    </select>
                  </Field>
                  <Field label="Project Location *" id="location">
                    <input id="location" name="location" required autoComplete="address-level2" value={formData.location} onChange={handleChange} className={inputClassName} placeholder="City, Country" />
                  </Field>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Available Installation Dimensions *" id="dimensions">
                    <input id="dimensions" name="dimensions" required value={formData.dimensions} onChange={handleChange} className={inputClassName} placeholder="e.g. 4m x 3m x 2m" />
                  </Field>
                  <Field label="Ceiling Height" id="ceilingHeight">
                    <input id="ceilingHeight" name="ceilingHeight" value={formData.ceilingHeight} onChange={handleChange} className={inputClassName} placeholder="e.g. 6 m (double-height atrium)" />
                  </Field>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <Field label="Mounting" id="mounting">
                    <select id="mounting" name="mounting" value={formData.mounting} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                      <option value="" disabled className={optionClassName}>Select</option>
                      <option value="floor-standing" className={optionClassName}>Floor-standing</option>
                      <option value="suspended" className={optionClassName}>Suspended</option>
                      <option value="wall-mounted" className={optionClassName}>Wall-mounted</option>
                      <option value="not-sure" className={optionClassName}>Not sure yet</option>
                    </select>
                  </Field>
                  <Field label="Environment" id="environment">
                    <select id="environment" name="environment" value={formData.environment} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                      <option value="" disabled className={optionClassName}>Select</option>
                      <option value="indoor" className={optionClassName}>Indoor</option>
                      <option value="outdoor" className={optionClassName}>Outdoor</option>
                      <option value="both" className={optionClassName}>Both</option>
                    </select>
                  </Field>
                  <Field label="Power Available at Site" id="powerAvailable">
                    <select id="powerAvailable" name="powerAvailable" value={formData.powerAvailable} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                      <option value="" disabled className={optionClassName}>Select</option>
                      <option value="yes" className={optionClassName}>Yes</option>
                      <option value="no" className={optionClassName}>No</option>
                      <option value="not-sure" className={optionClassName}>Not sure</option>
                    </select>
                  </Field>
                </div>
                <Field label="Site Photos / Plans (link)" id="siteMediaLink">
                  <input id="siteMediaLink" type="url" name="siteMediaLink" autoComplete="url" value={formData.siteMediaLink} onChange={handleChange} className={inputClassName} placeholder="Google Drive, WeTransfer or similar link to site photos, plans or drawings" />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Target Timeline *" id="timeline">
                    <select id="timeline" name="timeline" required value={formData.timeline} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                      <option value="" disabled className={optionClassName}>Select timeline</option>
                      <option value="1-3-months" className={optionClassName}>1–3 months</option>
                      <option value="3-6-months" className={optionClassName}>3–6 months</option>
                      <option value="6-12-months" className={optionClassName}>6–12 months</option>
                      <option value="12-plus-months" className={optionClassName}>12+ months</option>
                    </select>
                  </Field>
                  <Field label="Budget Range *" id="budget">
                    <select id="budget" name="budget" required value={formData.budget} onChange={handleChange} className={selectClassName} style={{ colorScheme: 'light' }}>
                      <option value="" disabled className={optionClassName}>Select budget range</option>
                      <option value="400k-500k" className={optionClassName}>₹4–5 lakh</option>
                      <option value="500k-2m" className={optionClassName}>₹5 lakh – ₹20 lakh</option>
                      <option value="2m-plus" className={optionClassName}>₹20 lakh+</option>
                      <option value="not-specified" className={optionClassName}>Prefer to discuss</option>
                    </select>
                  </Field>
                </div>
                <p className="text-sm text-muted-foreground">
                  For reference, the corporate atrium commission was delivered in 14 weeks,
                  including installation, and the gallery motion series comprised three works.
                  Commercial terms are discussed on a follow-up call once the studio has reviewed the site.
                </p>
                <Field label="Project Goals, Constraints, and Context *" id="description">
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
                <div className="border border-border p-5 bg-card/30">
                  <p className="text-sm font-medium mb-1">What happens next</p>
                  <p className="text-sm text-muted-foreground">
                    1. The studio replies within two business days. 2. Shortlisted projects
                    proceed to a site survey. 3. You receive a written proposal setting out scope
                    and timeline.
                  </p>
                </div>
              </div>
            )}

            {stepError && (
              <p id="step-error" role="alert" aria-live="assertive" className="text-sm text-red-400">
                {stepError}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setStepError('');
                    goToStep(step - 1);
                  }}
                  className="px-8 py-4 border border-border font-medium tracking-wide hover:border-accent hover:text-accent transition-colors min-h-[44px]"
                >
                  Back
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep(step)) goToStep(step + 1);
                  }}
                  className="px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors min-h-[44px]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-accent text-accent-foreground font-medium tracking-wide hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {isSubmitting ? 'Sending…' : 'Send Project Brief'}
                </button>
              )}
              <span className="text-sm text-muted-foreground">
                Step {step + 1} of {STEPS.length}
              </span>
            </div>
            {submitError && (
              <p role="alert" aria-live="assertive" className="text-sm text-red-400">
                {submitError}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-label mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
