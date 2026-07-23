import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import "./globals.css";

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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}