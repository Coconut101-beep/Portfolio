import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/shell/AppShell";
import { getProfile } from "@/lib/content";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-loaded",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
});

const profile = getProfile();

export const metadata: Metadata = {
  title: {
    default: `${profile.nickname} — ${profile.name}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.shortBio,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>
        <style>{`:root{--font-display:var(--font-display-loaded), "Times New Roman", serif;--font-sans:var(--font-sans-loaded), system-ui, sans-serif;}`}</style>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
