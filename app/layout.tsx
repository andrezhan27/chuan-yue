import type { Metadata } from "next";
import logoBg from "../public/other-images/logo-bg.png";
import { restaurantName } from "./data/restaurant";
import { siteUrl } from "./data/site";
import "./globals.css";

const title = `${restaurantName} | Cozinha Sichuan em Lisboa`;
const description =
  "Cozinha Sichuan contemporânea no coração de Lisboa. Sabores intensos, técnica precisa e hospitalidade calorosa.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: logoBg.src, shortcut: logoBg.src, apple: logoBg.src },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_PT",
    siteName: restaurantName,
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: `${restaurantName} — O fogo de Sichuan, servido com precisão.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
