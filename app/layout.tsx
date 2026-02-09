import React from "react"
import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";

import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Abhigyan x Vishal",
  description:
    "A collaboration between architecture and sculpture. Abhigyan x Vishal Gupta.",
};

export const viewport: Viewport = {
  themeColor: "#e8ddd0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
