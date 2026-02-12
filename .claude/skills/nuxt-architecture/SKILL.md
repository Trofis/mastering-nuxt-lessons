---
name: nuxt-architecture
description: Guide d'architecture Nuxt - structure des dossiers, auto-imports, layouts, middleware et configuration nuxt.config.ts. Utilise ce skill quand l'utilisateur pose des questions sur l'organisation du code Nuxt, les conventions de nommage, ou la configuration.
---

# Architecture Nuxt 3/4

## 1. Structure des Dossiers

### Structure Nuxt 4 (avec `app/`)

```
project/
├── app/                    # Code applicatif (Nuxt 4)
│   ├── app.vue             # Composant racine
│   ├── pages/              # Routes automatiques
│   ├── components/         # Composants Vue auto-importés
│   ├── composables/        # Logique réutilisable (useXxx)
│   ├── layouts/            # Layouts de pages
│   ├── middleware/         # Middleware de navigation
│   ├── plugins/            # Plugins Nuxt/Vue
│   ├── assets/             # Assets traités par Vite (CSS, images)
│   └── utils/              # Fonctions utilitaires auto-importées
├── server/                 # Code serveur Nitro
│   ├── api/                # Routes API (/api/*)
│   ├── routes/             # Routes serveur personnalisées
│   ├── middleware/         # Middleware serveur
│   ├── plugins/            # Plugins serveur Nitro
│   └── utils/              # Utilitaires serveur auto-importés
├── shared/                 # Code partagé app + serveur
├── public/                 # Fichiers statiques (non traités)
├── layers/                 # Layers Nuxt réutilisables
├── nuxt.config.ts          # Configuration Nuxt
└── app.config.ts           # Configuration runtime réactive
```

### Dossiers Clés

#### `pages/` - Routing basé sur les fichiers
```
pages/
├── index.vue               # → /
├── about.vue               # → /about
├── blog/
│   ├── index.vue           # → /blog
│   └── [slug].vue          # → /blog/:slug (dynamique)
└── users/
    └── [id]/
        └── profile.vue     # → /users/:id/profile
```

#### `components/` - Composants auto-importés
```
components/
├── AppHeader.vue           # <AppHeader />
├── global/                 # Composants globaux
│   └── Button.vue          # <GlobalButton />
└── ui/
    └── Card.vue            # <UiCard />
```

#### `composables/` - Logique réutilisable
```
composables/
├── useAuth.ts              # export const useAuth = () => {...}
├── useApi.ts               # Accès API centralisé
└── states.ts               # États partagés avec useState()
```

#### `server/api/` - Routes API
```
server/api/
├── users.get.ts            # GET /api/users
├── users.post.ts           # POST /api/users
├── users/
│   └── [id].ts             # GET/POST/etc /api/users/:id
└── auth/
    └── login.post.ts       # POST /api/auth/login
```

---

## 2. Auto-imports et Conventions de Nommage

### Ce qui est auto-importé

| Source | Auto-importé | Exemple |
|--------|--------------|---------|
| `components/` | Tous les `.vue` | `<MyComponent />` |
| `composables/` | Exports nommés | `useAuth()` |
| `utils/` | Exports nommés | `formatDate()` |
| `server/utils/` | Exports serveur | Disponibles dans `server/` |
| Vue | APIs de base | `ref`, `computed`, `watch` |
| Nuxt | Helpers | `useRoute`, `useFetch`, `useState` |

### Conventions de Nommage

#### Composants (PascalCase)
```
components/
├── AppHeader.vue           → <AppHeader />
├── base/
│   └── Button.vue          → <BaseButton />
└── form/
    └── Input.vue           → <FormInput />
```

**Désactiver le préfixe de chemin :**
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  components: {
    pathPrefix: false,  // Button.vue → <Button /> au lieu de <BaseButton />
  },
})
```

#### Composables (use + PascalCase)
```ts
// composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// Utilisation (auto-importé)
const { count, increment } = useCounter()
```

#### Utils (camelCase)
```ts
// utils/format.ts
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value)

// Utilisation (auto-importé)
formatCurrency(42.5)  // "42,50 €"
```

### Configuration des Auto-imports

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  imports: {
    // Désactiver complètement les auto-imports
    autoImport: false,

    // Scanner les sous-dossiers de composables/
    dirs: [
      'composables',
      'composables/*/index.{ts,js,mjs,mts}',
      'composables/**',
    ],
  },

  components: {
    // Dossiers personnalisés
    dirs: [
      { path: '~/components', pathPrefix: false },
      { path: '~/components/global', global: true },
    ],
  },
})
```

---

## 3. Layouts et Middleware

### Layouts

#### Définir un layout (`app/layouts/`)
```vue
<!-- app/layouts/default.vue -->
<template>
  <div class="layout-default">
    <AppHeader />
    <main>
      <slot />  <!-- Contenu de la page -->
    </main>
    <AppFooter />
  </div>
</template>
```

