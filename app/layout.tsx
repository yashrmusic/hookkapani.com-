import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { HydrationHandler } from "@/components/hydration-handler";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { AmbientSound } from "@/components/ambient-sound";

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

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
  metadataBase: new URL('https://hookkapaani.com'),
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
  authors: [{ name: "Vishal Gupta", url: "https://hookkapaani.com" }],
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
    url: "https://hookkapaani.com",
    title: "Hookkapaani | Kinetic Sculpture Studio",
    description: "Exploring industrial materials, mechanical motion, and temporal transformation.",
    siteName: "Hookkapaani",
    images: [
      {
        url: "/images/new-work-45.png",
        width: 1200,
        height: 800,
        alt: "Luminous Leviathan - Kinetic Sculpture by Hookkapaani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hookkapaani | Kinetic Sculpture Studio",
    description: "Exploring industrial materials, mechanical motion, and temporal transformation.",
    images: ["/images/new-work-45.png"],
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
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable}`}>
      <body className="antialiased overscroll-none">
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
        <CustomCursor />
        <AmbientSound />
        <Nav />
        <main>{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ArtGallery",
              "name": "Hookkapaani Studio",
              "image": "https://hookkapaani.com/images/new-work-45.png",
              "url": "https://hookkapaani.com",
              "telephone": "+91 98765 43210",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "New Delhi",
                "addressCountry": "IN"
              },
              "founder": {
                "@type": "Person",
                "name": "Vishal Gupta",
                "jobTitle": "Kinetic Sculptor"
              },
              "sameAs": [
                "https://instagram.com/hookkapaani"
              ]
            })
          }}
        />
        {/* Clear timeout on hydration */}
        <HydrationHandler />
      </body>
    </html>
  );
}
