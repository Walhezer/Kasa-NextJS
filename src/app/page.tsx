import PropertyGrid from "../components/Properties/PropertyGrid";
import { getProperties } from "../services/properties.service";
import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className={styles.main}>
      <section className={styles.bannerSection}>
        <div className={styles.bannerText}>
          <h1 className={styles.title}>Chez vous, partout et ailleurs</h1>
          <p className={styles.subtitle}>
            Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.
          </p>
        </div>
        <div className={styles.bannerImageContainer}>
          <Image
            src="/banner.jpeg"
            alt="Bannière accueil Kasa"
            fill
            className={styles.bannerImage}
            priority
          />
        </div>
      </section>
      <PropertyGrid properties={properties} />
    </main>
  );
}