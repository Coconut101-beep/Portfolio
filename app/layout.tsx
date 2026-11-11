import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { AppShell } from "@/components/shell/AppShell";
import { getProfile } from "@/lib/content";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif-loaded",
  display: "swap",
});

const profile = getProfile();

export const metadata: Metadata = {
  title: {
    default: `${profile.name}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.shortBio,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={serif.variable}>
        <style>{`:root{--font-serif:var(--font-serif-loaded), "Iowan Old Style", "Palatino Linotype", Palatino, serif;}`}</style>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
