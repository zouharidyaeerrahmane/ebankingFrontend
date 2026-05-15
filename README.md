# E-Banking Frontend — Documentation

## Vue d'ensemble

Application Angular (standalone components) pour l'interface utilisateur de la plateforme e-banking. Permet la gestion des clients, la consultation des comptes et l'exécution d'opérations bancaires. Communique avec le backend Spring Boot via des appels REST sécurisés par JWT.

---

## Stack technique

| Élément | Détail |
|---|---|
| Framework | Angular (standalone components, pas de NgModule applicatif) |
| Langage | TypeScript |
| Styles | CSS pur |
| HTTP | HttpClient avec interceptor JWT |
| Formulaires | Reactive Forms |
| Routage | Angular Router avec guards |
| Décodage JWT | `jwt-decode` |

---

## Lancement

### Prérequis
- Node.js + npm
- Angular CLI installé globalement

### Installation et démarrage

```bash
cd ebanking_frontend
npm install
ng serve
```

L'application tourne sur : `http://localhost:4200`

Le backend doit être actif sur : `http://localhost:8084`

### Modifier l'URL du backend

Fichier : `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  backendHost: 'http://localhost:8084'
};
```

---

## Structure du projet

```
src/app/
├── admin-template/      — layout principal avec sidebar/navbar (route parente /admin)
├── accounts/            — gestion et opérations sur les comptes bancaires
├── customers/           — liste et recherche des clients
├── new-customer/        — formulaire de création d'un client (ADMIN uniquement)
├── customer-account/    — comptes liés à un client spécifique
├── login/               — page de connexion
├── navbar/              — barre de navigation
├── not-authorized/      — page d'accès refusé
├── guards/
│   ├── authentication-guard.ts  — bloque si non connecté
│   └── authorization-guard.ts   — bloque si rôle insuffisant
├── interceptors/
│   └── app-http-interceptor.ts  — injecte le Bearer token dans chaque requête
├── services/
│   ├── auth.ts          — authentification, décodage JWT, session locale
│   ├── account.ts       — appels API comptes (debit, credit, transfer, historique)
│   └── customer.ts      — appels API clients (CRUD)
├── model/
│   ├── account.model.ts — interfaces AccountDetails, AccountOperation
│   └── customer.model.ts
└── app.routes.ts        — configuration des routes
```

---

## Routes

| URL | Composant | Garde | Rôle requis |
|---|---|---|---|
| `/login` | `Login` | — | — |
| `/admin` | `AdminTemplate` | `AuthenticationGuard` | Authentifié |
| `/admin/customers` | `Customers` | — | USER |
| `/admin/accounts` | `Accounts` | — | USER |
| `/admin/new-customer` | `NewCustomer` | `AuthorizationGuard` | ADMIN |
| `/admin/customer-account/:id` | `CustomerAccount` | — | USER |
| `/admin/not-authorized` | `NotAuthorized` | — | — |
| `` (racine) | → `/login` | — | — |

---

## Authentification

### Flux de connexion

```
Login component
  │ username + password
  ▼
POST /auth/login (application/x-www-form-urlencoded)
  │ { "access-token": "<jwt>" }
  ▼
Auth.loadProfile()
  │ décode le JWT → extrait username et scope (rôles)
  │ stocke le token dans localStorage
  ▼
Navigation vers /admin/customers
```

### Service `Auth` (`services/auth.ts`)

| Propriété / Méthode | Rôle |
|---|---|
| `isAuthenticated` | booléen indiquant si l'utilisateur est connecté |
| `username` | nom d'utilisateur extrait du JWT |
| `roles` | rôles extraits du claim `scope` du JWT |
| `accessToken` | token JWT brut |
| `login(username, password)` | appel POST vers le backend |
| `loadProfile(data)` | parse et stocke les infos du JWT |
| `logout()` | réinitialise tous les champs |
| `loadJwtTokenFromLocalStorage()` | restaure la session depuis le localStorage |

---

## Guards (protection des routes)

### `AuthenticationGuard`

Vérifie que `auth.isAuthenticated` est `true`. Sinon redirige vers `/login`.

### `AuthorizationGuard`

Vérifie que `auth.roles` contient `ROLE_ADMIN`. Sinon redirige vers `/admin/not-authorized`.

---

## Intercepteur HTTP

Fichier : `interceptors/app-http-interceptor.ts`

Ajoute automatiquement l'en-tête `Authorization: Bearer <token>` à chaque requête HTTP, sauf pour `/auth/login`.

```typescript
// Logique simplifiée
if (!req.url.includes('auth/login')) {
  req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + auth.accessToken) });
}
```

---

## Composants principaux

### `Accounts`

- Recherche un compte par son ID
- Affiche l'historique paginé des opérations
- Exécute les opérations : **Débit**, **Crédit**, **Virement**
- Utilise des Reactive Forms pour les formulaires
- La pagination est gérée manuellement via `currentPage` / `pageSize`

### `Customers`

- Liste tous les clients
- Recherche par mot-clé (appel à `/customers/search?keyword=`)
- Lien vers les comptes d'un client (`/admin/customer-account/:id`)
- Bouton de suppression visible uniquement pour les ADMIN

### `NewCustomer`

- Formulaire de création d'un client
- Accessible uniquement si le rôle ADMIN est présent (guard)

### `CustomerAccount`

- Affiche les comptes (courant et épargne) d'un client donné
- Reçoit l'`id` du client via `ActivatedRoute`

### `Login`

- Formulaire simple (username / password)
- Appelle `Auth.login()` puis `Auth.loadProfile()` en cas de succès

---

## Services HTTP

### `AccountsService` (`services/account.ts`)

| Méthode | Endpoint appelé | Description |
|---|---|---|
| `getAccount(id, page, size)` | `GET /accounts/{id}/pageOperations` | Historique paginé |
| `debit(id, amount, desc)` | `POST /accounts/debit` | Débiter un compte |
| `credit(id, amount, desc)` | `POST /accounts/credit` | Créditer un compte |
| `transfer(src, dest, amount, desc)` | `POST /accounts/transfer` | Virement |

### `CustomerService` (`services/customer.ts`)

Gère les opérations CRUD sur les clients via les endpoints `/customers`.

---

## Modèles TypeScript

### `AccountDetails` (`model/account.model.ts`)

```typescript
interface AccountDetails {
  accountId:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperation[];
}

interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;   // "DEBIT" | "CREDIT"
  description:   string;
}
```

---

## Comptes de test

| Utilisateur | Mot de passe | Rôles |
|---|---|---|
| `user1` | `user1111` | USER |
| `admin` | `admin0000` | USER + ADMIN |

Ces comptes sont définis en mémoire côté backend (`InMemoryUserDetailsManager`).

## Realisé par :  ZOUHARI Dyae errahmane GLSID-2 
