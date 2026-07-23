"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Property } from '../../types/property';
import styles from './PropertyCard.module.css';
import Button from '../../components/Button/Button';
import { HeartIcon } from '../../components/Icons/index';


interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Favori ajouté/retiré pour : ${property.title}`);
  };

  return (
    <article className={styles.card}>
      <Link href={`/housing/${property.id}`} className={styles.link}>

        <div className={styles.imageContainer}>
          <Image
            src={property.cover}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            priority={false}
          />
          <div className={styles.favoriteWrapper}>
            <Button onClick={handleFavoriteClick} aria-label="Ajouter aux favoris">
              <HeartIcon />
            </Button>
          </div>
        </div>

        <div className={styles.content}>
          <div>
            <h2 className={styles.title}>{property.title}</h2>
            <p className={styles.location}>{property.location}</p>
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{property.price_per_night}€</span>
            <span className={styles.perNight}> par nuit</span>
          </div>
        </div>

      </Link>
    </article>
  );
}