'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';
import Carousel from '../../components/Carousel/Carousel';

interface GalleryProps {
    pictures: string[];
}

export default function Gallery({ pictures }: GalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    if (!pictures || pictures.length === 0) return null;
    
    const hasMultiplePictures = pictures.length > 1;
    const thumbnails = pictures
        .map((pic, index) => ({ url: pic, originalIndex: index }))
        .filter((item) => item.originalIndex !== currentIndex)
        .slice(0, 4); 

    return (
        <>
            <div className={styles.galleryGrid}>
                <button 
                    type="button"
                    className={styles.mainImage} 
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Ouvrir la galerie en plein écran"
                >
                    <Image
                        src={pictures[currentIndex]}
                        alt={`Vue principale du logement - Image ${currentIndex + 1}`}
                        fill
                        className={styles.image}
                        priority 
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </button>
                
                {hasMultiplePictures && (
                    <div className={styles.smallImagesContainer}>
                        {thumbnails.map((thumb) => (
                            <button
                                type="button"
                                key={thumb.originalIndex}
                                className={styles.smallImageWrapper}
                                onClick={() => setCurrentIndex(thumb.originalIndex)}
                                aria-label={`Voir l'image ${thumb.originalIndex + 1}`}
                            >
                                <Image
                                    src={thumb.url}
                                    alt={`Miniature ${thumb.originalIndex + 1}`}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 25vw, 25vw"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
                <Carousel 
                    pictures={pictures} 
                    initialIndex={currentIndex} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
}