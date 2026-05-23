import { MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import type { CalculatedGlass } from "../../../types";
import { formatCurrencyBRL } from "../../../utils/formatCurrencyBRL";
import { useBudgetStore } from "../../budget/stores/BudgetStore";

type CalculationItemProps = {
	res: CalculatedGlass;
	hideDetails: boolean;
};

export const CalculationItem = ({ res, hideDetails }: CalculationItemProps) => {
	const { addBudgetItem } = useBudgetStore((state) => state);

	const handleAddToBudget = () => {
		addBudgetItem({
			glassId: res.id,
			description: res.name,
			value: res.finalPrice,
			finalValue: res.finalPrice,
			quantity: 1,
			dimensions: res.dimensions,
		});
		Alert.alert("Sucesso", "Item adicionado ao orçamento!");
	};

	return (
		<View key={res.id} style={styles.resultCard}>
			<View style={styles.header}>
				<Text style={styles.title}>{res.name}</Text>
				<CustomButton
					onPress={handleAddToBudget}
					style={styles.addButton}
					accessibilityLabel="Adicionar ao orçamento"
				>
					<MaterialIcons name="add-circle" size={24} color="#2E7D32" />
				</CustomButton>
			</View>

			{!hideDetails && res.type !== "Outro" && (
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
			<Text style={styles.dimensionsText}>
				Dimensões: {res.dimensions.width}cm x {res.dimensions.height}cm
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	dimensionsText: {
		color: "#666",
		fontSize: 12,
		marginTop: 5,
	},
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
