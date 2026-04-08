import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import {
  defaultDescription,
  defaultTitle,
  siteName,
  siteUrl,
} from "@/app/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

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
    "hair restoration clinic",
    "male hair transplant",
    "female hair transplant",
    "eyebrow transplant",
    "beard transplant",
    "hair loss treatments",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
