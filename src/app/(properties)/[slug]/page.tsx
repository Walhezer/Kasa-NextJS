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

// 1. On modifie le type pour indiquer que params est désormais une Promesse
type PageProps = {
    params: Promise<{ slug: string }>;
};

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

function BackButton() {
    return (
        <Link href="/">
            <Button variant="secondary" icon={<ArrowLeftIcon />}>
                Retour aux annonces
            </Button>
        </Link>
    );
}

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