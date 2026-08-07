import { Property } from "../types/property";
import propertiesData from "../data/properties.json";

const API_BASE_URL =
    typeof window === "undefined"
        ? process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
        : "/backend-api";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

/**
 * Retrieves a list of all properties.
 * @returns {Promise<Property[]>} A promise that resolves to an array of all properties. Returns an empty array on error.
 */
export async function getProperties(): Promise<Property[]> {
    if (USE_MOCKS) {
        return Promise.resolve(propertiesData as Property[]);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/properties`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des propriétés :", error);
        return [];
    }
}

/**
 * Retrieves the details of a property by its ID.
 * @param {string} id - The ID of the property to retrieve.
 * @returns {Promise<Property | null>} A promise that resolves to the property object, or null if not found or on error.
 */
export async function getPropertyById(id: string): Promise<Property | null> {
    if (USE_MOCKS) {
        const property = (propertiesData as Property[]).find((p) => String(p.id) === String(id));
        return Promise.resolve(property || null);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Erreur lors de la récupération de la propriété ${id} :`, error);
        return null;
    }
}

/**
 * Retrieves the details of a property by its slug.
 * This is a client-side convenience function that first fetches all properties to find the one with the matching slug.
 * @param {string} slug - The slug of the property to retrieve.
 * @returns {Promise<Property | null>} A promise that resolves to the property object, or null if not found or on error.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
    if (USE_MOCKS) {
        const property = (propertiesData as Property[]).find((p) => p.slug === slug);
        return Promise.resolve(property || null);
    }

    try {
        const allProperties = await getProperties();
        const targetProperty = allProperties.find((p) => p.slug === slug);
        if (!targetProperty) {
            return null;
        }
        return await getPropertyById(targetProperty.id);
    } catch (error) {
        console.error(`Erreur lors de la récupération de la propriété avec le slug ${slug} :`, error);
        return null;
    }
}