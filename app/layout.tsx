import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anastasia-zavadska.com"),
  title: {
    default: "Анастасія Завадська - психологиня, гештальт-терапія онлайн",
    template: "%s | Анастасія Завадська",
  },
  description:
    "Психологиня Анастасія Завадська. Індивідуальна та групова терапія онлайн у гештальт-підході. Підтримка при тривозі, виснаженні, складнощах у стосунках та пошуку внутрішньої опори.",
  keywords: [
    "психолог онлайн",
    "гештальт терапія",
    "психологиня",
    "індивідуальна терапія",
    "групова терапія",
    "психотерапія онлайн",
    "тривога",
    "вигорання",
    "ПТСР",
    "ОКР",
    "Анастасія Завадська",
  ],
  authors: [{ name: "Анастасія Завадська" }],
  creator: "Анастасія Завадська",
  publisher: "Анастасія Завадська",
  category: "psychology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "Анастасія Завадська - психологиня",
    title: "Анастасія Завадська - психологиня, гештальт-терапія онлайн",
    description:
      "Індивідуальна та групова терапія онлайн у гештальт-підході. Делікатний супровід у вашому темпі.",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Анастасія Завадська - психологиня",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Анастасія Завадська - психологиня, гештальт-терапія онлайн",
    description:
      "Індивідуальна та групова терапія онлайн у гештальт-підході. Підтримка при тривозі та виснаженні.",
    images: ["/hero.jpg"],
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
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
