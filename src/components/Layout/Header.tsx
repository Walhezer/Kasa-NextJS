"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoKasa from "../../components/Icons/LogoKasa";
import LogoHouse from "../../components/Icons/LogoHouse";
import { HeartIcon, MessageIcon, MenuIcon, CloseIcon } from "../../components/Icons";
import Button from "../../components/Button/Button";
import styles from "./Header.module.css";
import { logoutAction } from "../../actions/auth.actions";
import { useFavorites } from "../../context/FavoritesContext";

/**
 * Main navigation Header component (Client Component).
 * Handles responsive layouts (desktop and mobile), mobile menu state management,
 * and user authentication actions (logout, conditional routing for protected areas).
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isLoggedIn - Indicates whether the current user is authenticated.
 * @returns {JSX.Element} The rendered header component.
 */
interface HeaderProps {
    isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps) {
    const pathname = usePathname();
    const { clearFavorites } = useFavorites();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        clearFavorites();
        await logoutAction();
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    return (
        <header className={styles.headerContainer}>
            <div className={`${styles.header} ${isLoggedIn ? styles.headerLoggedIn : ""}`}>

                {/* --- DESKTOP --- */}
                <div className={styles.desktopContent}>
                    <nav className={styles.leftNav}>
                        <Link href="/" className={`${styles.navLink} ${pathname === "/" ? styles.active : ""}`}>Accueil</Link>
                        <Link href="/about" className={`${styles.navLink} ${pathname === "/about" ? styles.active : ""}`}>À propos</Link>
                    </nav>

                    <div className={styles.logoContainer}>
                        <Link href="/" aria-label="Retour à l'accueil Kasa">
                            <LogoKasa className={styles.logo} width={113} height={40} />
                        </Link>
                    </div>

                    <div className={styles.rightNav}>
                        <Link
                            href={isLoggedIn ? "/ajouter" : "/login"}
                            className={styles.addProperty}
                        >
                            +Ajouter un logement
                        </Link>

                        <div className={styles.icons}>
                            <Link href={isLoggedIn ? "/favorites" : "/login"} aria-label="Accéder à vos favoris">
                                <HeartIcon className={styles.icon} />
                            </Link>
                            <span className={styles.divider} />
                            <Link href={isLoggedIn ? "/messages" : "/login"} aria-label="Accéder à votre messagerie">
                                <MessageIcon className={styles.icon} />
                            </Link>
                        </div>

                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className={styles.navLink}
                                style={{ marginLeft: "1rem", cursor: "pointer", background: "none", border: "none", padding: 0 }}
                                title="Se déconnecter"
                            >
                                Déconnexion
                            </button>
                        )}
                    </div>
                </div>

                {/* --- MOBILE --- */}
                <div className={styles.mobileContent}>
                    <Link href="/" className={styles.mobileLogoLink} onClick={() => setIsMobileMenuOpen(false)} aria-label="Retour à l'accueil Kasa">
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

            {/* --- SIDE MENU PANEL (MOBILE) --- */}
            {isMobileMenuOpen && (
                <div className={styles.mobileOverlay}>
                    <div className={styles.mobileMenuHeader}>
                        <Link href="/" className={styles.mobileLogoLink} onClick={() => setIsMobileMenuOpen(false)} aria-label="Retour à l'accueil Kasa">
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
                        <Link href={isLoggedIn ? "/messages" : "/login"} className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Messagerie</Link>
                        <Link href={isLoggedIn ? "/favorites" : "/login"} className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Favoris</Link>

                        {isLoggedIn && (
                            <button
                                onClick={async () => {
                                    setIsMobileMenuOpen(false);
                                    await handleLogout();
                                }}
                                className={styles.mobileLink}
                                style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
                            >
                                Déconnexion
                            </button>
                        )}
                    </nav>

                    <div className={styles.mobileMenuFooter}>
                        <Link href={isLoggedIn ? "/ajouter" : "/login"} onClick={() => setIsMobileMenuOpen(false)}>
                            <Button>Ajouter un logement</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}