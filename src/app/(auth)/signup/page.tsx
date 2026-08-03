'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { signupAction } from '../../../actions/auth.actions';
import Button from '../../../components/Button/Button';
import styles from './signup.module.css';

/**
 * SignupPage Component
 * Renders the registration form and handles new user creation.
 */
export default function SignupPage() {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the form submission.
     * Validates inputs, packs data into FormData, and calls the server action.
     * 
     * @param e - The form submission event.
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!lastName || !firstName || !email || !password || !termsAccepted) {
            setError('Veuillez remplir tous les champs et accepter les conditions.');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('lastName', lastName);
            formData.append('firstName', firstName);
            formData.append('email', email);
            formData.append('password', password);

            const result = await signupAction(formData);

            if (result?.error) {
                setError(result.error);
                setIsLoading(false);
            }
        } catch (err: unknown) {
            setError('Une erreur inattendue est survenue.');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <div className={styles.headerGroup}>
                    <h1 className={styles.title}>Rejoignez la communauté Kasa</h1>
                    <p className={styles.subtitle}>
                        Créez votre compte et commencez à voyager autrement : réservez des<br />
                        logements uniques, découvrez de nouvelles destinations et partagez vos<br />
                        propres lieux avec d'autres voyageurs.
                    </p>
                </div>
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
        </div>
    );
}