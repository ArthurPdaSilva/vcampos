import { MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBudgetStore } from "../stores/BudgetStore";
import type { CalculatedGlass } from "../types";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";

type CalculationItemProps = {
	res: CalculatedGlass;
	hideDetails: boolean;
};

export const CalculationItem = ({ res, hideDetails }: CalculationItemProps) => {
	const { addBudgetItem, isGlassAlreadyInBudget } = useBudgetStore(
		(state) => state,
	);

	const handleAddToBudget = () => {
		if (isGlassAlreadyInBudget(res.id)) {
			Alert.alert("Aviso", "Este item já foi adicionado ao orçamento!");
			return;
		}

		addBudgetItem({
			glassId: res.id,
			description: res.name,
			value: res.finalPrice,
			finalValue: res.finalPrice,
			quantity: 1,
		});
		Alert.alert("Sucesso", "Item adicionado ao orçamento!");
	};

	return (
		<View key={res.id} style={styles.resultCard}>
			<View style={styles.header}>
				<Text style={styles.title}>{res.name}</Text>
				<TouchableOpacity
					onPress={handleAddToBudget}
					style={styles.addButton}
					accessibilityLabel="Adicionar ao orçamento"
				>
					<MaterialIcons name="add-circle" size={24} color="#2E7D32" />
				</TouchableOpacity>
			</View>

			{!hideDetails && (
				<View style={styles.details}>
					<Text style={styles.detailText}>
						Preço Base: {formatCurrencyBRL(res.basePrice)}
					</Text>
					<Text style={styles.detailText}>
						Gastos (75%): {formatCurrencyBRL(res.expenses)}
					</Text>
					<Text style={styles.detailText}>
						Lucro (25%): {formatCurrencyBRL(res.profit)}
					</Text>
				</View>
			)}

			<Text style={styles.finalPrice}>
				Preço Final: {formatCurrencyBRL(res.finalPrice)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	resultCard: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#4CAF50",
	},
	title: { fontWeight: "bold", fontSize: 18, color: "#000" },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	addButton: {
		padding: 2,
	},
	details: {
		marginVertical: 8,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#eee",
	},
	detailText: {
		color: "#000",
	},
	finalPrice: {
		fontWeight: "bold",
		color: "#2E7D32",
		fontSize: 16,
		marginTop: 5,
	},
});
