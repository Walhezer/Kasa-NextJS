import PropertyGrid from "../components/Properties/PropertyGrid";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import { getProperties } from "../services/properties.service";
import Image from "next/image";
import styles from "./page.module.css";

/**
 * Home Page Component (Server-side).
 * Acts as the main landing page for the Kasa application.
 * Fetches all available properties server-side and renders the hero banner,
 * the property grid, and the "How it works" instructional section.
 * 
 * @returns {Promise<JSX.Element>} The fully rendered homepage component.
 */
export default async function Home() {
  const properties = await getProperties();

  return (
    <div className={styles.main}>
      <section className={styles.bannerSection}>
        <div className={styles.bannerText}>
          <h1 className={styles.title}>
            Chez vous, <br className={styles.mobileBreak} /> partout et ailleurs
          </h1>
          <p className={styles.subtitle}>
            Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
          </p>
        </div>
        <div className={styles.bannerImageContainer}>
          <Image
            src="/banner.jpeg"
            alt="Bannière accueil Kasa"
            fill
            sizes="(max-width: 1240px) 100vw, 1240px" 
            className={styles.bannerImage}
            priority
          />
        </div>
      </section>
      <PropertyGrid properties={properties} />
      <HowItWorks />
    </div>
  );
}