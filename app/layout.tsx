import type { Metadata } from "next";
import Script from "next/script";
import AttributionBootstrap from "@/app/components/AttributionBootstrap";
import CookieConsent from "@/app/components/CookieConsent";
import {
  defaultDescription,
  defaultTitle,
  siteName,
  siteUrl,
} from "@/app/lib/seo";
import "./globals.css";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-M2P4W8DV";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s",
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
      <head>
        <Script
          id="google-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              var ukhairConsent = '';
              try {
                ukhairConsent = window.localStorage.getItem('ukhair_cookie_consent') || '';
              } catch (error) {}
              var ukhairConsentValue = ukhairConsent === 'accepted' ? 'granted' : 'denied';
              gtag('consent', 'default', {
                ad_storage: ukhairConsentValue,
                ad_user_data: ukhairConsentValue,
                ad_personalization: ukhairConsentValue,
                analytics_storage: ukhairConsentValue,
                functionality_storage: 'granted',
                security_storage: 'granted',
                wait_for_update: 500
              });
            `,
          }}
        />
        {gtmId ? (
          <Script
            id="google-tag-manager"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />
        ) : null}
      </head>
      <body className="antialiased">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <AttributionBootstrap />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
