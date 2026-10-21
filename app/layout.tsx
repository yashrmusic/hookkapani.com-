import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ShortlistProvider, ShortlistTray } from "@/components/shortlist";
import { HydrationHandler } from "@/components/hydration-handler";
import { ScrollProgress } from "@/components/scroll-progress";

import { SiteTelemetry } from "@/components/site-telemetry";
import { DEFAULT_OG_IMAGE, ORGANIZATION_ID, SITE_URL, WEBSITE_ID, jsonLd } from "@/lib/seo";

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
    default: "Hookkapaani | Kinetic Sculpture Studio",
    template: "%s | Hookkapaani Studio"
  },
  description: "A kinetic sculpture studio exploring industrial materials, mechanical motion, and temporal transformation through honest construction and material research.",
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
    title: "Hookkapaani | Kinetic Sculpture Studio",
    description: "Exploring industrial materials, mechanical motion, and temporal transformation.",
    siteName: "Hookkapaani Studio",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hookkapaani | Kinetic Sculpture Studio",
    description: "Exploring industrial materials, mechanical motion, and temporal transformation.",
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
      alternateName: "Hookkapaani",
      url: SITE_URL,
      logo: `${SITE_URL}/images/hookkapani-logo-red.png`,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE.url}`,
      description:
        "A kinetic sculpture studio in New Delhi working with industrial materials, mechanical motion and site-specific installations.",
      email: "hookkapani.15@gmail.com",
      telephone: "+91-9540026221",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Delhi",
        addressCountry: "IN",
      },
      founder: {
        "@type": "Person",
        name: "Vishal Gupta",
        jobTitle: "Kinetic Sculptor",
      },
      sameAs: ["https://www.instagram.com/hookkapani/"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Hookkapaani Studio",
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
