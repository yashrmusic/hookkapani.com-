import { Cormorant_Garamond } from "next/font/google";
import type { ReactNode } from "react";

// Only the print portfolio uses this display face, so it is scoped here
// instead of loading three font families on every page.
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
  weight: ["300", "400", "700"],
});

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return <div className={cormorantGaramond.variable}>{children}</div>;
}
