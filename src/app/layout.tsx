import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const myFont = localFont({
  src: "../../public/primary-light.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "বেগবতী২৪.কম",
    template: "%s | Begboti24",
  },
  description:
    "Stay updated with the latest news, articles, and insights from বেগবতী২৪.কম. Explore our comprehensive coverage on various topics.",
  openGraph: {
    title: "বেগবতী২৪.কম - Your Source for News",
    description:
      "Stay updated with the latest news, articles, and insights from বেগবতী২৪.কম. Explore our comprehensive coverage on various topics.",
    images: [
      {
        url: "https://i.ibb.co/J2sSKhn/kalerpotro-news.jpg",
        width: 1200,
        height: 630,
        alt: "বেগবতী২৪.কম",
      },
    ],
    url: "https://begboti24.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "বেগবতী২৪.কম - Your Source for News",
    description:
      "Stay updated with the latest news, articles, and insights from বেগবতী২৪.কম. Explore our comprehensive coverage on various topics.",
    images: ["https://i.ibb.co/J2sSKhn/kalerpotro-news.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <Navbar />
        {children}
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
