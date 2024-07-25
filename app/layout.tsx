import type { Metadata, Viewport } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/toaster";

// configure fonts
// sans serif
const sansFont = Lato({
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
const serifFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: [
    "400", // regular
    "700", // bold
  ],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "zzy Art",
  description: "Zhanyan's Art",
};

// viewport metadata
export const viewport: Viewport = {
  themeColor: "white",
  colorScheme: "light",
};

/** Site Page Layout */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body className="font-sans py-8">
        <NavBar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
