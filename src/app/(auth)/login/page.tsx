'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { loginAction } from '../../../actions/auth.actions';
import Button from '../../../components/Button/Button';
import styles from './login.module.css';

/**
 * LoginPage Component
 * Renders the login form and handles user authentication state.
 */
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the form submission.
     * Prevents default behavior, packs data into FormData, and calls the server action.
     * 
     * @param e - The form submission event.
     */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const result = await loginAction(formData);

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
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.headerGroup}>
                    <h1 className={styles.title}>Heureux de vous revoir</h1>
                    <p className={styles.subtitle}>
                        Connectez-vous pour retrouver vos réservations, vos<br />
                        annonces et tout ce qui rend vos séjours uniques.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Conteneur pour les 2 inputs uniquement */}
                    <div className={styles.inputsContainer}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ex: jean.dupont@email.com"
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
                                placeholder="Votre mot de passe"
                                required
                            />
                        </div>
                    </div>

                    {/* Message d'erreur éventuel */}
                    {error && <p className={styles.errorMessage}>{error}</p>}

                    {/* Bouton de validation */}
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                        className={styles.submitBtn}
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </Button>
                </form>

                <div className={styles.links}>
                    <Link href="#" className={styles.link}>
                        Mot de passe oublié
                    </Link>
                    <Link href="/signup" className={styles.link}>
                        Pas encore de compte ? Inscrivez-vous
                    </Link>
                </div>
            </div>
        </div>
    );
}