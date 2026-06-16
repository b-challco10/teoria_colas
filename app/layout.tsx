// layout.tsx

import "katex/dist/katex.min.css";
import "./globals.css";

import Script from "next/script";
import { Inter } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
  <head>
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3770775034295435"
      crossOrigin="anonymous"
    />
  </head>

  <body className={inter.className}>
    <Navbar />

    <main>{children}</main>

    <Footer />
  </body>
</html>
  );
}