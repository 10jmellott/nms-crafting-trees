<script setup lang="ts">
import RecipeTable from './components/RecipeTable.vue';
import RecipeRawIngredients from './components/RecipeRawIngredients.vue';
import Recipe from './recipe';
import { ref } from 'vue';
import recipes from './assets/recipes.json';

const selectedRecipe = ref<Recipe>(recipes[0]);
const quantity = ref(1);
</script>

<template>
	<div class="app">
		<img class="app__background" src="./assets/nms.webp" />
		<nav class="app__recipes">
			<div class="recipe" :class="{ active: selectedRecipe?.name === recipe.name }" v-for="recipe in recipes"
				:key="recipe.name" @click="selectedRecipe = recipe">
				{{ recipe.name }}
				<div class="quantity" v-if="selectedRecipe?.name === recipe.name">
					<span @click="quantity++">+</span>
					<span @click="() => quantity > 1 ? quantity-- : 0">-</span>
				</div>
			</div>
		</nav>
		<main>
			<RecipeTable :recipe="selectedRecipe" :quanitity="quantity" />
			<RecipeRawIngredients :recipe="selectedRecipe" :quanitity="quantity" />
		</main>
	</div>
</template>

<style lang="scss" scoped>
.app {
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: row;

	nav,
	main {
		margin: 20px;
		z-index: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	nav {
		width: 180px;
	}

	main {
		flex-grow: 1;
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	&__background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.5;
		filter: blur(16px);
	}

	&__recipes {
		align-items: flex-end;

		.recipe {
			opacity: 0.5;
			cursor: pointer;
			transition: opacity 0.3s;
			display: flex;
			align-items: center;
			gap: 8px;

			&:hover,
			&.active {
				opacity: 1;
			}

			&.active {
				text-shadow: 0 0 20px var(--accent1);
			}

			.quantity {
				display: flex;
				align-items: center;
				gap: 4px;


				span {
					cursor: pointer;
					user-select: none;
					font-size: 2rem;
					opacity: 0.5;
					transition: opacity 0.3s;
					color: var(--accent1);

					&:hover {
						opacity: 1;
					}
				}
			}
		}
	}
}
</style>
