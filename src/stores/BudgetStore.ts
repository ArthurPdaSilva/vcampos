import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BudgetItem } from "../types";

interface BudgetState {
	budgetItems: BudgetItem[];
	discount: string;
	totalValue: number;
	setDiscount: (value: string) => void;
	clearBudget: () => void;
	addBudgetItem: (item: Omit<BudgetItem, "id">) => void;
	updateBudgetItemQuantity: (id: string, quantity: number) => void;
	updateBudgetItemDescription: (id: string, description: string) => void;
	removeBudgetItem: (id: string) => void;
	isGlassAlreadyInBudget: (glassId: string) => boolean;
}

export const useBudgetStore = create<BudgetState>()(
	persist(
		(set, get) => ({
			budgetItems: [],
			discount: "",
			totalValue: 0,

			setDiscount: (value) => {
				set({ discount: value });
			},

			clearBudget: () => {
				set({ budgetItems: [] });
			},

			addBudgetItem: (item) => {
				if (!get().isGlassAlreadyInBudget(item.glassId)) {
					set({
						budgetItems: [
							...get().budgetItems,
							{
								...item,
								id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
							},
						],
						totalValue: get().totalValue + item.finalValue,
					});
				}
			},

			updateBudgetItemQuantity: (id, quantity) => {
				set({
					budgetItems: get().budgetItems.map((item) =>
						item.id === id
							? { ...item, quantity, finalValue: item.value * quantity }
							: item,
					),
					totalValue: get().budgetItems.reduce((total, item) => {
						if (item.id === id) {
							return total + item.value * quantity;
						}
						return total + item.finalValue;
					}, 0),
				});
			},

			updateBudgetItemDescription: (id, description) => {
				set({
					budgetItems: get().budgetItems.map((item) =>
						item.id === id ? { ...item, description } : item,
					),
				});
			},

			removeBudgetItem: (id) => {
				set({
					budgetItems: get().budgetItems.filter((item) => item.id !== id),
					totalValue: get().budgetItems.reduce((total, item) => {
						if (item.id === id) {
							return total;
						}
						return total + item.finalValue;
					}, 0),
				});
			},

			isGlassAlreadyInBudget: (glassId) => {
				return get().budgetItems.some((item) => item.glassId === glassId);
			},
		}),
		{
			name: "budget-storage", // chave única no AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
