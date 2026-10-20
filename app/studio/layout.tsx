import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Studio Process",
  description:
    "Process films from the Hookkapaani studio in New Delhi — the material logic, mechanical tension and honest construction behind its kinetic sculptures.",
  path: "/studio",
});

export default function StudioLayout({ children }: { children: ReactNode }) {
  return children;
}
