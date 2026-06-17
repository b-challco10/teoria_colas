// layout.tsx

import "katex/dist/katex.min.css";
import "./globals.css";

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
        <meta
          name="google-site-verification"
          content="YmrQAKOvi-3ozcZlRuQIfwx2UoXNIF7-XMdhO48NWS8"
        />

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