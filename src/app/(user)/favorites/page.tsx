'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PropertyGrid from '../../../components/Properties/PropertyGrid';
import { useFavorites } from '../../../context/FavoritesContext';
import { getProperties } from '../../../services/properties.service';
import { Property } from '../../../types/property';
import styles from './Favorites.module.css';

export default function FavoritesPage() {
  const { favorites, isMounted } = useFavorites();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    if (favorites.length === 0) {
      setFavoriteProperties([]);
      setIsLoading(false);
      return;
    }

    let isCurrent = true;

    async function loadFavoriteProperties() {
      setIsLoading(true);
      const properties = await getProperties();

      if (isCurrent) {
        setFavoriteProperties(
          properties.filter((property) => favorites.includes(String(property.id))),
        );
        setIsLoading(false);
      }
    }

    loadFavoriteProperties();

    return () => {
      isCurrent = false;
    };
  }, [favorites, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <main className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Mes favoris</h1>
        <p className={styles.subtitle}>
          Retrouvez ici les logements que vous avez enregistres.
        </p>
      </header>

      {isLoading ? (
        <p className={styles.emptyText}>Chargement des favoris...</p>
      ) : favorites.length === 0 ? (
        <section className={styles.emptyState}>
          <p className={styles.emptyText}>Vous n&apos;avez pas encore de favoris.</p>
          <Link href="/" className={styles.homeLink}>
            Decouvrir les logements
          </Link>
        </section>
      ) : favoriteProperties.length > 0 ? (
        <div className={styles.gridWrapper}>
          <PropertyGrid properties={favoriteProperties} />
        </div>
      ) : (
        <section className={styles.emptyState}>
          <p className={styles.emptyText}>
            Les logements enregistrés ne sont plus disponibles.
          </p>
          <Link href="/" className={styles.homeLink}>
            Decouvrir les logements
          </Link>
        </section>
      )}
    </main>
  );
}
