"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoKasa from "../../components/Icons/LogoKasa";
import LogoHouse from "../../components/Icons/LogoHouse";
import { HeartIcon, MessageIcon, MenuIcon, CloseIcon } from "../../components/Icons"; 
import Button from "../../components/Button/Button";
import styles from "./Header.module.css";

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.header}>

                {/* --- DESKTOP --- */}
                <div className={styles.desktopContent}>
                    <nav className={styles.leftNav}>
                        <Link href="/" className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}>Accueil</Link>
                        <Link href="/about" className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}>À propos</Link>
                    </nav>
                    <div className={styles.logoContainer}>
                        <Link href="/"><LogoKasa className={styles.logo} width={113} height={40} /></Link>
                    </div>
                    <div className={styles.rightNav}>
                        <Link href="#" className={styles.addProperty}>+Ajouter un logement</Link>
                        <div className={styles.icons}>
                            <HeartIcon className={styles.icon} />
                            <span className={styles.divider} />
                            <MessageIcon className={styles.icon} />
                        </div>
                    </div>
                </div>

                {/* --- MOBILE --- */}
                <div className={styles.mobileContent}>
                    <Link href="/" className={styles.mobileLogoLink} onClick={() => setIsMobileMenuOpen(false)}>
                        <LogoHouse width={46} height={53} />
                    </Link>
                    <button
                        className={styles.iconButton}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Ouvrir le menu"
                    >
                        <MenuIcon />
                    </button>
                </div>

            </div>

            {/* --- SIDE MENU PANEL --- */}
            {isMobileMenuOpen && (
                <div className={styles.mobileOverlay}>

                    <div className={styles.mobileMenuHeader}>
                        <Link href="/" className={styles.mobileLogoLink} onClick={() => setIsMobileMenuOpen(false)}>
                            <LogoHouse width={46} height={53} />
                        </Link>
                        <button
                            className={styles.iconButton}
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Fermer le menu"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    <nav className={styles.mobileNavLinks}>
                        <Link href="/" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Accueil</Link>
                        <Link href="/about" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>À propos</Link>
                        <Link href="/messages" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Messagerie</Link>
                        <Link href="/favorites" className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Favoris</Link>
                    </nav>

                    <div className={styles.mobileMenuFooter}>
                        <Button>Ajouter un logement</Button>
                    </div>

                </div>
            )}
        </header>
    );
}