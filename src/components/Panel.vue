<script setup lang="ts">
defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="panel">
		<h2 class="panel__title">{{ title }}</h2>
		<slot name="subheader"></slot>
		<div class="panel__content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.panel {
	position: relative;
	background-color: rgba(var(--background-values), 0.8);
	border-radius: 6px;
	backdrop-filter: blur(12px);
	box-shadow: 0 0 8px black;
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	&__title {
		text-align: center;
		font-weight: bold;
		font-size: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.2rem;
	}

	&__content {
		overflow-y: auto;
		flex-grow: 1;
		width: 100%;
	}
}
</style>
