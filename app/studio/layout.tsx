import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/studio",
  },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