```vue
<!-- app/layouts/admin.vue -->
<template>
  <div class="layout-admin">
    <AdminSidebar />
    <div class="content">
      <slot />
    </div>
  </div>
</template>
```

#### Utiliser un layout dans une page
```vue
<!-- app/pages/dashboard.vue -->
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
})
</script>

<template>
  <div>Dashboard content</div>
</template>
```

#### Désactiver le layout
```vue
<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>
```

#### Layout dynamique
```vue
<script setup lang="ts">
const route = useRoute()

definePageMeta({
  layout: false,  // Désactiver le layout automatique
})

const layout = computed(() => route.meta.customLayout || 'default')
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
```

### Middleware

#### Types de Middleware

1. **Named Middleware** - Défini dans `middleware/`, utilisé explicitement
2. **Global Middleware** - Suffixe `.global.ts`, exécuté sur toutes les routes
3. **Inline Middleware** - Défini directement dans `definePageMeta`

#### Créer un middleware nommé
```ts
// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
```

#### Middleware global
```ts
// app/middleware/analytics.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // Exécuté sur TOUTES les navigations
  trackPageView(to.fullPath)
})
```

#### Utiliser un middleware dans une page
```vue
<script setup lang="ts">
definePageMeta({
  // Un seul middleware
  middleware: 'auth',

  // Plusieurs middlewares
  middleware: ['auth', 'admin'],
})
</script>
```

#### Middleware inline
```vue
<script setup lang="ts">
definePageMeta({
  middleware: [
    function (to, from) {
      // Logique inline
      if (to.query.token) {
        return navigateTo('/dashboard')
      }
    },
  ],
})
</script>
```

#### Middleware serveur (`server/middleware/`)
```ts
// server/middleware/log.ts
export default defineEventHandler((event) => {
  console.log(`[${event.method}] ${event.path}`)
  // Ne pas retourner = continuer la chaîne
})
```

---

## 4. Configuration `nuxt.config.ts`

### Structure de base
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  // Activer les devtools
  devtools: { enabled: true },

  // Compatibilité Nuxt 4
  future: {
    compatibilityVersion: 4,
  },

  // Modules Nuxt
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  // CSS global
  css: ['~/assets/css/main.css'],

  // Configuration TypeScript
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
```

### Options courantes

#### Runtime Config (variables d'environnement)
```ts
export default defineNuxtConfig({
  runtimeConfig: {
    // Privé (serveur uniquement)
    apiSecret: process.env.API_SECRET,

    // Public (exposé au client)
    public: {
      apiBase: process.env.API_BASE || 'https://api.example.com',
    },
  },
})
```

```ts
// Utilisation
const config = useRuntimeConfig()
console.log(config.public.apiBase)  // Client + Serveur
console.log(config.apiSecret)        // Serveur uniquement
```

#### App Config (`app.config.ts`)
```ts
// app.config.ts - Configuration réactive, modifiable à runtime
export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'slate',
  },
  theme: {
    dark: false,
  },
})
```

```ts
// Utilisation
const appConfig = useAppConfig()
appConfig.theme.dark = true  // Réactif !
```

#### Configuration SSR / Rendering
```ts
export default defineNuxtConfig({
  // Mode de rendu
  ssr: true,  // SSR activé (défaut)

  // Règles de rendu par route
  routeRules: {
    '/': { prerender: true },           // Statique
    '/api/**': { cors: true },          // CORS
    '/admin/**': { ssr: false },        // SPA uniquement
    '/blog/**': { swr: 3600 },          // Cache 1h
    '/old-page': { redirect: '/new' },  // Redirection
  },
})
```

#### Configuration Vite
```ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;',
        },
      },
    },
    optimizeDeps: {
      include: ['some-large-dep'],
    },
  },
})
```

#### Configuration Nitro (serveur)
```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'node-server',  // ou 'vercel', 'netlify', 'cloudflare', etc.

    // Routes pré-rendues
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
      crawlLinks: true,
    },

    // Stockage
    storage: {
      redis: {
        driver: 'redis',
        url: process.env.REDIS_URL,
      },
    },
  },
})
```

#### Configuration par environnement
```ts
export default defineNuxtConfig({
  $development: {
    devtools: { enabled: true },
  },

  $production: {
    devtools: { enabled: false },
  },

  $env: {
    staging: {
      // Config spécifique au staging
    },
  },
})
```

### Exemple complet
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
    },
  },

  typescript: {
    strict: true,
  },

  routeRules: {
    '/api/**': { cors: true },
  },

  nitro: {
    preset: 'node-server',
  },

  $development: {
    typescript: { typeCheck: true },
  },
})
```

---

## Ressources

- [Documentation officielle Nuxt](https://nuxt.com/docs)
- [Structure des dossiers](https://nuxt.com/docs/guide/directory-structure)
- [Auto-imports](https://nuxt.com/docs/guide/concepts/auto-imports)
- [Configuration](https://nuxt.com/docs/api/nuxt-config)
