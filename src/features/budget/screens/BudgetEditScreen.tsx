import { type RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import { EmptyText } from "../../../components/EmptyText";
import type { BudgetStackParamList } from "../../../routes/BudgetStack";
import { BudgetListItem } from "../components/BudgetListItem";
import { BudgetSummary } from "../components/BudgetSummary";
import { EditBudget } from "../components/EditBudget";
import { useBudgetStore } from "../stores/BudgetStore";
import { handleGenerateBudgetPdf } from "../utils/handleGenerateBudgetPdf";

type BudgetEditRouteProp = RouteProp<BudgetStackParamList, "BudgetEdit">;

export const BudgetEditScreen = () => {
	const route = useRoute<BudgetEditRouteProp>();
	const budgetId = route.params.id;
	const [saveModalVisible, setSaveModalVisible] = useState(false);
	const {
		budgets,
		budgetItems,
		discount,
		totalValue,
		description,
		loadBudget,
	} = useBudgetStore((state) => state);

	const budget = budgets.find((item) => item.id === budgetId) ?? null;

	useEffect(() => {
		if (!budget) return;
		loadBudget(budget);
	}, [budget, loadBudget]);

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
						<EmptyText text="Nenhum item adicionado ao orçamento." />
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
					title="Salvar Alterações"
					style={{ marginTop: 10, backgroundColor: "#4CAF50" }}
					onPress={() => setSaveModalVisible(true)}
				/>
			</View>
			{budget && (
				<EditBudget
					visible={saveModalVisible}
					onClose={() => setSaveModalVisible(false)}
					budget={budget}
				/>
			)}
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
});
