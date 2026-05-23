import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { BudgetCreateScreen } from "../screens/BudgetCreateScreen";
import { BudgetIndexScreen } from "../screens/BudgetIndexScreen";
import { BudgetListScreen } from "../screens/BudgetListScreen";
import { useBudgetStore } from "../stores/BudgetStore";

export type BudgetStackParamList = {
	BudgetIndex: undefined;
	BudgetCreate: undefined;
	BudgetList: undefined;
};

const Stack = createNativeStackNavigator();

export const BudgetStack = () => {
	const clearBudget = useBudgetStore((state) => state.clearBudget);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="BudgetIndex"
				component={BudgetIndexScreen}
				options={{ title: "Gerenciar Orçamentos" }}
			/>
			<Stack.Screen
				name="BudgetCreate"
				component={BudgetCreateScreen}
				options={{
					title: "Novo Orçamento",
					headerRight: () => (
						<TouchableOpacity onPress={clearBudget}>
							<MaterialCommunityIcons name="trash-can-outline" size={24} />
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name="BudgetList"
				component={BudgetListScreen}
				options={{ title: "Orçamentos Salvos" }}
			/>
		</Stack.Navigator>
	);
};
