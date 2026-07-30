'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import styles from './signup.module.css';

export default function SignupPage() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation front
    if (!lastName || !firstName || !email || !password || !termsAccepted) {
      setError('Veuillez remplir tous les champs et accepter les conditions.');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Connexion à l'API d'inscription Express.js
      // Simulation en attendant la vraie API
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    } catch (err: unknown) {
      setError('Une erreur est survenue lors de l\'inscription.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.signupContainer}>
      <div className={styles.signupCard}>
        
        {/* Groupe En-tête */}
        <div className={styles.headerGroup}>
          <h1 className={styles.title}>Rejoignez la communauté Kasa</h1>
          <p className={styles.subtitle}>
            Créez votre compte et commencez à voyager autrement : réservez des<br />
            logements uniques, découvrez de nouvelles destinations et partagez vos<br />
            propres lieux avec d'autres voyageurs.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputsContainer}>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Adresse email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Checkbox Conditions Générales */}
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <label htmlFor="terms">
                J'accepte les <span className={styles.underline}>conditions générales d'utilisation</span>
              </label>
            </div>
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className={styles.submitBtn}
          >
            {isLoading ? "Inscription..." : "S'inscrire"}
          </Button>

          <div className={styles.links}>
            <Link href="/login" className={styles.link}>
              Déjà membre ? Se connecter
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}