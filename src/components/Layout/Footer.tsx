import Link from "next/link";
import LogoHouse from "../../components/Icons/LogoHouse";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.logoContainer}>
                <Link href="/">
                    <LogoHouse width={46} height={53} />
                </Link>
            </div>

            <p className={styles.copyright}>
                © 2026 Kasa. All rights reserved
            </p>
        </footer>
    );
}
