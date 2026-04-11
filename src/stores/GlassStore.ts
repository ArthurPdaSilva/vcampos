import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Glass } from "../types";

// Definição da interface do Store
interface GlassState {
	glasses: Glass[];
	addGlass: (glass: Glass) => void;
	removeGlass: (id: string) => void;
}

export const useGlassStore = create<GlassState>()(
	persist(
		(set, get) => ({
			glasses: [],

			addGlass: (newGlass) => {
				set({ glasses: [...get().glasses, newGlass] });
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
