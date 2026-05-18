import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "GALAXY HOUSE | Капсульные дома будущего",
  description:
    "Революционные капсульные дома премиум-класса. Современный дизайн, быстрая доставка, превосходное качество.",
  keywords: [
    "капсульные дома",
    "модульные дома",
    "prefab дома",
    "современная архитектура",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} bg-background`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
