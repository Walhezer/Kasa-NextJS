# Kasa - Plateforme de location d'appartements entre particuliers

## Description du projet

Kasa est une application web moderne de location d'appartements. Ce projet consiste en la refonte totale du front-end de l'application pour la faire passer sur une stack technique récente et robuste. L'objectif est de proposer une expérience utilisateur fluide, accessible et performante, tout en respectant scrupuleusement les maquettes de conception.

L'application a été conçue pour fonctionner de deux manières différentes, selon vos besoins : en **mode autonome** (via un mock complet des données) ou **reliée à son véritable backend**.

Les fonctionnalités principales incluent :

- La navigation dynamique entre les différents logements.
- Une galerie photo (carrousel) navigable, entièrement testée et optimisée.
- La gestion d'une liste de favoris persistante (via `localStorage` et Context API).
- Un système d'authentification et de protection des routes privées (Middleware).
- Une interface 100% responsive (ordinateur, tablette, mobile).
- Un haut niveau d'accessibilité (normes WCAG) et d'optimisation des performances SEO.

## Technologies utilisées

| Catégorie | Outil / Techno |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (React) |
| Langage | TypeScript |
| Stylisation | CSS Modules |
| Tests | Jest & React Testing Library (couverture sur les composants UI et les favoris) |
| Documentation | JSDoc |

## Pré-requis pour l'installation

Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre poste :

- [Node.js](https://nodejs.org/) (version 18.x ou supérieure recommandée)
- Le gestionnaire de paquets [npm](https://www.npmjs.com/) (inclus avec Node.js)
- Git pour cloner le dépôt

## Installation du front-end

Clonez ce dépôt sur votre machine locale :

```bash
git clone https://github.com/Walhezer/Kasa-NextJS.git
```

Naviguez dans le dossier du projet :

```bash
cd Kasa-NextJS
```

Installez toutes les dépendances nécessaires :

```bash
npm install
```

### Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet et insérez-y le contenu suivant :

```env
# Interrupteur pour basculer entre le mode autonome (true) et le vrai backend (false)
NEXT_PUBLIC_USE_MOCKS=true

# URLs de l'API (utilisées uniquement si NEXT_PUBLIC_USE_MOCKS=false)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
AUTH_API_URL=http://localhost:3000
BACKEND_API_URL=http://localhost:3000/api
```

## Lancement de l'application

Deux modes de fonctionnement sont disponibles selon vos besoins.

### Option A : Mode autonome / Mock (recommandé pour l'évaluation)

Grâce au paramètre `NEXT_PUBLIC_USE_MOCKS=true`, le front-end est totalement indépendant et aucune installation supplémentaire n'est requise.

Lancez simplement le serveur de développement :

```bash
npm run dev
```

L'application est accessible sur [http://localhost:3001](http://localhost:3001) (ou le port indiqué par votre terminal). L'authentification accepte n'importe quels identifiants de démonstration.

### Option B : Lancement avec le backend réel

Si vous souhaitez tester la communication réseau réelle, passez `NEXT_PUBLIC_USE_MOCKS=false` dans votre `.env.local`, puis :

1. Récupérez et ouvrez le dossier du backend fourni.
2. Installez les dépendances :

```bash
npm install
```

3. Lancez le serveur backend (sur le port 3000) :

```bash
npm start
```

4. Démarrez ensuite le projet front-end :

```bash
npm run dev
```

## Exécution des tests unitaires

L'application intègre une suite de tests unitaires pour assurer la fiabilité de la logique métier et des composants interactifs (carrousel, système de favoris).

Pour lancer les tests :

```bash
npm run test
```

## Version de production et audit

Pour vérifier le comportement de l'application dans des conditions réelles de production (recommandé avant de lancer un audit Lighthouse) :

```bash
npm run build
npm start
```
