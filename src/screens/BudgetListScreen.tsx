import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { EmptyText } from "../components/EmptyText";
import { useBudgetStore } from "../stores/BudgetStore";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";
import { handleGenerateBudgetPdf } from "../utils/handleGenerateBudgetPdf";

export const BudgetListScreen = () => {
	const { budgets, deleteBudget } = useBudgetStore((state) => state);

	return (
		<View style={styles.container}>
			<FlatList
				data={budgets}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={<EmptyText text="Nenhum orçamento salvo." />}
				renderItem={({ item }) => {
					const discountValue = Number.parseFloat(
						item.discount.replace(",", ".") || "0",
					);
					const totalWithDiscount = item.totalValue - discountValue;

					return (
						<View style={styles.card}>
							<View style={styles.info}>
								<Text style={styles.title}>{item.name}</Text>
								<Text style={styles.subtitle}>Cliente: {item.clientName}</Text>
								<Text style={styles.subtitle}>Endereço: {item.address}</Text>
								<Text style={styles.totalValue}>
									Total: {formatCurrencyBRL(totalWithDiscount)}
								</Text>
							</View>
							<View style={styles.actions}>
								<CustomButton
									onPress={() =>
										handleGenerateBudgetPdf({
											budgetItems: item.items,
											discount: item.discount,
											totalValue: totalWithDiscount,
										})
									}
									style={styles.actionButton}
								>
									<MaterialIcons
										name="picture-as-pdf"
										size={24}
										color="#2196F3"
									/>
								</CustomButton>
								<CustomButton
									onPress={() => deleteBudget(item.id)}
									style={styles.actionButton}
								>
									<MaterialIcons name="delete" size={24} color="#F44336" />
								</CustomButton>
							</View>
						</View>
					);
				}}
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
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#2196F3",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	info: {
		flex: 1,
		marginRight: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 14,
		color: "#555",
		marginBottom: 2,
	},
	totalValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#2E7D32",
		marginTop: 4,
	},
	actions: {
		flexDirection: "row",
		gap: 8,
	},
	actionButton: {
		padding: 8,
		borderRadius: 8,
	},
});
