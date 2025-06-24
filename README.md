# 🚀CORPOSUP

Projet full-stack avec **Laravel 11 (Backend API)** + **React + Vite + Tailwind + Shadcn (Frontend)**.  
Plateforme pour Buyers, Vendors et Admins

---

## 🚀 Installation locale (pour tous les développeurs)

### 1. Cloner le projet
```bash
git clone https://github.com/<TON-UTILISATEUR>/<TON-REPO>.git
cd <TON-REPO>

### 2. Installer les dépendances Laravel (Backend)
```bash
composer install

### 3. Installer les dépendances Node (Frontend)
```bash
npm install
---
###4. Copier le fichier .env
cp .env.example .env
---
###Configurer la base de données dans le .env :
DB_DATABASE=corposup
DB_USERNAME=root
DB_PASSWORD=
---
### 5. Générer la clé d'application Laravel
php artisan key:generate
---
### 6. Lancer les migrations
php artisan migrate
---
### 7. Lancer le backend (Laravel API)
php artisan serve
---
### 8. Lancer le frontend (Vite + React)
npm run dev
---
### 💪 LET'S GO CORPOSUP TEAM! 💪
