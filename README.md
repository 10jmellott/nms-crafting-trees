# NMS Crafting Trees

An interactive crafting reference tool for *No Man's Sky*. Search any craftable item and visualize its full ingredient hierarchy — including nested sub-recipes — alongside aggregated raw material totals for any quantity.

**Live site:** https://10jmellott.github.io/nms-crafting-trees/

---

## Features

- Search and select from 75+ craftable items
- Recursive crafting tree showing all sub-recipe dependencies
- Aggregated raw ingredient totals for a given quantity
- Item icons sourced from the No Man's Sky wiki
- Custom game-themed UI with the Geo NMS font

## Tech Stack

- [Vue 3](https://vuejs.org/) with `<script setup>` Composition API
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Vite](https://vitejs.dev/)
- [Sass/SCSS](https://sass-lang.com/)

## Getting Started

```bash
npm install
npm run dev       # Development server at http://localhost:8086
npm run build     # Type-check + production build → docs/
npm run preview   # Preview production build locally
```

## Project Structure

```
src/
├── App.vue                        # Root component (state owner)
├── components/
│   ├── Panel.vue                  # Reusable glass-panel layout wrapper
│   ├── RecipeList.vue             # Searchable recipe selector
│   ├── RecipeTable.vue            # Recursive crafting tree renderer
│   ├── RecipeRawIngredients.vue   # Aggregated base material totals
│   └── Quantity.vue               # Quantity +/− control
├── assets/
│   └── recipes.json               # Static recipe data
└── styles/                        # SCSS partials (theme, fonts, reset)
```

## Deployment

The app is deployed to GitHub Pages. The `docs/` directory contains the pre-built production bundle. To deploy a new version:

```bash
npm run build
git add docs/
git commit -m "GitHub Docs Update"
git push
```
