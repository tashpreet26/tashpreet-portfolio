import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import CaseStudy from "@/components/CaseStudy";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import RevealProvider from "@/components/RevealProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tashpreet Kaur — Designer & Art Director, Bhopal",
    template: "%s — Tashpreet Kaur",
  },
  description:
    "Portfolio of Tashpreet Kaur, a designer and art director based in Bhopal, India. Identity, editorial, motion and digital work made somewhere between chaos and calm.",
  authors: [{ name: "Tashpreet Kaur" }],
  keywords: [
    "Tashpreet Kaur",
    "designer Bhopal",
    "art direction India",
    "brand identity",
    "editorial design",
    "motion design",
  ],
  openGraph: {
    title: "Tashpreet Kaur — Designer & Art Director, Bhopal",
    description:
      "Identity, editorial, motion and digital work made somewhere between chaos and calm.",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e9e3d6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full bg-bone font-sans text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");`,
          }}
        />
        <a
          href="#main"
          className="micro fixed top-3 left-3 z-[400] -translate-y-24 bg-ink px-4 py-2 text-bone transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <Nav />
        <Cursor />
        <RevealProvider />
        {children}
        <Footer />
        <CaseStudy />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
