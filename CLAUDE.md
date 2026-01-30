# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 chat application built with Vue 3, Nuxt UI, and Tailwind CSS. The project uses Bun as the package manager.

## Common Commands

```bash
# Development
bun dev                 # Start dev server at http://localhost:3000

# Build & Production
bun build               # Build for production
bun preview             # Preview production build locally
bun generate            # Static site generation

# Code Quality
bun lint                # Run ESLint
bun lint:fix            # Auto-fix ESLint issues
```

**Note:** Pre-commit hooks automatically run `bun lint` before each commit.

## Architecture

### Directory Structure

- `app/` - Main application directory (Nuxt 4 convention)
  - `app.vue` - Root component wrapping the app with `<UApp>` (Nuxt UI)
  - `pages/` - File-based routing (auto-generated routes)
  - `layouts/` - Page layouts
  - `assets/css/` - Tailwind CSS styles

### Configuration Files

- `nuxt.config.ts` - Nuxt framework configuration (modules, CSS)
- `app.config.ts` - Runtime app config (UI colors: blue primary, slate neutral)
- `eslint.config.mjs` - ESLint with Nuxt-specific rules

### Tech Stack

- **Framework:** Nuxt 4.2.2 / Vue 3
- **UI:** @nuxt/ui 4.3.0 (component library with Tailwind integration)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **Node:** v24.13.0 (see `.nvmrc`)

### Routing

Pages in `app/pages/` automatically become routes:
- `index.vue` → `/` (landing page)
- `chat.vue` → `/chat` (chat page)
