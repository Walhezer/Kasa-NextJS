import { Property } from "../types/property";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Retrieves a list of all properties
 */
export async function getProperties(): Promise<Property[]> {
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
 * Retrieves the details of a property by its ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
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