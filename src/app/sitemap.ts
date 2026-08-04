import { MetadataRoute } from 'next';
import { getProperties } from '@/src/services/properties.service'; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://kasa.fr';

const staticPages: MetadataRoute.Sitemap = [
    {
        url: baseUrl, 
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
    },
    {
        url: `${baseUrl}/about`, 
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${baseUrl}/login`, 
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
    },
    {
        url: `${baseUrl}/signup`, 
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.3,
    },
];
    let propertyPages: MetadataRoute.Sitemap = [];
    
    try {
        const properties = await getProperties();
        
        propertyPages = properties.map((property) => ({
            url: `${baseUrl}/logement/${property.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
    } catch (error) {
        console.error('Impossible de récupérer les logements pour le sitemap:', error);
    }

    return [...staticPages, ...propertyPages];
}