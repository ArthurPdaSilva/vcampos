import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Glass, GlassUpdate } from "../types";

// Definição da interface do Store
interface GlassState {
	glasses: Glass[];
	addGlass: (glass: Glass) => void;
	updateGlass: (update: GlassUpdate) => void;
	removeGlass: (id: string) => void;
}

export const useGlassStore = create<GlassState>()(
	persist(
		(set, get) => ({
			glasses: [],

			addGlass: (newGlass) => {
				set({ glasses: [...get().glasses, newGlass] });
			},

			updateGlass: (update) => {
				set({
					glasses: get().glasses.map((g) =>
						g.id === update.id ? { ...g, ...update } : g,
					),
				});
			},

			removeGlass: (id) => {
				set({ glasses: get().glasses.filter((g) => g.id !== id) });
			},
		}),
		{
			name: "glass-storage", // chave única no AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
