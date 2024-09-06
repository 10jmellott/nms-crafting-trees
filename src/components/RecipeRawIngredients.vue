<script setup lang="ts">
import { computed } from 'vue';
import recipes from '../assets/recipes.json';
import { Recipe, Ingredient } from '../recipe';
import RecipeTable from './RecipeTable.vue';

const props = defineProps<{
	recipe: Recipe,
	quanitity: number
}>();

function lookupRecipe(name: string) {
	return recipes.find(recipe => recipe.name === name)!;
}

const rawIngredients = computed(() => {
	const rawIngredients = [] as Ingredient[];
	const toProcess = [{ name: props.recipe.name, quantity: props.quanitity }];
	while (toProcess.length) {
		const { name, quantity } = toProcess.pop()!;
		const recipe = lookupRecipe(name);
		if (recipe.ingredients) {
			for (const ingredient of recipe.ingredients) {
				toProcess.push({ name: ingredient.name, quantity: ingredient.quantity * quantity });
			}
		} else {
			const existing = rawIngredients.find(i => i.name === name);
			if (existing) {
				existing.quantity += quantity;
			} else {
				rawIngredients.push({ name: name, quantity: quantity });
			}
		}
	}
	return rawIngredients.sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<template>
	<div class="recipe-totals">
		<RecipeTable v-if="recipe.ingredients" v-for="ingredient in rawIngredients" :key="ingredient.name"
			:recipe="lookupRecipe(ingredient.name)" :quanitity="ingredient.quantity" />
	</div>
</template>

<style lang="scss" scoped>
.recipe-totals {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
