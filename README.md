Markdown
# Kasa - Plateforme de location d'appartements entre particuliers

## 📖 Description du projet
Kasa est une application web moderne de location d'appartements. Ce projet consiste en la refonte totale du front-end de l'application pour la faire passer sur une stack technique récente et robuste. L'objectif est de proposer une expérience utilisateur fluide, accessible et performante, tout en respectant scrupuleusement les maquettes de conception.

Les fonctionnalités principales incluent :
* La navigation dynamique entre les différents logements.
* Une galerie photo (carrousel) navigable, entièrement testée et optimisée.
* La gestion d'une liste de favoris persistante (via localStorage et Context API).
* Un système d'authentification et de protection des routes privées (Middleware).
* Une interface 100% responsive (ordinateur, tablette, mobile).
* Un haut niveau d'accessibilité (normes WCAG) et d'optimisation des performances SEO.

## 🛠 Technologies utilisées
* **Framework :** [Next.js](https://nextjs.org/) (React)
* **Langage :** TypeScript
* **Stylisation :** CSS Modules
* **Tests :** Jest & React Testing Library (couverture sur les composants UI et les favoris)
* **Documentation :** JSDoc

## Pré-requis pour l'installation
Avant de commencer, assurez-vous d'avoir installé les outils suivants sur votre poste :
* [Node.js](https://nodejs.org/) (version 18.x ou supérieure recommandée)
* Le gestionnaire de paquets [npm](https://www.npmjs.com/) (inclus avec Node.js)
* Git pour cloner le dépôt

## Installation

1. Clonez ce dépôt sur votre machine locale :
```bash
git clone [https://github.com/Walhezer/Kasa-NextJS.git](https://github.com/Walhezer/Kasa-NextJS.git)
Naviguez dans le dossier du projet :

Bash
cd Kasa-NextJS
Installez toutes les dépendances nécessaires :

Bash
npm install
Variables d'environnement : Créez un fichier .env.local à la racine du projet en vous basant sur les besoins de l'application (authentification, API).
Exemple de contenu :

Extrait de code
NEXT_PUBLIC_API_URL=http://localhost:3080/api
Lancement du projet
Pour démarrer le serveur de développement local :

Bash
npm run dev
Ouvrez ensuite http://localhost:3000 dans votre navigateur pour visualiser et interagir avec l'application.

Exécution des tests unitaires
L'application intègre une suite de tests unitaires pour assurer la fiabilité de la logique métier et des composants interactifs (Carrousel, système de favoris).
Pour lancer les tests :

Bash
npm run test
Version de production et Audit
Pour vérifier le comportement de l'application dans des conditions réelles de production (recommandé avant de lancer un audit Lighthouse) :

Bash
npm run build
npm start