import { FlatList, StyleSheet, View } from "react-native";
import { BudgetItem } from "../components/BudgetItem";
import { EmptyText } from "../components/EmptyText";
import { useBudgetStore } from "../stores/BudgetStore";

export const BudgetListScreen = () => {
	const { budgets } = useBudgetStore((state) => state);

	return (
		<View style={styles.container}>
			<FlatList
				data={budgets}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={<EmptyText text="Nenhum orçamento salvo." />}
				renderItem={({ item }) => <BudgetItem item={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		backgroundColor: "#F5F5F5",
	},
});
