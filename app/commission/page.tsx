import type { Metadata } from 'next';
import { CommissionForm } from '@/components/commission-form';
import { WhatsAppButton } from '@/components/whatsapp-button';

export const metadata: Metadata = {
  title: 'Commission a Work | Hookkapaani Studio',
  description:
    'Submit a project brief for a kinetic sculpture commission — site, scope, budget and timeline in three short steps. The studio replies within 2 business days.',
  alternates: {
    canonical: '/commission',
  },
  openGraph: {
    title: 'Commission a Work - Hookkapaani Studio',
    description:
      'Submit a project brief for a kinetic sculpture commission. The studio replies within 2 business days.',
    url: 'https://hookkapani.com/commission',
    siteName: 'Hookkapaani Studio',
    type: 'website',
  },
};

export default function CommissionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-headline mb-6">Commission a work</h1>
          <p className="text-body text-muted-foreground max-w-3xl mx-auto">
            Three short steps: about you, the site, and scope &amp; budget. Works you shortlisted
            anywhere on this site travel with the brief automatically.
          </p>
        </div>

        <CommissionForm hideHeader />

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">Prefer to talk first?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-xl mx-auto">
            <WhatsAppButton className="flex-1" />
            <a
              href="tel:+919540026221"
              className="flex-1 flex items-center justify-center text-center py-3 px-6 border border-border text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors min-h-[44px]"
            >
              Call +91 95400 26221
            </a>
            <a
              href="mailto:hookkapani.15@gmail.com"
              className="flex-1 flex items-center justify-center text-center py-3 px-6 border border-border text-sm font-medium tracking-wide hover:border-accent hover:text-accent transition-colors min-h-[44px]"
            >
              Email the studio
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Studio visits in New Delhi are by appointment, Monday–Saturday, 10 AM–7 PM IST.
          </p>
        </div>
      </div>
    </main>
  );
}
