'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    isMounted: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {

        const initTimer = setTimeout(() => {
            const storedFavorites = localStorage.getItem('kasa-favorites');
            if (storedFavorites) {
                try {
                    setFavorites(JSON.parse(storedFavorites));
                } catch (error) {
                    console.error('Erreur localStorage', error);
                }
            }
            setIsMounted(true);
        }, 0);

        return () => clearTimeout(initTimer);
    }, []);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavorites) => {
            let newFavorites;
            if (prevFavorites.includes(id)) {
                newFavorites = prevFavorites.filter((favId) => favId !== id);
            } else {
                newFavorites = [...prevFavorites, id];
            }

            localStorage.setItem('kasa-favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (id: string) => favorites.includes(id);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, isMounted }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites doit être utilisé à l\'intérieur d\'un FavoritesProvider');
    }
    return context;
}