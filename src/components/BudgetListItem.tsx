import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useBudgetStore } from "../stores/BudgetStore";
import type { BudgetItem } from "../types";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";

import { CustomButton } from "./CustomButton";

export const BudgetListItem = ({ item }: { item: BudgetItem }) => {
	const {
		removeBudgetItem,
		updateBudgetItemQuantity,
		updateBudgetItemDescription,
	} = useBudgetStore((state) => state);

	return (
		<View style={styles.card}>
			<View style={styles.topRow}>
				<Text style={styles.label}>Descrição</Text>
				<CustomButton onPress={() => removeBudgetItem(item.id)}>
					<MaterialIcons name="delete" size={20} color="#F44336" />
				</CustomButton>
			</View>

			<TextInput
				style={styles.input}
				value={item.description}
				onChangeText={(text) => updateBudgetItemDescription(item.id, text)}
				placeholder="Descrição do item"
			/>

			<Text style={styles.label}>Quantidade</Text>
			<TextInput
				style={styles.input}
				value={String(item.quantity)}
				onChangeText={(text) => {
					const quantity = Number.parseInt(text, 10) | 0;
					updateBudgetItemQuantity(item.id, quantity);
				}}
				placeholder="Quantidade"
				keyboardType="numeric"
			/>

			<View style={styles.valuesRow}>
				<View style={styles.valueBox}>
					<Text style={styles.label}>Valor</Text>
					<Text style={styles.valueText}>{formatCurrencyBRL(item.value)}</Text>
				</View>
				<View style={styles.valueBox}>
					<Text style={styles.label}>Valor Final</Text>
					<Text style={styles.finalValueText}>
						{formatCurrencyBRL(item.finalValue)}
					</Text>
				</View>
			</View>
			{item.dimensions && (
				<Text style={styles.dimensionsText}>
					Dimensões: {item.dimensions.width}cm x {item.dimensions.height}cm
				</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	dimensionsText: {
		color: "#666",
		fontSize: 12,
		marginTop: 8,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 12,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#4CAF50",
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	label: {
		fontWeight: "600",
		color: "#333",
		marginBottom: 4,
	},
	input: {
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 8,
		color: "#000",
		backgroundColor: "#FFF",
		marginBottom: 10,
	},
	valuesRow: {
		flexDirection: "row",
		gap: 10,
	},
	valueBox: {
		flex: 1,
		backgroundColor: "#FAFAFA",
		borderRadius: 8,
		padding: 10,
	},
	valueText: {
		fontSize: 16,
		color: "#222",
	},
	finalValueText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#2E7D32",
	},
});
