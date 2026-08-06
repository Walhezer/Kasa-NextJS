'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Defines the shape of the Favorites Context state and its available methods.
 * 
 * @interface FavoritesContextType
 * @property {string[]} favorites - Array of property IDs currently marked as favorites.
 * @property {(id: string) => void} toggleFavorite - Adds or removes a property ID from the favorites list.
 * @property {(id: string) => boolean} isFavorite - Checks if a specific property ID is in the favorites list.
 * @property {() => void} clearFavorites - Removes all favorites from the state and localStorage.
 * @property {boolean} isMounted - Indicates if the component has mounted on the client (prevents hydration mismatch errors).
 */
interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    clearFavorites: () => void;
    isMounted: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Provider component that supplies the Favorites context to its children.
 * Handles the initialization and persistence of favorites using the browser's localStorage.
 * 
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components that will consume this context.
 * @returns {JSX.Element} The Favorites context provider.
 */
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

    const clearFavorites = () => {
        localStorage.removeItem('kasa-favorites');
        setFavorites([]);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites, isMounted }}>
            {children}
        </FavoritesContext.Provider>
    );
}

/**
 * Custom hook to consume the Favorites context.
 * 
 * @returns {FavoritesContextType} The current state and methods of the favorites context.
 * @throws {Error} If the hook is called outside of a FavoritesProvider tree.
 */
export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites doit être utilisé à l\'intérieur d\'un FavoritesProvider');
    }
    return context;
}