export type GlassType = "Temperado" | "Comum";

export type Glass = {
	id: string;
	name: string;
	type: GlassType;
	price: number;
};

export type CalculatedGlass = Glass & {
	basePrice: number;
	expenses: number;
	profit: number;
	finalPrice: number;
};

export const GLASS_SHEET_SIZE = 3.38;
export const EXPENSES_PERCENTAGE = 0.75;
export const PROFIT_PERCENTAGE = 0.25;
