import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "GALAXY HOUSE | Капсульные дома премиум-класса",
  description:
    "Современные капсульные дома из Китая с доставкой по России. 5+ лет опыта, 200+ домов, гарантия качества.",
  keywords: [
    "капсульные дома",
    "модульные дома",
    "prefab дома",
    "дома из Китая",
    "современная архитектура",
  ],
  openGraph: {
    title: "GALAXY HOUSE | Капсульные дома премиум-класса",
    description: "Современные капсульные дома с доставкой по России",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f5f0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
