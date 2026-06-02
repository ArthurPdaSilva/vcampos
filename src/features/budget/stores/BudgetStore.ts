import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Budget, BudgetItem } from "../../../types";

interface BudgetState {
	budgetItems: BudgetItem[];
	budgets: Budget[];
	discount: string;
	totalValue: number;
	description: string;
	setDescription: (value: string) => void;
	setDiscount: (value: string) => void;
	clearBudget: () => void;
	loadBudget: (budget: Budget) => void;
	addBudgetItem: (item: Omit<BudgetItem, "id">) => void;
	updateBudgetItemQuantity: (id: string, quantity: number) => void;
	updateBudgetItemDescription: (id: string, description: string) => void;
	removeBudgetItem: (id: string) => void;
	saveBudget: (budget: Omit<Budget, "id">) => void;
	updateBudget: (budget: Budget) => void;
	deleteBudget: (id: string) => void;
}

export const useBudgetStore = create<BudgetState>()(
	persist(
		(set, get) => ({
			budgetItems: [],
			budgets: [],
			discount: "",
			totalValue: 0,
			description: "",

			setDescription: (value) => {
				set({ description: value });
			},

			setDiscount: (value) => {
				set({ discount: value });
			},

			clearBudget: () => {
				set({ budgetItems: [], discount: "", totalValue: 0, description: "" });
			},

			loadBudget: (budget) => {
				set({
					budgetItems: budget.items,
					discount: budget.discount,
					totalValue: budget.totalValue,
					description: budget.description,
				});
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
					totalValue: get().totalValue + item.finalValue,
				});
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

			saveBudget: (budget) => {
				set({
					budgets: [
						...get().budgets,
						{
							...budget,
							id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
						},
					],
				});
			},

			updateBudget: (budget) => {
				set({
					budgets: get().budgets.map((currentBudget) =>
						currentBudget.id === budget.id ? budget : currentBudget,
					),
				});
			},
			deleteBudget: (id) => {
				set({
					budgets: get().budgets.filter((budget) => budget.id !== id),
				});
			},
		}),
		{
			name: "budget-storage", // chave única no AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
