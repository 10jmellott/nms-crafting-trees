export type Ingredient = {
	name: string;
	quantity: number;
}

export type Recipe = {
	name: string;
	icon: string;
	ingredients?: Ingredient[];
}

export default Recipe;
