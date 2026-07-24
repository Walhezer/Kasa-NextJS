import { notFound } from 'next/navigation';
import Link from 'next/link';
import Gallery from '@/src/components/Gallery/Gallery';
import HostCard from '@/src/components/HostCard/HostCard';
import DescriptionCard from '@/src/components/DescriptionCard/DescriptionCard';
import Button from '@/src/components/Button/Button'; 
import { getPropertyBySlug } from '@/src/services/properties.service';
import { ArrowLeftIcon } from '@/src/components/Icons';
import styles from './PropertyDetails.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
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
        <main className={styles.mainContainer}>
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
        </main>
    );
}