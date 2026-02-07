import React from "react"
import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";

import "./globals.css";

const _dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});
const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Form & Matter",
  description:
    "A collaboration between architecture and sculpture. Where structure meets expression.",
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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
