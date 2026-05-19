import type { Metadata } from "next";
import AttributionBootstrap from "@/app/components/AttributionBootstrap";
import CookieConsent from "@/app/components/CookieConsent";
import {
  defaultDescription,
  defaultTitle,
  siteName,
  siteUrl,
} from "@/app/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  category: "health",
  keywords: [
    "hair transplant london",
    "hair transplant cost london",
    "male hair transplant london",
    "female hair transplant london",
    "uk vs turkey hair transplant",
    "hair transplant recovery timeline",
    "eyebrow transplant",
    "beard transplant",
    "hair loss treatments",
  ],
};

export const viewport = {
  themeColor: "#083A4F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AttributionBootstrap />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
