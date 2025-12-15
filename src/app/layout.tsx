import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";

const unBounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sparkz.carmelcet.in/"),

  title: {
    default: "Sparkz 2025",
    template: "%s | Sparkz 2025",
  },

  description:
    "Sparkz is a multi-day technical and cultural fest featuring competitions, workshops, hackathons, and exciting events across departments.",

  keywords: [
    "Sparkz",
    "college fest",
    "technical fest",
    "hackathon",
    "coding competition",
    "engineering events",
    "carmel college of engineering and technology",
    "ccet",
    "tech fest India",
  ],

  authors: [{ name: "Sparkz Tech Team" }],
  creator: "Sparkz Tech Team",
  publisher: "Sparkz",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sparkz.carmelcet.in/",
    siteName: "Sparkz 2025",
    title: "Sparkz 2025",
    description:
      "Join Sparkz 2025 — a celebration of innovation, technology, and creativity with exciting events and competitions.",
    images: [
      {
        url: "/og-image.png", // place in /public
        width: 1200,
        height: 630,
        alt: "Sparkz 2025 Fest Poster",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sparkz 2025 | Technical & Cultural Fest",
    description:
      "Join Sparkz 2025 — competitions, hackathons, workshops, and more.",
    images: ["/og-image.png"],
    creator: "@sparkzfest", // optional
  },

  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  category: "technology",

  alternates: {
    canonical: "https://sparkz.carmelcet.in/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${unBounded.variable} antialiased font-light`}>
        {children}
      </body>
    </html>
  );
}
