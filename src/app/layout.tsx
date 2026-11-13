import { Metadata } from "next";
import { connection } from "next/server";

import { getThemeForDate } from "@/config/campaigns";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Deals ST",
  description: "Encuentra las mejores ofertas de temporada",
};

export const instant = false;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();

  const theme = getThemeForDate(new Date());

  return (
    <html lang="es" data-theme={theme}>
      <body>
        {children}

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8987912664801123"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
