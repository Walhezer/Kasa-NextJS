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

/**
 * Expected props for the Header component
 */
interface HeaderProps {
    isLoggedIn: boolean;
}

/**
 * Header Component
 * Main navigation component (Client Component).
 * Handles responsive layout (Desktop/Mobile), mobile menu state,
 * and protects routes requiring authentication (add property, favorites, etc.).
 * 
 * @param {boolean} isLoggedIn - Prop passed down from the server layout
 */
export default function Header({ isLoggedIn }: HeaderProps) {
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
            <div className={`${styles.header} ${isLoggedIn ? styles.headerLoggedIn : ""}`}>

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
                        <Link
                            href={isLoggedIn ? "/ajouter" : "/login"}
                            className={styles.addProperty}
                        >
                            +Ajouter un logement
                        </Link>

                        <div className={styles.icons}>
                            <Link href={isLoggedIn ? "/favorites" : "/login"}>
                                <HeartIcon className={styles.icon} />
                            </Link>
                            <span className={styles.divider} />
                            <Link href={isLoggedIn ? "/messages" : "/login"}>
                                <MessageIcon className={styles.icon} />
                            </Link>
                        </div>

                        {isLoggedIn && (
                            <button
                                onClick={async () => await logoutAction()}
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

            {/* --- SIDE MENU PANEL (MOBILE) --- */}
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
                        <Link href={isLoggedIn ? "/messages" : "/login"} className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Messagerie</Link>
                        <Link href={isLoggedIn ? "/favorites" : "/login"} className={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>Favoris</Link>

                        {isLoggedIn && (
                            <button
                                onClick={async () => {
                                    setIsMobileMenuOpen(false);
                                    await logoutAction();
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