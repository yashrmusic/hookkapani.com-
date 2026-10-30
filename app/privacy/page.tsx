import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description:
    'What Hookkapani Studio collects when you use this site or send a project brief, why it is collected, and how to have it removed.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-headline mb-4">Privacy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: 21 October 2026</p>

        <div className="space-y-10 text-base leading-relaxed text-foreground/85">
          <section>
            <h2 className="text-title mb-3">Who we are</h2>
            <p>
              Hookkapani Studio, New Delhi, India. For any question about this notice or your
              data, write to{' '}
              <a href="mailto:hookkapani.15@gmail.com" className="text-accent hover:text-accent/80 underline underline-offset-4">
                hookkapani.15@gmail.com
              </a>{' '}
              or call{' '}
              <a href="tel:+919540026221" className="text-accent hover:text-accent/80 underline underline-offset-4">
                +91 95400 26221
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-title mb-3">What we collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Project briefs.</strong> The name, email, phone, company, role, site and
                project details you enter in the commission form, plus any links you choose to
                share.
              </li>
              <li>
                <strong>Usage measurement.</strong> The pages you visit, your browser user agent,
                viewport size, a random per-visit session identifier, page-load timing, the referring page and campaign parameters (such as utm_source). This is
                aggregate technical data used to understand which works and pages are useful.
              </li>
              <li>
                <strong>Error reports.</strong> If the site fails in your browser, a technical error
                message, the page address and a stack trace may be sent so the fault can be fixed.
              </li>
              <li>
                <strong>Security data.</strong> Your IP address is used briefly to rate-limit form
                submissions and protect the site from abuse.
              </li>
            </ul>
            <p className="mt-3">
              We do not run advertising trackers and we do not sell personal data.
            </p>
          </section>

          <section>
            <h2 className="text-title mb-3">Why we hold it</h2>
            <p>
              Brief details are used only to respond to your enquiry, prepare a proposal, and keep a
              record of the commission conversation. Usage and error data are used to operate and
              improve the site. Security data is used to prevent spam and abuse.
            </p>
          </section>

          <section>
            <h2 className="text-title mb-3">How long we keep it</h2>
            <p>
              Enquiry records are kept for as long as needed to handle the project and any
              follow-up, then archived or deleted. Technical logs are kept only for the short period
              needed to diagnose problems.
            </p>
          </section>

          <section>
            <h2 className="text-title mb-3">Your choices</h2>
            <p>
              You can ask us to show, correct or delete the information you have sent. Email the
              studio and we will action the request. The shortlist on this site is stored in your
              own browser&apos;s local storage and is never sent to us unless you attach it to a
              brief.
            </p>
          </section>

          <section>
            <h2 className="text-title mb-3">Sharing</h2>
            <p>
              Briefs are delivered to the studio through our email and messaging providers, who
              process them on our behalf. We do not share your details with anyone else except where
              the law requires it.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link href="/commission" className="text-accent hover:text-accent/80">
            Start a project brief →
          </Link>
        </div>
      </div>
    </div>
  );
}
