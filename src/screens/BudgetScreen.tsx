import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useMemo } from "react";
import {
	Alert,
	FlatList,
	KeyboardAvoidingView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { BudgetListItem } from "../components/BudgetListItem";
import { FormInput } from "../components/FormInput";
import { PrimaryButton } from "../components/PrimaryButton";
import { useBudgetStore } from "../stores/BudgetStore";
import { buildBudgetPdfHtml } from "../utils/buildBudgetPdfHtml";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";

export const BudgetScreen = () => {
	const {
		budgetItems,
		clearBudget,
		discount,
		setDiscount,
		getTotalBudgetValue,
	} = useBudgetStore((state) => state);

	const totalWithDiscount = useMemo(() => {
		const discountValue = Number.parseFloat(discount.replace(",", ".") || "0");
		return getTotalBudgetValue() - discountValue;
	}, [discount, getTotalBudgetValue]);

	const handleGenerateBudgetPdf = async () => {
		if (budgetItems.length === 0) {
			Alert.alert("Orçamento vazio", "Adicione itens antes de gerar o PDF.");
			return;
		}

		try {
			const totalValue = getTotalBudgetValue();
			const html = buildBudgetPdfHtml({ budgetItems, discount, totalValue });
			const { uri } = await Print.printToFileAsync({ html });

			const canShare = await Sharing.isAvailableAsync();
			if (!canShare) {
				Alert.alert("PDF gerado", `Arquivo salvo em: ${uri}`);
				return;
			}

			await Sharing.shareAsync(uri, {
				mimeType: "application/pdf",
				dialogTitle: "Baixar/Compartilhar orçamento",
				UTI: "com.adobe.pdf",
			});

			clearBudget();
		} catch {
			Alert.alert("Erro", "Não foi possível gerar o PDF do orçamento.");
		}
	};

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
						<Text style={styles.emptyText}>
							Nenhum item no orçamento. Adicione na tela de Cálculo.
						</Text>
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

				<PrimaryButton
					title="Gerar Orçamento"
					onPress={handleGenerateBudgetPdf}
				/>
			</View>
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
	emptyText: {
		textAlign: "center",
		color: "#666",
		marginTop: 40,
		fontSize: 16,
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
