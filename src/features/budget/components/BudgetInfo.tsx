import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import type { Budget } from "../../../types";
import { formatCurrencyBRL } from "../../../utils/formatCurrencyBRL";

type BudgetInfoProps = {
	visible: boolean;
	item: Budget;
	onClose: () => void;
};

export const BudgetInfo = ({ visible, item, onClose }: BudgetInfoProps) => {
	return (
		<Modal visible={visible} transparent={true} animationType="fade">
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<Text style={styles.modalTitle}>Itens do Orçamento</Text>
					<ScrollView style={styles.modalScroll}>
						{item.items.map((i) => (
							<View key={i.id} style={styles.modalItemCard}>
								<Text style={styles.modalItemText}>
									<Text style={styles.bold}>Descrição:</Text> {i.description}
								</Text>
								<Text style={styles.modalItemText}>
									<Text style={styles.bold}>Quantidade:</Text> {i.quantity}
								</Text>
								<View style={styles.modalItemRow}>
									<Text style={styles.modalItemText}>
										<Text style={styles.bold}>Valor Unitário:</Text>{" "}
										{formatCurrencyBRL(i.value)}
									</Text>
									<Text style={[styles.modalItemText, styles.finalValueText]}>
										<Text style={styles.bold}>Valor Final:</Text>{" "}
										{formatCurrencyBRL(i.finalValue)}
									</Text>
								</View>
								<Text style={styles.modalItemText}>
									<Text style={styles.bold}>Dimensões:</Text>{" "}
									{i.dimensions.width}cm x {i.dimensions.height}cm
								</Text>
							</View>
						))}
					</ScrollView>
					{(item.description ?? "").trim().length > 0 && (
						<View style={styles.descriptionContainer}>
							<Text style={styles.bold}>Descrição do Orçamento:</Text>
							<Text style={styles.descriptionText}>
								{item.description ?? ""}
							</Text>
						</View>
					)}
					<CustomButton onPress={onClose} style={styles.closeButton}>
						<Text style={styles.closeButtonText}>Fechar</Text>
					</CustomButton>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		width: "90%",
		maxHeight: "80%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
		color: "#333",
	},
	modalScroll: {
		marginBottom: 15,
	},
	modalItemCard: {
		backgroundColor: "#f9f9f9",
		borderRadius: 8,
		padding: 12,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	modalItemText: {
		fontSize: 14,
		color: "#444",
		marginBottom: 4,
	},
	modalItemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	bold: {
		fontWeight: "bold",
	},
	finalValueText: {
		color: "#2E7D32",
	},
	descriptionContainer: {
		marginBottom: 12,
		padding: 10,
		backgroundColor: "#FAFAFA",
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#EEE",
	},
	descriptionText: {
		color: "#444",
		marginTop: 6,
		fontSize: 14,
	},
	closeButton: {
		backgroundColor: "#2196F3",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	closeButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
});
