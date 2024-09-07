<script setup lang="ts">
const quantity = defineModel<number>({ default: 1 });
</script>

<template>
	<div class="quantity">
		<svg @click="() => quantity > 1 ? quantity-- : 0" xmlns="http://www.w3.org/2000/svg" height="24px"
			viewBox="0 -960 960 960" width="24px" fill="var(--foreground)">
			<path d="M200-440v-80h560v80H200Z" />
		</svg>
		<p>{{ quantity }}</p>
		<svg @click="quantity++" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
			fill="var(--foreground)">
			<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
		</svg>
	</div>
</template>

<style lang="scss" scoped>
.quantity {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 1.5rem;

	svg {
		cursor: pointer;
		user-select: none;
		opacity: 0.5;
		transition: opacity 0.3s;
		background-color: var(--accent1);
		height: 2rem;
		width: 2rem;
		border-radius: 50%;

		&:hover {
			opacity: 1;
		}
	}
}
</style>
