import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

// La maquette Kasa utilise généralement Montserrat (ou la police par défaut de ton choix)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
    <html lang="fr" className={montserrat.variable}>
      <body>
        {/* <Header /> later */}
        <main>{children}</main>
        {/* <Footer /> later */}
      </body>
    </html>
  );
}