# Task Manager

Application full-stack de gestion de tâches développée avec **Spring Boot, React, TypeScript, MySQL et Docker**.

## 🚀 Application déployée

**Application web :**
https://task-manager-sme2.onrender.com

**Repository GitHub :**
https://github.com/thekrakens007/task-manager

> Le backend est déployé sur Render et la base de données MySQL utilise Aiven.

## ✨ Fonctionnalités

* Inscription
* Connexion avec JWT
* Déconnexion
* Gestion des sessions
* Création de tâches
* Modification de tâches
* Suppression de tâches
* Changement de statut
* Recherche de tâches
* Filtrage par statut
* Dashboard avec statistiques
* Gestion du compte
* API REST sécurisée
* Isolation des tâches par utilisateur
* Tests automatisés
* Docker / Docker Compose
* CI avec GitHub Actions

## 🛠️ Technologies

### Backend

* Java 21
* Spring Boot 3.5.5
* Spring Security
* Spring Data JPA
* JWT
* Maven
* MySQL

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack React Query
* Vitest

### Infrastructure

* Docker
* Docker Compose
* Nginx
* GitHub Actions
* Render
* Aiven MySQL

## 🏗️ Architecture

```text
                    Browser
                       |
                       v
              React + Vite / Nginx
                       |
                    /api/*
                       |
                       v
              Spring Boot REST API
                       |
                       v
                  MySQL / Aiven
```
📸 Captures d'écran
🔐 Connexion

![img.png](docs/screenshots/img.png)

📝 Inscription

![img_1.png](docs/screenshots/img_1.png)

📊 Dashboard

![img_4.png](docs/screenshots/img_4.png)

📋 Gestion des tâches

![img_5.png](docs/screenshots/img_5.png)

➕ Création d'une tâche

![img_6.png](docs/screenshots/img_6.png)





## 📋 Prérequis

Pour exécuter le projet localement :

* Java 21
* Maven
* Node.js 22+
* npm
* Docker Desktop

## 📦 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/thekrakens007/task-manager.git
cd task-manager
```

### 2. Lancer avec Docker

```bash
docker compose up --build
```

Application :

```text
http://localhost:5173
```

API :

```text
http://localhost:8080
```

### 3. Lancer le backend sans Docker

```bash
cd backend
mvn spring-boot:run
```

### 4. Lancer le frontend sans Docker

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Tests

### Tests frontend

```bash
cd frontend
npm run test
```

### CI

GitHub Actions exécute automatiquement :

* les tests backend
* le build backend
* les tests frontend
* le build frontend

## 🔐 API

### Authentification

```text
POST /api/auth/register
POST /api/auth/login
```

### Tâches

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
```

Les endpoints de gestion des tâches nécessitent un token JWT valide.

## 🔒 Sécurité

L'application utilise **Spring Security et JWT** pour sécuriser l'API.

Chaque tâche est associée à son utilisateur propriétaire.

Un utilisateur ne peut donc accéder qu'à ses propres tâches.

## 🐳 Docker

Le projet fournit un environnement Docker Compose comprenant :

* MySQL
* Backend Spring Boot
* Frontend React avec Nginx

Pour démarrer l'ensemble :

```bash
docker compose up --build
```

## 📁 Structure du projet

```text
task-manager/
├── backend/
├── frontend/
├── mobile/
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

## 👨‍💻 Auteur

**Junior Tsakeng**
