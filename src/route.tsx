import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { BudgetScreen } from "./screens/BudgetScreen";
import { GlassCalculationScreen } from "./screens/GlassCalculationScreen";
import { GlassListScreen } from "./screens/GlassListScreen";
import { GlassRegistrationScreen } from "./screens/GlassRegistrationScreen";
import { useBudgetStore } from "./stores/BudgetStore";

const Tab = createBottomTabNavigator();

export const Route = () => {
	const clearBudget = useBudgetStore((state) => state.clearBudget);

	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Cálculo"
					options={{
						tabBarIcon(props) {
							return (
								<MaterialCommunityIcons
									name="calculator"
									size={props.size}
									color={props.color}
								/>
							);
						},
					}}
					component={GlassCalculationScreen}
				/>
				<Tab.Screen
					name="Cadastro"
					options={{
						tabBarIcon(props) {
							return (
								<MaterialCommunityIcons
									name="plus-circle"
									size={props.size}
									color={props.color}
								/>
							);
						},
					}}
					component={GlassRegistrationScreen}
				/>
				<Tab.Screen
					name="Estoque"
					options={{
						tabBarIcon(props) {
							return (
								<MaterialCommunityIcons
									name="archive"
									size={props.size}
									color={props.color}
								/>
							);
						},
					}}
					component={GlassListScreen}
				/>
				<Tab.Screen
					name="Orçamento"
					options={{
						tabBarIcon(props) {
							return (
								<MaterialCommunityIcons
									name="file-document-outline"
									size={props.size}
									color={props.color}
								/>
							);
						},
						headerRight: () => (
							<TouchableOpacity
								onPress={clearBudget}
								style={{ marginRight: 16 }}
							>
								<MaterialCommunityIcons name="trash-can-outline" size={24} />
							</TouchableOpacity>
						),
					}}
					component={BudgetScreen}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};
