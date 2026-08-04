'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';
import { CloseIcon, ArrowLeftIcon } from '../../components/Icons/index';

interface CarouselProps {
    pictures: string[];
    initialIndex: number;
    onClose: () => void;
}

export default function Carousel({ pictures, initialIndex, onClose }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const totalPictures = pictures.length;
    const showControls = totalPictures > 1;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setCurrentIndex((prev) => (prev === totalPictures - 1 ? 0 : prev + 1));
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? totalPictures - 1 : prev - 1));
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.carouselContainer} onClick={(e) => e.stopPropagation()}>
                
                {/* Close Button */}
                <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer la galerie">
                    <CloseIcon />
                </button>

                {/* Left Arrow */}
                {showControls && (
                    <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev} aria-label="Image précédente">
                        <ArrowLeftIcon />
                    </button>
                )}

                {/* Current Image */}
                <div className={styles.imageWrapper}>
                    <Image
                        src={pictures[currentIndex]}
                        alt={`Photo ${currentIndex + 1} sur ${totalPictures}`}
                        fill
                        className={styles.image}
                    />
                </div>

                {/* Right Arrow */}
                {showControls && (
                    <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext} aria-label="Image suivante">
                        <ArrowLeftIcon className={styles.flippedIcon} />
                    </button>
                )}

                {/* Counter */}
                {showControls && (
                    <div className={styles.counter}>
                        {currentIndex + 1} / {totalPictures}
                    </div>
                )}
            </div>
        </div>
    );
}