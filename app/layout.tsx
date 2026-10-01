import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/cursor";
import NavShell from "@/components/nav-shell";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import ArchiveRail from "@/components/archive-rail";
import IntroGate from "@/components/intro-gate";
import { getSettings } from "@/lib/db";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  variable: "--font-fraunces",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInit = `
try {
  var t = localStorage.getItem("archive-theme");
  if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
} catch (e) {}
`;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${settings.siteTitle} — ${settings.tagline}`,
      template: `%s — ${settings.siteTitle}`,
    },
    description:
      "The Archive of Inquiry — the personal archive of Tashpreet Kaur, a young researcher from Bhopal, India. Questions, projects, and experiments at the beginning of a research career.",
    openGraph: {
      title: `${settings.siteTitle} — ${settings.tagline}`,
      description:
        "A beginning shaped by curiosity. Explore the archive of a young researcher.",
      type: "website",
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col">
        <IntroGate>
          <Cursor />
          <PageTransition />
          <ArchiveRail />
          <NavShell />
          <main className="flex-1">{children}</main>
          <Footer />
          <div className="grain-overlay" aria-hidden />
        </IntroGate>
      </body>
    </html>
  );
}
