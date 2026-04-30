import type { Metadata, Viewport } from "next";
import { Zilla_Slab, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

/* ─── Typography: Trustworthy Slab Serif heading (matches logo) ─── */
const zillaSlab = Zilla_Slab({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/* ─── Typography: Clean body ─── */
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#173042",
};

export const metadata: Metadata = {
  title: {
    default: "Emergency Gate Repair | Same-Day Driveway Gate & Access Control Fix",
    template: "%s | GateRepairDispatch.com",
  },
  description:
    "Emergency driveway gate repair & access control fix. LiftMaster, DoorKing, Viking, and all major brands. Licensed technicians dispatched same-day. Get your free repair quote in 60 seconds.",
  keywords: [
    "driveway gate repair",
    "gate stuck open",
    "gate access control repair",
    "LiftMaster gate repair",
    "DoorKing repair",
    "automatic gate not working",
    "emergency gate technician",
    "HOA gate repair",
    "commercial sliding gate repair",
  ],
  authors: [{ name: "GateRepairDispatch.com" }],
  creator: "GateRepairDispatch.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gaterepairdispatch.com",
    siteName: "GateRepairDispatch.com",
    title: "Emergency Gate Repair | Same-Day Driveway Gate & Access Control Fix",
    description:
      "Emergency driveway gate repair & access control fix. Licensed technicians dispatched same-day.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Gate Repair | Same-Day Driveway Gate & Access Control Fix",
    description:
      "Emergency driveway gate repair & access control fix. Licensed technicians dispatched same-day.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${zillaSlab.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ─── GA4 ─── */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://gaterepairdispatch.com/#organization",
                  name: "GateRepairDispatch.com",
                  url: "https://gaterepairdispatch.com",
                  description:
                    "We connect you with licensed, bonded gate repair technicians for emergency driveway gate and access control repair across the U.S.",
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: "English",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://gaterepairdispatch.com/#website",
                  url: "https://gaterepairdispatch.com",
                  name: "GateRepairDispatch.com",
                  publisher: {
                    "@id": "https://gaterepairdispatch.com/#organization",
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://gaterepairdispatch.com/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
