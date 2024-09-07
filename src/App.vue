<script setup lang="ts">
import recipes from './assets/recipes.json';
import Panel from './components/Panel.vue';
import RecipeList from './components/RecipeList.vue';
import RecipeTable from './components/RecipeTable.vue';
import RecipeRawIngredients from './components/RecipeRawIngredients.vue';
import Quantity from './components/Quantity.vue';
import Recipe from './recipe';
import { ref } from 'vue';

const selectedRecipe = ref<Recipe>(recipes[0]);
const quantity = ref(1);
</script>

<template>
	<div class="app">
		<img class="app__background" src="./assets/nms.webp" />
		<main>
			<Panel class="app__panel" title="Recipes">
				<template #subheader>
					<Quantity v-model="quantity" />
				</template>
				<RecipeList v-model="selectedRecipe" />
			</Panel>
			<Panel class="app__panel" title="Crafting Tree">
				<RecipeTable :recipe="selectedRecipe" :quanitity="quantity" />
			</Panel>
			<Panel class="app__panel" title="Ingredients">
				<RecipeRawIngredients :recipe="selectedRecipe" :quanitity="quantity" />
			</Panel>
		</main>
	</div>
</template>

<style lang="scss" scoped>
.app {
	height: 100vh;
	width: 100vw;
	display: flex;

	main {
		display: flex;
		flex-direction: row;
		gap: 32px;
		margin: 32px;
		flex-grow: 1;
		z-index: 1;
	}

	&__panel {
		flex: 1;
	}

	&__background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>
