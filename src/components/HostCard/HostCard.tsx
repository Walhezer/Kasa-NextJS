'use client'; 

import Image from 'next/image';
import { useRouter } from 'next/navigation'; 
import styles from './HostCard.module.css';
import { Host } from '@/src/types/property'; 
import Button from '@/src/components/Button/Button';

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