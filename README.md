# 🌙 Nuit de l'Info 2025 - OpenTown

![Banner](https://img.shields.io/badge/Nuit%20de%20l'Info-2025-blueviolet?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-En%20Développement-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-ISC-yellow?style=for-the-badge)

Bienvenue dans **OpenTown**, une expérience interactive et immersive développée dans le cadre de la **Nuit de l'Info 2025**. Plongez dans un univers mystérieux où chaque bâtiment cache une histoire et où un chatbot excentrique, **Philoute**, vous guidera (ou vous perdra) dans votre quête.

---

## 🚀 Fonctionnalités

- **🗺️ Exploration Interactive** : Naviguez à travers différents lieux emblématiques (École, Bibliothèque, Base Militaire, Cinéma, etc.).
- **🤖 Chatbot "Philoute"** : Une IA basée sur **Google Gemini** qui répond à vos questions de manière... unique et mystique.
- **🎮 Gamification** : Suivez votre progression à travers des jalons et débloquez des secrets.
- **📱 Responsive Design** : Une interface adaptée à tous les écrans, du mobile au desktop.
- **🎨 Direction Artistique** : Une ambiance visuelle soignée avec des animations et un design immersif.

---

## 🛠️ Technologies Utilisées

Ce projet a été réalisé avec amour et caféine en utilisant les technologies suivantes :

- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white) **Node.js** : Environnement d'exécution JavaScript.
- ![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB) **Express.js** : Framework web rapide et minimaliste.
- ![EJS](https://img.shields.io/badge/EJS-B4CA65.svg?style=flat&logo=ejs&logoColor=black) **EJS** : Moteur de template pour générer des pages HTML dynamiques.
- ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=flat&logo=google&logoColor=white) **Google Gemini AI** : L'intelligence derrière Philoute.
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) **Vercel** : Plateforme de déploiement.

---

## 📦 Installation

Pour lancer le projet localement, suivez ces étapes simples :

1.  **Cloner le dépôt** :

    ```bash
    git clone https://github.com/frozyCODE/openTown.git
    cd openTown
    ```

2.  **Installer les dépendances** :

    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement** :
    Créez un fichier `.env` à la racine du projet et ajoutez vos clés API :

    ```env
    GEMINI_API_KEY=votre_clé_api_gemini
    EMAILJS_PUBLIC_KEY=votre_clé_publique
    EMAILJS_SERVICE_ID=votre_service_id
    EMAILJS_TEMPLATE_ID=votre_template_id
    ```

4.  **Lancer le serveur** :

    ```bash
    npm start
    ```

5.  **Accéder à l'application** :
    Ouvrez votre navigateur et allez sur `http://localhost:3000`.

---

## 📂 Structure du Projet

```
nuit_de_linfo/
├── 📁 public/          # Fichiers statiques (CSS, JS, Images)
├── 📁 views/           # Templates EJS
│   ├── 📁 partials/    # Composants réutilisables (header, footer)
│   └── ...             # Pages du site
├── 📜 server.js        # Point d'entrée du serveur Express
├── 📜 chatbot.js       # Logique du chatbot Philoute
├── 📜 package.json     # Dépendances et scripts
└── 📜 README.md        # Vous êtes ici !
```

---

## 👥 Auteurs

Une équipe de passionnés pour la Nuit de l'Info

---

<p align="center">
  Fait avec ❤️ pour la Nuit de l'Info 2024.
</p>


