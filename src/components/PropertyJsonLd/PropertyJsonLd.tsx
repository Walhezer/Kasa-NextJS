import { Property } from '@/src/types/property'; // Ajuste le chemin selon l'emplacement de ton fichier types

interface PropertyJsonLdProps {
    property: Property;
}

export default function PropertyJsonLd({ property }: PropertyJsonLdProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Accommodation',
        name: property.title,
        description: property.description,
        image: property.pictures && property.pictures.length > 0 ? property.pictures : [property.cover],
        address: {
            '@type': 'PostalAddress',
            addressLocality: property.location,
        },
        offers: property.price_per_night ? {
            '@type': 'Offer',
            price: property.price_per_night,
            priceCurrency: 'EUR', 
            availability: 'https://schema.org/InStock',
        } : undefined,
        aggregateRating: property.rating_avg ? {
            '@type': 'AggregateRating',
            ratingValue: property.rating_avg,
            reviewCount: property.ratings_count || 1, 
            bestRating: '5',
            worstRating: '1',
        } : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}