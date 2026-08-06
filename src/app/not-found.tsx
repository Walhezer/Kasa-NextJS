import Link from "next/link";
import styles from "./not-found.module.css";
import Button from "../components/Button/Button";

/**
 * Custom 404 Not Found Component.
 * Automatically rendered by Next.js when a user attempts to access a route that does not exist.
 * Displays a friendly error message and provides navigation buttons to return to safe paths (Home, Properties).
 * 
 * @returns {JSX.Element} The rendered 404 error page.
 */
export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.errorText}>
                Il semble que la page que vous cherchez ait pris<br /> des vacances… ou n’ait jamais existé.
            </p>
            <div className={styles.buttonsContainer}>
                <Link href="/">
                    <Button>Accueil</Button>
                </Link>
                <Link href="/#logements">
                    <Button>Logements</Button>
                </Link>
            </div>
        </div>
    );
}