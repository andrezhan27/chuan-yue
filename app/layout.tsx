import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;
  const title = "Chuan Yue | Cozinha Sichuan em Lisboa";
  const description = "Cozinha Sichuan contemporânea no coração de Lisboa. Sabores intensos, técnica precisa e hospitalidade calorosa.";
  return {
    title,
    description,
    icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
    openGraph: { title, description, type: "website", locale: "pt_PT", images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: "Chuan Yue — O fogo de Sichuan, servido com precisão." }] },
    twitter: { card: "summary_large_image", title, description, images: [`${baseUrl}/og.png`] },
  };
}

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
