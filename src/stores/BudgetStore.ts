import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { BudgetItem } from "../types";

interface BudgetState {
	budgetItems: BudgetItem[];
	clearBudget: () => void;
	getTotalBudgetValue: () => number;
	addBudgetItem: (item: Omit<BudgetItem, "id">) => void;
	updateBudgetItemQuantity: (id: string, quantity: number) => void;
	updateBudgetItemDescription: (id: string, description: string) => void;
	removeBudgetItem: (id: string) => void;
}

export const useBudgetStore = create<BudgetState>()(
	persist(
		(set, get) => ({
			budgetItems: [],

			getTotalBudgetValue: () => {
				return get().budgetItems.reduce(
					(total, item) => total + item.finalValue * item.quantity,
					0,
				);
			},

			clearBudget: () => {
				set({ budgetItems: [] });
			},

			addBudgetItem: (item) => {
				set({
					budgetItems: [
						...get().budgetItems,
						{
							...item,
							id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
						},
					],
				});
			},

			updateBudgetItemQuantity: (id, quantity) => {
				set({
					budgetItems: get().budgetItems.map((item) =>
						item.id === id ? { ...item, quantity } : item,
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
		}),
		{
			name: "budget-storage", // chave única no AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
