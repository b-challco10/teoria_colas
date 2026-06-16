// layout.tsx
import "katex/dist/katex.min.css";
import "./globals.css";
import { Inter } from "next/font/google";

// Importaciones agrupadas abajo de los estilos
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
      {/* SE AÑADIÓ INTER AQUÍ */}
      <body className={inter.className}> 

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
