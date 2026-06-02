import { getEnvNumber } from "./utils/getEnvNumber";

export type GlassType = "Temperado" | "Comum" | "Outro";

export type Glass = {
	id: string;
	name: string;
	type: GlassType;
	price: number;
};

export type Dimensions = {
	height: number;
	width: number;
};

export type GlassUpdate = Omit<Glass, "type">;

export type CalculatedGlass = Glass & {
	basePrice: number;
	expenses: number;
	profit: number;
	finalPrice: number;
	dimensions: Dimensions;
};

export type BudgetItem = {
	id: string;
	glassId: string;
	description: string;
	quantity: number;
	value: number;
	finalValue: number;
	dimensions: Dimensions;
};

export type Budget = {
	id: string;
	items: BudgetItem[];
	discount: string;
	totalValue: number;
	name: string;
	clientName: string;
	address: string;
	description: string;
};

export const GLASS_SHEET_SIZE = getEnvNumber(
	process.env.EXPO_PUBLIC_GLASS_SHEET_SIZE,
	3.38,
);
export const EXPENSES_PERCENTAGE = getEnvNumber(
	process.env.EXPO_PUBLIC_EXPENSES_PERCENTAGE,
	0.75,
);
export const PROFIT_PERCENTAGE = getEnvNumber(
	process.env.EXPO_PUBLIC_PROFIT_PERCENTAGE,
	0.25,
);
