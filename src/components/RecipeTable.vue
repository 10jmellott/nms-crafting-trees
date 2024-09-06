<script setup lang="ts">
import recipes from '../assets/recipes.json';
import Recipe from '../recipe';

defineProps<{
	recipe: Recipe,
	quanitity: number
}>();

function lookupRecipe(name: string) {
	return recipes.find(recipe => recipe.name === name)!;
}
</script>

<template>
	<div class="recipe-table">
		<p><span class="recipe-table__name">{{ recipe.name }}</span> x{{ quanitity }}</p>
		<RecipeTable class="ingredients" v-if="recipe.ingredients" v-for="ingredient in recipe.ingredients"
			:key="ingredient.name" :recipe="lookupRecipe(ingredient.name)"
			:quanitity="ingredient.quantity * quanitity" />
	</div>
</template>

<style lang="scss" scoped>
.recipe-table {
	display: flex;
	flex-direction: column;
	gap: 10px;

	.ingredients {
		padding-left: 20px;
	}
}
</style>
