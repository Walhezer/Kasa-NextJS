import Link from "next/link";
import LogoHouse from "../../components/Icons/LogoHouse";
import styles from "./Footer.module.css";

/**
 * Footer component.
 * Renders the site's footer containing the Kasa house logo and copyright information.
 * 
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                <Link href="/" aria-label="Retour à l'accueil Kasa">
                    <LogoHouse width={46} height={53} />
                </Link>
            </div>

            <p className={styles.copyright}>
                © 2026 Kasa. All rights reserved
            </p>
        </footer>
    );
}