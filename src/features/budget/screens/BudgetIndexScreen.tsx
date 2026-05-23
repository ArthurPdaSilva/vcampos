import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import type { BudgetStackParamList } from "../../../routes/BudgetStack";

export const BudgetIndexScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Gerenciar Orçamentos</Text>

			<CustomButton
				title="Novo Orçamento"
				onPress={() => navigation.navigate("BudgetCreate")}
				style={styles.button}
			/>
			<CustomButton
				title="Orçamentos Salvos"
				onPress={() => navigation.navigate("BudgetList")}
				style={[styles.button, { backgroundColor: "#607D8B" }]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5F5F5",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
		color: "#333",
	},
	button: {
		width: "100%",
		marginBottom: 15,
	},
});
