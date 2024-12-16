import type { Metadata } from "next";
import "@/styles/globals.css";
import { geistSans, geistMono } from "@/styles/fonts";
import { cookies } from "next/headers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Capo-Lyrics 🤸‍♀️",
  description: "Translate and find capoeira songs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("theme")?.value ?? "light";

  return (
    <html lang='en'>
      <head>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2001340164243542'
          crossOrigin='anonymous'></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${theme}`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
