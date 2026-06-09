import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import type { Budget } from "../../../types";
import { buildBudgetPdfHtml } from "./buildBudgetPdfHtml";

type HandleGenerateBudgetPdfProps = Pick<
	Budget,
	"items" | "discount" | "totalValue" | "description"
>;

export const handleGenerateBudgetPdf = async ({
	items,
	discount,
	totalValue,
	description,
}: HandleGenerateBudgetPdfProps) => {
	if (items.length === 0) {
		Alert.alert("Orçamento vazio", "Adicione itens antes de gerar o PDF.");
		return;
	}

	try {
		const html = buildBudgetPdfHtml({
			items,
			discount,
			totalValue,
			description,
		});
		
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
	} catch (error: unknown) {
		if (error instanceof Error) {
			Alert.alert("Ocorreu um erro!", error.message);
		}

		Alert.alert("Ocorreu um erro!", String(error));
	}
};
