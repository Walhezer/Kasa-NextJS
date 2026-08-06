'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import PropertyGrid from '../../../components/Properties/PropertyGrid';
import { useFavorites } from '../../../context/FavoritesContext';
import { getProperties } from '../../../services/properties.service';
import { Property } from '../../../types/property';
import styles from './Favorites.module.css';

/**
 * FavoritesPage Component (Client-side).
 * Displays a grid of properties that the user has marked as favorites.
 * It manages local state for loading indicators, handles hydration safety (isMounted),
 * and fetches the full property details based on the stored favorite IDs.
 * 
 * @returns {JSX.Element | null} The rendered favorites page, or null before the component has mounted on the client.
 */
export default function FavoritesPage() {
  const router = useRouter();
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

    /**
     * Asynchronously fetches all properties and filters them to keep only the favorites.
     * Updates the local state if the component is still mounted.
     */
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
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Vos favoris</h1>
        <p className={styles.subtitle}>
          Retrouvez ici tous les logements que vous avez aimés.<br />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
        </p>
      </header>

      {isLoading ? (
        <p className={styles.emptyText}>Chargement des favoris...</p>
      ) : favorites.length === 0 ? (
        <section className={styles.emptyState}>
          <p className={styles.emptyText}>Vous n&apos;avez pas encore de favoris.</p>
          <Button type="button" onClick={() => router.push('/')}>
            Decouvrir les logements
          </Button>
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
          <Button type="button" onClick={() => router.push('/')}>
            Decouvrir les logements
          </Button>
        </section>
      )}
    </div>
  );
}