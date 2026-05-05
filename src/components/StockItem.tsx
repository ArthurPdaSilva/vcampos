import { MaterialIcons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGlassStore } from "../stores/GlassStore";
import type { Glass } from "../types";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";

type StockItemProps = {
	setSelectedGlass: (glass: Glass) => void;
	setIsUpdateModalVisible: (visible: boolean) => void;
	item: Glass;
};

export const StockItem = ({
	item,
	setIsUpdateModalVisible,
	setSelectedGlass,
}: StockItemProps) => {
	const { removeGlass } = useGlassStore((state) => state);

	const handleRemove = (id: string) => {
		removeGlass(id);
		Alert.alert("Sucesso", "Item removido!");
	};

	const handleOpenUpdate = (glass: Glass) => {
		setSelectedGlass(glass);
		setIsUpdateModalVisible(true);
	};

	return (
		<View style={styles.card}>
			<View>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.infoText}>
					{item.type} - {formatCurrencyBRL(item.price)}
				</Text>
			</View>
			<View style={styles.actionsContainer}>
				<TouchableOpacity
					onPress={() => handleOpenUpdate(item)}
					style={styles.actionButton}
				>
					<MaterialIcons name="edit" size={20} color="#2196F3" />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => handleRemove(item.id)}
					style={styles.actionButton}
				>
					<MaterialIcons name="delete" size={20} color="#F44336" />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15,
		backgroundColor: "#fff",
		marginBottom: 10,
		borderRadius: 8,
		elevation: 2,
	},
	name: { fontWeight: "bold", fontSize: 16, color: "#000" },
	infoText: { color: "#000" },
	actionsContainer: {
		flexDirection: "row",
		gap: 10,
	},
	actionButton: {
		padding: 8,
		borderRadius: 8,
	},
	button: {
		backgroundColor: "#f44336",
		padding: 10,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
