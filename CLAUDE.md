# CLAUDE.md — NMS Crafting Trees

This file provides guidance for AI assistants working on this codebase.

## Project Overview

**NMS Crafting Trees** is a single-page web application for the game *No Man's Sky*. It lets players search craftable items and visualize their full ingredient hierarchies, including recursive sub-recipes and aggregated raw material totals.

Deployed via GitHub Pages at base path `/nms-crafting-trees/`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript 5 (strict mode) |
| Build tool | Vite 5 |
| Styles | SCSS (Sass) |
| Type checker | vue-tsc |
| Package manager | npm |

No state management library (Pinia/Vuex), no router, no test framework — intentionally minimal.

---

## Repository Structure

```
nms-crafting-trees/
├── src/
│   ├── App.vue                   # Root component; owns selected recipe + quantity state
│   ├── main.ts                   # Vue app bootstrap
│   ├── recipe.d.ts               # Shared TypeScript types (Recipe, Ingredient)
│   ├── vite-env.d.ts             # Vite environment types
│   ├── components/
│   │   ├── Panel.vue             # Reusable glass-panel layout wrapper (slots: title, subheader)
│   │   ├── RecipeList.vue        # Searchable recipe selector; emits selected recipe
│   │   ├── RecipeTable.vue       # Recursive crafting tree renderer
│   │   ├── RecipeRawIngredients.vue # Aggregated base-material totals
│   │   └── Quantity.vue          # Increment/decrement quantity control
│   ├── assets/
│   │   ├── recipes.json          # Static recipe data (75 recipes, hierarchical JSON)
│   │   └── nms.webp              # Background image
│   └── styles/
│       ├── main.scss             # Master stylesheet (imports all partials)
│       ├── theme.scss            # CSS custom properties (colors, glass effect vars)
│       ├── fonts.scss            # @font-face for "Geo NMS" custom font
│       └── reset.css             # Meyer Web CSS reset v2.0
├── public/
│   ├── geonms-font.woff2         # Custom game font
│   └── (favicon/icon assets)
├── docs/                         # Pre-built production bundle (deployed to GitHub Pages)
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite config (base path, output dir)
├── tsconfig.json                 # TypeScript root config (project references)
├── tsconfig.app.json             # App TypeScript config (strict, ES2020)
├── tsconfig.node.json            # Node/vite config (ES2022)
└── package.json
```

---

## Development Workflow

### Common Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:8086)
npm run dev

# Type-check + production build → outputs to docs/
npm run build

# Preview production build locally
npm run preview
```

The dev server runs on **port 8086** (configured explicitly in `package.json`).

### Build Output

`npm run build` runs `vue-tsc -b && vite build` in sequence:
1. `vue-tsc -b` — full TypeScript type check across all `.vue` and `.ts` files
2. `vite build` — bundles to `docs/` (not the default `dist/`)

The `docs/` directory is committed and serves as the GitHub Pages deployment source.

---

## TypeScript Conventions

- **Strict mode** is enabled in `tsconfig.app.json`; all options enforced: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Use `type` declarations, not `interface` — consistent with existing code in `recipe.d.ts`
- Type imports use the `./recipe` module path convention; add shared types there
- Target: ES2020 for app code, ES2022 for vite config

### Core Types (`src/recipe.d.ts`)

```typescript
type Ingredient = {
  name: string
  quantity: number
}

type Recipe = {
  name: string
  icon: string            // URL to wiki icon image
  ingredients?: Ingredient[]
}
```

---

## Vue 3 Component Conventions

- All components use `<script setup lang="ts">` (no Options API)
- Props declared with `defineProps<{ ... }>()`
- Two-way bindings use `defineModel<T>()`
- No Vuex/Pinia — state lives in `App.vue` and is passed down via props/v-model

### Component Responsibilities

| Component | Responsibility |
|---|---|
| `App.vue` | Owns `selectedRecipe` and `quantity` state; lays out the three panels |
| `RecipeList.vue` | Renders searchable list; updates selected recipe via v-model |
| `RecipeTable.vue` | Recursive: renders ingredient rows, calls itself for sub-recipes |
| `RecipeRawIngredients.vue` | Flattens the recipe tree into aggregated raw material counts |
| `Quantity.vue` | Simple +/− UI bound to quantity via v-model |
| `Panel.vue` | Visual wrapper with named slots (`title`, `subheader`, default) |

### Known Typo

The prop `quanitity` (misspelled) is used **consistently** across `RecipeTable.vue`, `RecipeRawIngredients.vue`, and `Quantity.vue`. **Do not fix it unless also fixing all usages simultaneously**, to avoid breaking bindings.

---

## Styling Conventions

- **SCSS** with modular partials imported in `src/styles/main.scss`
- **CSS custom properties** for theming defined in `theme.scss`:
  - `--background`, `--foreground`, `--accent1`, `--accent2`, `--accent3`
  - Glass effect values: `--glass-bg`, `--glass-border`
- **Naming**: BEM-adjacent kebab-case (`.panel__title`, `.recipe-list__search`)
- **Indentation**: tabs (per `.editorconfig`)
- **Scoped styles** used in all components (`<style scoped lang="scss">`)
- Glass morphism aesthetic: `backdrop-filter: blur(...)`, semi-transparent `rgba` backgrounds
- Custom font "Geo NMS" loaded via `fonts.scss` from `/geonms-font.woff2`

---

## Recipe Data (`src/assets/recipes.json`)

Static JSON array — no API or database. Structure:

```json
[
  {
    "name": "Ion Battery",
    "icon": "https://static.wikia.nocookie.net/.../Ion_Battery.png",
    "ingredients": [
      { "name": "Ferrite Dust", "quantity": 100 },
      { "name": "Carbon", "quantity": 50 }
    ]
  }
]
```

- `ingredients` is optional (base materials have no sub-recipe)
- Icon URLs point to the No Man's Sky wiki (external, may change)
- 75 recipes total as of last update

To add or modify recipes, edit this file directly. The app renders everything dynamically from this data.

---

## Deployment

- **Host**: GitHub Pages
- **Base URL**: `/nms-crafting-trees/` (configured in `vite.config.ts`)
- **Deploy method**: Commit the `docs/` build output; GitHub Pages serves from `docs/` on the main branch
- No automated CI/CD pipeline — build and commit manually before deploying

```bash
npm run build
git add docs/
git commit -m "GitHub Docs Update"
git push
```

---

## What Does Not Exist (Do Not Assume)

- No unit or E2E test framework (Vitest, Jest, Playwright, Cypress)
- No linting configuration (ESLint, Prettier) — only basic EditorConfig
- No state management library
- No routing (Vue Router)
- No backend or API
- No environment variables or `.env` files
- No CI/CD pipeline (GitHub Actions workflows were removed)
