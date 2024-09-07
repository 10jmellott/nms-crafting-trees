<script setup lang="ts">
import recipes from '../assets/recipes.json';
import Recipe from '../recipe';

const recipe = defineModel<Recipe>();
</script>

<template>
	<div class="recipe-list">
		<div class="recipe" :class="{ active: recipe?.name === r.name }" v-for="r in recipes" :key="r.name"
			@click="recipe = r">
			{{ r.name }}
		</div>
	</div>
</template>

<style lang="scss" scoped>
.recipe-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;

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
	}
}
</style>
