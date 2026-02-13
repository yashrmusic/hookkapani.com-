import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Hookkapaani | Kinetic Sculpture Studio",
  description: "A kinetic sculpture studio exploring industrial materials, mechanical motion, and temporal transformation through honest construction and material research.",
  keywords: [
    "kinetic sculpture",
    "industrial art",
    "metal sculpture",
    "Vishal Gupta",
    "contemporary art",
    "installation art",
    "kinetic art",
    "India"
  ],
  authors: [{ name: "Vishal Gupta" }],
  creator: "Hookkapaani",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hookkapaani.com",
    title: "Hookkapaani | Kinetic Sculpture Studio",
    description: "Exploring industrial materials, mechanical motion, and temporal transformation.",
    siteName: "Hookkapaani",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hookkapaani | Kinetic Sculpture Studio",
    description: "Exploring industrial materials, mechanical motion, and temporal transformation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
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
        {/* Clear timeout on hydration */}
        <HydrationHandler />
      </body>
    </html>
  );
}
