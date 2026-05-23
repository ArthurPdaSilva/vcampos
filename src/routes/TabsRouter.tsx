import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GlassCalculationScreen } from "../features/glass/screens/GlassCalculationScreen";
import { GlassListScreen } from "../features/glass/screens/GlassListScreen";
import { GlassRegistrationScreen } from "../features/glass/screens/GlassRegistrationScreen";
import { BudgetStack } from "./BudgetStack";

const Tab = createBottomTabNavigator();

export const TabsRouter = () => {
	return (
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
					headerShown: false,
					tabBarIcon(props) {
						return (
							<MaterialCommunityIcons
								name="file-document-outline"
								size={props.size}
								color={props.color}
							/>
						);
					},
				}}
				component={BudgetStack}
			/>
		</Tab.Navigator>
	);
};
