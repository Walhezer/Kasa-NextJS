import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers"; 
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "./globals.css";
import { FavoritesProvider } from "../context/FavoritesContext";

// Google Inter font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Global metadata definition for SEO
export const metadata: Metadata = {
  title: "Kasa - Location d'appartements et de maisons",
  description: "Trouvez votre prochain logement entre particuliers avec Kasa.",
};

/**
 * RootLayout Component
 * Root component of the application (Server Component).
 * It wraps all pages, handles global authentication state via cookies,
 * and injects context Providers as well as the Header and Footer.
 * 
 * @param {React.ReactNode} children - The child pages and components to render
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("kasa_token");

  return (
    <html lang="fr" className={inter.variable}>
      <body suppressHydrationWarning>
        <FavoritesProvider>
          <Header isLoggedIn={isLoggedIn} />
          
          <main>{children}</main>
          
          <Footer />
        </FavoritesProvider>
        
      </body>
    </html>
  );
}