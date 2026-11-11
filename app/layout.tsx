import type { Metadata } from "next";
import { AppShell } from "@/components/shell/AppShell";
import { getProfile } from "@/lib/content";
import "./globals.css";

const profile = getProfile();

export const metadata: Metadata = {
  title: {
    default: profile.name,
    template: `%s — ${profile.name}`,
  },
  description: profile.shortBio,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
