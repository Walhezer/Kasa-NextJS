import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import Gallery from '@/src/components/Gallery/Gallery';
import HostCard from '@/src/components/HostCard/HostCard';
import DescriptionCard from '@/src/components/DescriptionCard/DescriptionCard';
import Button from '@/src/components/Button/Button';
import { getPropertyBySlug } from '@/src/services/properties.service';
import PropertyJsonLd from '@/src/components/PropertyJsonLd/PropertyJsonLd';
import { ArrowLeftIcon } from '@/src/components/Icons';
import styles from './PropertyDetails.module.css';

/**
 * Defines the properties expected by the PropertyDetails page.
 * 
 * @typedef {Object} PageProps
 * @property {Promise<{ slug: string }>} params - The dynamic route parameters containing the property slug.
 */
type PageProps = {
    params: Promise<{ slug: string }>;
};

/**
 * Generates SEO metadata dynamically for the property details page.
 * Fetches the property data based on the slug and populates title, description, and OpenGraph tags.
 * 
 * @param {PageProps} props - The page properties containing the route parameters.
 * @param {ResolvingMetadata} parent - The resolved parent metadata to inherit or extend.
 * @returns {Promise<Metadata>} The Next.js metadata object for the page.
 */
export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const resolvedParams = await params;
    const property = await getPropertyBySlug(resolvedParams.slug);

    if (!property) {
        return {
            title: 'Logement non trouvé',
            description: "Ce logement n'existe pas ou n'est plus disponible.",
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${property.title} - Kasa`,
        description: property.description,
        alternates: {
            canonical: `/logement/${property.slug}`,
        },
        openGraph: {
            images: [property.cover, ...previousImages],
        },
    };
}

/**
 * Renders a navigation button to return to the main homepage.
 * 
 * @returns {JSX.Element} The back button component linked to "/".
 */
function BackButton() {
    return (
        <Link href="/">
            <Button variant="secondary" icon={<ArrowLeftIcon />}>
                Retour aux annonces
            </Button>
        </Link>
    );
}

/**
 * Main page component for displaying the details of a specific property.
 * This is an async Server Component that fetches data server-side before rendering.
 * If the property is not found, it triggers Next.js's notFound() function to render the 404 page.
 * 
 * @param {PageProps} props - The properties passed to the page, including route params.
 * @returns {Promise<JSX.Element>} The fully rendered property details page.
 */
export default async function PropertyDetails({ params }: PageProps) {
    const resolvedParams = await params;
    const property = await getPropertyBySlug(resolvedParams.slug);

    if (!property) {
        notFound();
    }

    return (
        <div className={styles.mainContainer}>
            <PropertyJsonLd property={property} />
            <BackButton />

            <div className={styles.contentLayout}>
                <div className={styles.leftColumn}>
                    <Gallery pictures={property.pictures ?? []} />
                    <DescriptionCard
                        title={property.title}
                        location={property.location}
                        description={property.description}
                        equipments={property.equipments ?? []}
                        tags={property.tags ?? []}
                    />
                </div>
                <div className={styles.rightColumn}>
                    <HostCard host={property.host} rating={property.rating_avg} />
                </div>
            </div>
        </div>
    );
}