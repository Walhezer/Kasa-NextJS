import Link from "next/link";
import styles from "./not-found.module.css";
import Button from "../components/Button/Button";

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