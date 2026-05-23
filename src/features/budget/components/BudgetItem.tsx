import { MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import type { Budget } from "../../../types";
import { formatCurrencyBRL } from "../../../utils/formatCurrencyBRL";
import { useBudgetStore } from "../stores/BudgetStore";
import { handleGenerateBudgetPdf } from "../utils/handleGenerateBudgetPdf";

export const BudgetItem = ({ item }: { item: Budget }) => {
	const { deleteBudget } = useBudgetStore((state) => state);

	const handleDelete = () => {
		deleteBudget(item.id);
		Alert.alert("Sucesso", "Orçamento excluído da lista!");
	};

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
					<MaterialIcons name="picture-as-pdf" size={24} color="#2196F3" />
				</CustomButton>
				<CustomButton onPress={handleDelete} style={styles.actionButton}>
					<MaterialIcons name="delete" size={24} color="#F44336" />
				</CustomButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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
