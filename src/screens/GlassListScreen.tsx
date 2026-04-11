import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useGlassStore } from "../stores/GlassStore";
import { formatCurrencyBRL } from "../utils/formatCurrencyBRL";

export const GlassListScreen = () => {
	const { glasses, removeGlass } = useGlassStore((state) => state);

	const handleRemove = (id: string) => {
		removeGlass(id);
		Alert.alert("Sucesso", "Vidro removido!");
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={glasses}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<View>
							<Text style={styles.name}>{item.name}</Text>
							<Text>
								{item.type} - {formatCurrencyBRL(item.price)}
							</Text>
						</View>
						<TouchableOpacity
							onPress={() => handleRemove(item.id)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Apagar</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 10 },
	card: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 15,
		backgroundColor: "#fff",
		marginBottom: 10,
		borderRadius: 8,
		elevation: 2,
	},
	name: { fontWeight: "bold", fontSize: 16 },
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
