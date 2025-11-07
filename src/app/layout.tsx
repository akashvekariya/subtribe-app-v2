import type { Metadata } from "next";
import {
  Instrument_Sans,
  IBM_Plex_Mono,
  Instrument_Serif,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Find Your Next Opportunity | Subtribe",
  description:
    "Browse open positions and apply to exciting job opportunities. Discover your next career move with Subtribe.",
  keywords: ["jobs", "careers", "opportunities", "employment", "job search"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </head>
      <body
        className={`${instrumentSans.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
