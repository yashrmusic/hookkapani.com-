import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ShortlistProvider, ShortlistTray } from "@/components/shortlist";
import { HydrationHandler } from "@/components/hydration-handler";
import { ScrollProgress } from "@/components/scroll-progress";

import { SiteTelemetry } from "@/components/site-telemetry";
import { SCALE_INTERVIEW } from "@/data/founder";
import {
  DEFAULT_OG_IMAGE,
  FOUNDER_ID,
  HOME_DESCRIPTION,
  HOME_TITLE,
  ORGANIZATION_ID,
  SITE_ALTERNATE_NAMES,
  SITE_URL,
  WEBSITE_ID,
  jsonLd,
} from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Viewport config for maximum device compatibility
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover', // iPhone notch / Dynamic Island support
  themeColor: '#0d0d0d',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hookkapani.com'),
  title: {
    default: HOME_TITLE,
    template: "%s | Hookkapaani Studio"
  },
  description: HOME_DESCRIPTION,
  keywords: [
    "kinetic sculpture",
    "industrial art",
    "metal sculpture",
    "Vishal Gupta",
    "contemporary art",
    "installation art",
    "kinetic art",
    "India",
    "Delhi Artist",
    "Mechanical Art"
  ],
  authors: [{ name: "Vishal Gupta", url: "https://hookkapani.com" }],
  creator: "Hookkapaani",
  publisher: "Hookkapaani Studio",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hookkapaani',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    siteName: "Hookkapaani Studio",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
    creator: "@hookkapaani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Hookkapaani Studio",
      alternateName: SITE_ALTERNATE_NAMES,
      url: SITE_URL,
      logo: `${SITE_URL}/images/hookkapani-logo-red.png`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
      description:
        "Kinetic sculpture and art installation studio in New Delhi, India. Designs, engineers, fabricates and installs large-scale sculptures for restaurants, hotels, malls and public spaces.",
      email: "hookkapani.15@gmail.com",
      telephone: "+91-9540026221",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressCountry: "IN",
      },
      areaServed: "India",
      knowsAbout: [
        "Kinetic sculpture",
        "Art installations",
        "Hospitality art installations",
        "Large-scale sculpture fabrication",
      ],
      founder: { "@id": FOUNDER_ID },
      sameAs: ["https://www.instagram.com/hookkapani/"],
      // Independent coverage, also listed on the press kit page.
      subjectOf: {
        "@type": "Article",
        headline: "Hookkapani: The Kinetic World of Vishal Gupta",
        url: "https://scalemag.online/art/in-focus/hookkapani-the-kinetic-world-of-vishal-gupta/",
        datePublished: "2026-04-16",
        author: { "@type": "Person", name: "Aishwarya Kulkarni" },
        publisher: { "@type": "Organization", name: "Scale" },
      },
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Vishal Gupta",
      jobTitle: "Kinetic Sculptor",
      worksFor: { "@id": ORGANIZATION_ID },
      url: `${SITE_URL}/press-kit`,
      // The Scale interview identifies this Vishal Gupta; the bio on /press-kit and /studio cites it.
      sameAs: [SCALE_INTERVIEW.url],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Hookkapaani Studio",
      alternateName: SITE_ALTERNATE_NAMES,
      inLanguage: "en-IN",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased overscroll-none">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-3 focus:bg-accent focus:text-accent-foreground focus:font-medium"
        >
          Skip to content
        </a>
        {/* Fail-safe visibility reveal if JS fails to hydrate */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.__hydration_timeout = setTimeout(function() {
                  document.body.classList.add('js-timeout-reveal');
                  console.warn('Hydration timeout: forced visibility reveal');
                }, 3000);
              })();
            `,
          }}
        />
        <ScrollProgress />

        <ShortlistProvider>
          <Nav />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
          <ShortlistTray />
        </ShortlistProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
        <SiteTelemetry />
        {/* Clear timeout on hydration */}
        <HydrationHandler />
      </body>
    </html>
  );
}
