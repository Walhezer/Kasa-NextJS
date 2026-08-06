'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './HostCard.module.css';
import { Host } from '@/src/types/property';
import Button from '@/src/components/Button/Button';

/**
 * Component displaying the host's profile information and the property's average rating.
 * Includes a call-to-action button to navigate to the messaging interface.
 * 
 * @param {Object} props - The component props.
 * @param {Host} props.host - The host object containing their name and profile picture URL.
 * @param {number} props.rating - The average rating of the property (usually out of 5).
 * @returns {JSX.Element} The rendered host card component.
 */
interface HostCardProps {
    host: Host;
    rating: number;
}

export default function HostCard({ host, rating }: HostCardProps) {
    const router = useRouter();

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Votre hôte</h3>

            <div className={styles.profileInfo}>
                <div className={styles.avatarWrapper}>
                    <Image
                        src={host.picture}
                        alt={`Photo de profil de ${host.name}`}
                        fill
                        sizes="(max-width: 768px) 50px, 100px"
                        className={styles.avatar}
                    />
                </div>
                <span className={styles.name}>{host.name}</span>
                <div className={styles.ratingBadge}>
                    <span className={styles.star}>★</span> {rating}
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <Button onClick={() => router.push('/messages')}>
                    Envoyer un message
                </Button>
            </div>
        </div>
    );
}