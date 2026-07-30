import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "./globals.css";
import { FavoritesProvider } from "../context/FavoritesContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kasa - Location d'appartements et de maisons",
  description: "Trouvez votre prochain logement entre particuliers avec Kasa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body suppressHydrationWarning>
        
        {/* 🎯 2. On englobe tout le contenu du body avec le Provider */}
        <FavoritesProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </FavoritesProvider>
        
      </body>
    </html>
  );
}