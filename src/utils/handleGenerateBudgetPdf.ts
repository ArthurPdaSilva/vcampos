import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import type { BudgetItem } from "../types";
import { buildBudgetPdfHtml } from "./buildBudgetPdfHtml";

type HandleGenerateBudgetPdfParams = {
	budgetItems: BudgetItem[];
	discount: string;
	totalValue: number;
};

export const handleGenerateBudgetPdf = async ({
	budgetItems,
	discount,
	totalValue,
}: HandleGenerateBudgetPdfParams) => {
	if (budgetItems.length === 0) {
		Alert.alert("Orçamento vazio", "Adicione itens antes de gerar o PDF.");
		return;
	}

	try {
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
	} catch {
		Alert.alert("Erro", "Não foi possível gerar o PDF do orçamento.");
	}
};
