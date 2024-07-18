import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";

// configure fonts
// sans serif
const _sansFont = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: [
    "300", // light
    "400", // regular
    "700", // bold
  ],
  variable: "--font-lato",
});
// serif font
const _serifFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "zzy Art",
  description: "Zhanyan's Art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
