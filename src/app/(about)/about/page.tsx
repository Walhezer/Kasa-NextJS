import Image from "next/image";
import styles from "./about.module.css";

/**
 * About Page Component.
 * Renders the "À propos" (About) page for the Kasa application.
 * Displays the company's mission statement, core values, and static illustrative images.
 * 
 * @returns {JSX.Element} The rendered About page.
 */
export default function About() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>À propos</h1>
            
            <div className={styles.introContainer}>
                <p className={styles.introText}>
                    Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.
                </p>
                <p className={styles.introText}>
                    Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes passionnés qui aiment partager leur région et leurs bonnes adresses.
                </p>
            </div>
            <Image
                src="/about-top.jpg" 
                alt="Paysage de la maison Kasa en forêt"
                width={1115}
                height={458}
                className={styles.topImage}
            />
            <section className={styles.missionSection}>
                <div className={styles.missionContent}>
                    <h2 className={styles.missionTitle}>
                        Notre mission est simple :
                    </h2>
                    
                    <ol className={styles.missionList}>
                        <li>Offrir une plateforme fiable et simple d'utilisation</li>
                        <li>Proposer des hébergements variés et de qualité</li>
                        <li>Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
                    </ol>

                    <p className={styles.missionConclusion}>
                        Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que chaque séjour devienne un souvenir inoubliable.
                    </p>
                </div>
                <Image
                    src="/about-bottom.jpg" 
                    alt="Maison Kasa illuminée de nuit"
                    width={494}
                    height={458}
                    className={styles.bottomImage}
                />
                
            </section>
        </div>
    );
}