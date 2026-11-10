import { Metadata } from "next";
import { connection } from "next/server";

import { getThemeForDate } from "@/config/campaigns";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
