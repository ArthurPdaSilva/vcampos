import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import type { BudgetStackParamList } from "../../../routes/BudgetStack";
import type { Budget } from "../../../types";
import { BudgetStatus } from "../../../types";
import { formatCurrencyBRL } from "../../../utils/formatCurrencyBRL";
import { useBudgetStore } from "../stores/BudgetStore";
import { handleGenerateBudgetPdf } from "../utils/handleGenerateBudgetPdf";
import { BudgetInfo } from "./BudgetInfo";

export const BudgetItem = ({ item }: { item: Budget }) => {
	const { deleteBudget, updateBudget } = useBudgetStore((state) => state);
	const navigation =
		useNavigation<NativeStackNavigationProp<BudgetStackParamList>>();
	const [modalVisible, setModalVisible] = useState(false);

	const handleDelete = () => {
		Alert.alert(
			"Excluir orçamento",
			"Tem certeza que deseja excluir este orçamento?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Excluir",
					style: "destructive",
					onPress: () => {
						deleteBudget(item.id);
						Alert.alert("Sucesso", "Orçamento excluído da lista!");
					},
				},
			],
		);
	};

	const handleToggleStatus = () => {
		const newStatus =
			item.status === BudgetStatus.Finalizado
				? BudgetStatus.EmAberto
				: BudgetStatus.Finalizado;

		updateBudget({ ...item, status: newStatus });
	};

	const discountValue = Number.parseFloat(
		item.discount.replace(",", ".") || "0",
	);
	const totalWithDiscount = item.totalValue - discountValue;

	const isFinished = item.status === BudgetStatus.Finalizado;

	return (
		<View style={styles.card}>
			{/* Informações principais */}
			<View style={styles.info}>
				<Text style={styles.title}>{item.name}</Text>
				<Text style={styles.subtitle}>
					<MaterialIcons name="person-outline" size={13} color="#888" />{" "}
					{item.clientName}
				</Text>
				<Text style={styles.subtitle}>
					<MaterialIcons name="place" size={13} color="#888" /> {item.address}
				</Text>
				<Text style={styles.totalValue}>
					{formatCurrencyBRL(totalWithDiscount)}
				</Text>
			</View>

			{/* Rodapé com ações */}
			<View style={styles.footer}>
				{/* Lado esquerdo: badge de status + ações secundárias */}
				<View style={styles.footerLeft}>
					{/* Badge de status clicável */}
					<TouchableOpacity
						onPress={handleToggleStatus}
						style={[
							styles.statusBadge,
							isFinished ? styles.badgeDone : styles.badgeOpen,
						]}
						activeOpacity={0.7}
					>
						<MaterialIcons
							name={isFinished ? "check-circle" : "schedule"}
							size={13}
							color={isFinished ? "#2E7D32" : "#E65100"}
						/>
						<Text
							style={[
								styles.statusText,
								{ color: isFinished ? "#2E7D32" : "#E65100" },
							]}
						>
							{isFinished ? "Finalizado" : "Em aberto"}
						</Text>
					</TouchableOpacity>

					<View style={styles.divider} />

					{/* Visualizar */}
					<CustomButton
						onPress={() => setModalVisible(true)}
						style={styles.iconBtn}
					>
						<MaterialIcons name="visibility" size={20} color="#888780" />
					</CustomButton>

					{/* Gerar PDF */}
					<CustomButton
						onPress={() =>
							handleGenerateBudgetPdf({
								items: item.items,
								discount: item.discount,
								totalValue: item.totalValue,
								description: item.description,
							})
						}
						style={styles.iconBtn}
					>
						<MaterialIcons name="picture-as-pdf" size={20} color="#2196F3" />
					</CustomButton>

					{/* Editar */}
					<CustomButton
						onPress={() => navigation.navigate("BudgetEdit", { id: item.id })}
						style={[styles.iconBtn, styles.iconBtnEdit]}
					>
						<MaterialIcons name="edit" size={20} color="#1565C0" />
					</CustomButton>
				</View>

				{/* Lado direito: deletar isolado */}
				<CustomButton
					onPress={handleDelete}
					style={[styles.iconBtn, styles.iconBtnDelete]}
				>
					<MaterialIcons name="delete" size={20} color="#C62828" />
				</CustomButton>
			</View>

			<BudgetInfo
				visible={modalVisible}
				item={item}
				onClose={() => setModalVisible(false)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		borderLeftWidth: 4,
		borderLeftColor: "#2196F3",
	},
	info: {
		marginBottom: 4,
	},
	title: {
		fontSize: 16,
		fontWeight: "500",
		color: "#000",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 13,
		color: "#555",
		marginBottom: 2,
	},
	totalValue: {
		fontSize: 16,
		fontWeight: "500",
		color: "#2E7D32",
		marginTop: 6,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 12,
		paddingTop: 10,
		borderTopWidth: 0.5,
		borderTopColor: "#E0E0E0",
	},
	footerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	statusBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 8,
	},
	badgeOpen: {
		backgroundColor: "#FFF3E0",
	},
	badgeDone: {
		backgroundColor: "#E8F5E9",
	},
	statusText: {
		fontSize: 12,
		fontWeight: "500",
	},
	divider: {
		width: 0.5,
		height: 20,
		backgroundColor: "#E0E0E0",
		marginHorizontal: 2,
	},
	iconBtn: {
		width: 36,
		height: 36,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 0.5,
		borderColor: "#E0E0E0",
		backgroundColor: "#fff",
	},
	iconBtnEdit: {
		backgroundColor: "#E3F2FD",
		borderColor: "#BBDEFB",
	},
	iconBtnDelete: {
		backgroundColor: "#FFEBEE",
		borderColor: "#FFCDD2",
	},
});
