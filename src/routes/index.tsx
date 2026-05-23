import { NavigationContainer } from "@react-navigation/native";
import { TabsRouter } from "./TabsRouter";

export const Route = () => {
	return (
		<NavigationContainer>
			<TabsRouter />
		</NavigationContainer>
	);
};
