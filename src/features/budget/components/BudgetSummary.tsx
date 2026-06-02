import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FormInput } from "../../../components/FormInput";
import { formatCurrencyBRL } from "../../../utils/formatCurrencyBRL";
import { useBudgetStore } from "../stores/BudgetStore";

export const BudgetSummary = () => {
	const { discount, description, setDescription, setDiscount, totalValue } =
		useBudgetStore((state) => state);

	const totalWithDiscount = useMemo(() => {
		const discountValue = Number.parseFloat(discount.replace(",", ".") || "0");
		return totalValue - discountValue;
	}, [discount, totalValue]);

	return (
		<View style={styles.summaryCard}>
			<Text style={styles.sectionTitle}>Resumo do Orçamento</Text>
			<View style={styles.fieldGroup}>
				<FormInput
					label="Desconto em R$"
					placeholder="0,00"
					keyboardType="numeric"
					value={discount}
					onChangeText={setDiscount}
				/>
			</View>
			<View style={styles.fieldGroup}>
				<FormInput
					label="Descrição do Orçamento"
					placeholder="Ex: Manual de Uso, Instalação, etc."
					keyboardType="default"
					value={description}
					onChangeText={setDescription}
				/>
			</View>
			<View style={styles.totalContainer}>
				<Text style={styles.totalLabel}>Valor Total</Text>
				<Text style={styles.totalValue}>
					{formatCurrencyBRL(totalWithDiscount)}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	summaryCard: {
		paddingHorizontal: 15,
		paddingTop: 12,
		paddingBottom: 6,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#4CAF50",
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
		marginBottom: 8,
	},
	fieldGroup: {
		marginBottom: 8,
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: "#E0E0E0",
		marginTop: 4,
		paddingBottom: 4,
	},
	totalLabel: {
		fontSize: 17,
		fontWeight: "bold",
		color: "black",
	},
	totalValue: {
		fontSize: 17,
		fontWeight: "bold",
		color: "#2E7D32",
	},
});
