import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BudgetItem } from "../types";

interface BudgetState {
	budgetItems: BudgetItem[];
	discount: string;
	setDiscount: (value: string) => void;
	clearBudget: () => void;
	getTotalWithDiscount: () => number;
	getTotalBudgetValue: () => number;
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

			setDiscount: (value) => {
				set({ discount: value });
			},

			getTotalWithDiscount: () => {
				const total = get().getTotalBudgetValue();
				const discountValue = parseFloat(get().discount.replace(",", "."));
				if (!Number.isNaN(discountValue) && discountValue > 0) {
					return total - discountValue;
				}
				return total;
			},

			getTotalBudgetValue: () => {
				return get().budgetItems.reduce(
					(total, item) => total + item.finalValue,
					0,
				);
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
