import type { Metadata } from "next";
import "@/styles/globals.css";
import { geistSans, geistMono } from "@/styles/fonts";
import { cookies } from "next/headers";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${theme}`}>
        {children}
      </body>
    </html>
  );
}
