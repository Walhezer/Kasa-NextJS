'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import styles from './login.module.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Connexion à l'API Express.js
            // const res = await fetch('http://localhost:3000/api/auth/login', { ... });

            // Simulation pour tester l'affichage des erreurs
            if (email !== 'client@kasa.fr' || password !== 'password123') {
                throw new Error('Identifiants invalides. Veuillez réessayer.');
            }

            alert('Connexion réussie !');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Une erreur est survenue lors de la connexion.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className={styles.loginContainer}>
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
        </main>
    );
}