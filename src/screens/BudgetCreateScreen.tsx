import { useMemo, useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { BudgetListItem } from "../components/BudgetListItem";
import { CustomButton } from "../components/CustomButton";
import { EmptyText } from "../components/EmptyText";
import { FormInput } from "../components/FormInput";
import { SaveBudget } from "../components/SaveBudget";
import { useBudgetStore } from "../stores/BudgetStore";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";
import { handleGenerateBudgetPdf } from "../utils/handleGenerateBudgetPdf";

export const BudgetCreateScreen = () => {
	const [saveModalVisible, setSaveModalVisible] = useState(false);
	const { budgetItems, discount, setDiscount, totalValue } = useBudgetStore(
		(state) => state,
	);

	const totalWithDiscount = useMemo(() => {
		const discountValue = Number.parseFloat(discount.replace(",", ".") || "0");
		return totalValue - discountValue;
	}, [discount, totalValue]);

	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidingContainer}
			behavior="padding"
		>
			<View style={styles.container}>
				<FlatList
					data={budgetItems}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <BudgetListItem item={item} />}
					ListEmptyComponent={
						<EmptyText text="Nenhum item adicionado ao orçamento. Use a calculadora para adicionar itens." />
					}
				/>
				{budgetItems.length !== 0 && (
					<>
						<View style={styles.discountContainer}>
							<FormInput
								label="Desconto em R$"
								placeholder="0,00"
								keyboardType="numeric"
								value={discount}
								onChangeText={setDiscount}
							/>
						</View>
						<View style={styles.totalContainer}>
							<Text style={styles.totalLabel}>Valor Total:</Text>
							<Text style={styles.totalValue}>
								{formatCurrencyBRL(totalWithDiscount)}
							</Text>
						</View>
					</>
				)}

				<CustomButton
					title="Gerar Orçamento"
					style={{ marginTop: 10 }}
					onPress={() =>
						handleGenerateBudgetPdf({
							budgetItems,
							discount,
							totalValue: totalWithDiscount,
						})
					}
				/>
				<CustomButton
					title="Salvar Orçamento"
					style={{ marginTop: 10, backgroundColor: "#4CAF50" }}
					onPress={() => setSaveModalVisible(true)}
				/>
			</View>
			<SaveBudget
				visible={saveModalVisible}
				onClose={() => setSaveModalVisible(false)}
			/>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	keyboardAvoidingContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 12,
		backgroundColor: "#F5F5F5",
	},

	discountContainer: {
		paddingHorizontal: 15,
		paddingTop: 8,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#4CAF50",
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#4CAF50",
	},
	totalLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black",
	},
	totalValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#2E7D32",
	},
});
