# Task Manager

Application full-stack de gestion de tâches développée avec Spring Boot, React, TypeScript, MySQL et Docker.

## Fonctionnalités

- Inscription
- Connexion avec JWT
- Déconnexion
- Gestion des sessions
- Création de tâches
- Modification de tâches
- Suppression de tâches
- Changement de statut
- Recherche de tâches
- Filtrage par statut
- Dashboard avec statistiques
- Gestion du compte
- API REST sécurisée
- Isolation des tâches par utilisateur
- Tests automatisés
- Docker
- CI avec GitHub Actions

## Technologies

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- Maven
- MySQL

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- TanStack React Query
- Vitest

### Infrastructure

- Docker
- Docker Compose
- Nginx
- GitHub Actions

## Architecture

```text
Browser
   |
   v
Nginx / React
   |
   | /api
   v
Spring Boot
   |
   v
MySQL



Prérequis
Java 21
Maven
Node.js 22+
npm
Docker Desktop
Installation

Cloner le projet :

git clone <URL_DU_REPOSITORY>
cd task-manager
Lancer avec Docker
docker compose up --build

Application :

http://localhost:5173

API :

http://localhost:8080
Lancer le backend sans Docker
cd backend
mvn spring-boot:run
Lancer le frontend sans Docker
cd frontend
npm install
npm run dev
Tests frontend
cd frontend
npm run test
API
Authentification
POST /api/auth/register
POST /api/auth/login
Tâches
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}

Les endpoints de tâches nécessitent un token JWT.

Sécurité

L'application utilise Spring Security et JWT.

Chaque tâche est associée à son utilisateur propriétaire.

Un utilisateur ne peut donc accéder qu'à ses propres tâches.

CI

GitHub Actions exécute automatiquement :

les tests backend
le build backend
les tests frontend
le build frontend
Structure
task-manager/
├── backend/
├── frontend/
├── mobile/
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
Auteur

Junior Tsakeng

