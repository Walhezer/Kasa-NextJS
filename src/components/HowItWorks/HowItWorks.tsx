import styles from "./HowItWorks.module.css";

/**
 * HowItWorks component.
 * Renders an informational section explaining the three simple steps to use the Kasa platform.
 * 
 * @returns {JSX.Element} The rendered informational section component.
 */
export default function HowItWorks() {
  const steps = [
    {
      title: "Recherchez",
      description: "Entrez votre destination, vos dates et laissez Kasa faire le reste",
    },
    {
      title: "Réservez",
      description: "Profitez d'une plateforme sécurisée et de profils d'hôtes vérifiés.",
    },
    {
      title: "Vivez l'expérience",
      description: "Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.",
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.headerContent}>
        <h2 className={styles.title}>Comment ça marche ?</h2>
        <p className={styles.subtitle}>
          Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}