import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Viral Mind — AI Marketing Team, On Autopilot",
  description:
    "Five AI agents handle research, content, scheduling, analytics and SEO — automatically. One person. The output of a team of ten. Start free, no credit card.",
  keywords: [
    "AI marketing automation",
    "content marketing AI",
    "social media automation",
    "SEO AI agent",
    "email marketing automation",
    "marketing AI platform",
    "Viral Mind",
  ],
  authors: [{ name: "Viral Mind" }],
  creator: "Viral Mind",
  publisher: "Viral Mind",
  metadataBase: new URL("https://viralmind.ai"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viralmind.ai",
    siteName: "Viral Mind",
    title: "Viral Mind — AI Marketing Team, On Autopilot",
    description:
      "Five AI agents handle research, content, scheduling, analytics and SEO — automatically. One marketer. The output of a team of ten.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Viral Mind — AI Marketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Mind — AI Marketing Team, On Autopilot",
    description:
      "Five AI agents. One platform. Your marketing runs itself.",
    images: ["/og-image.png"],
    creator: "@viralmind_ai",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Viral Mind",
              applicationCategory: "BusinessApplication",
              description:
                "AI-powered digital marketing platform with 5 specialized agents for content, social, analytics, email, and SEO automation.",
              offers: [
                { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Starter" },
                { "@type": "Offer", price: "149", priceCurrency: "USD", name: "Growth" },
                { "@type": "Offer", price: "399", priceCurrency: "USD", name: "Agency" },
              ],
              url: "https://viralmind.ai",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
