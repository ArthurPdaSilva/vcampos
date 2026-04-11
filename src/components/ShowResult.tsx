import { StyleSheet, Text, View } from "react-native";
import type { CalculatedGlass } from "../types";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";

type ShowResultsProps = {
	res: CalculatedGlass;
	hideDetails: boolean;
};

export const ShowResult = ({ res, hideDetails }: ShowResultsProps) => {
	return (
		<View key={res.id} style={styles.resultCard}>
			<Text style={styles.title}>{res.name}</Text>

			{!hideDetails && (
				<View style={styles.details}>
					<Text>Preço Base: {formatCurrencyBRL(res.basePrice)}</Text>
					<Text>Gastos (75%): {formatCurrencyBRL(res.expenses)}</Text>
					<Text>Lucro (25%): {formatCurrencyBRL(res.profit)}</Text>
				</View>
			)}

			<Text style={styles.finalPrice}>
				Preço Final: {formatCurrencyBRL(res.finalPrice)}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	resultCard: {
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		borderLeftWidth: 5,
		borderLeftColor: "#4CAF50",
	},
	title: { fontWeight: "bold", fontSize: 18 },
	details: {
		marginVertical: 8,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#eee",
	},
	finalPrice: {
		fontWeight: "bold",
		color: "#2E7D32",
		fontSize: 16,
		marginTop: 5,
	},
});
