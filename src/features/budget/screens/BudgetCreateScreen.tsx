import { useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import { EmptyText } from "../../../components/EmptyText";
import { BudgetListItem } from "../components/BudgetListItem";
import { BudgetSummary } from "../components/BudgetSummary";
import { SaveBudget } from "../components/SaveBudget";
import { useBudgetStore } from "../stores/BudgetStore";
import { handleGenerateBudgetPdf } from "../utils/handleGenerateBudgetPdf";

export const BudgetCreateScreen = () => {
	const [saveModalVisible, setSaveModalVisible] = useState(false);
	const { budgetItems, discount, totalValue, description } = useBudgetStore(
		(state) => state,
	);

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
				{budgetItems.length !== 0 && <BudgetSummary />}

				<CustomButton
					title="Gerar Orçamento"
					style={{ marginTop: 10 }}
					onPress={() =>
						handleGenerateBudgetPdf({
							items: budgetItems,
							discount,
							totalValue,
							description,
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
});
