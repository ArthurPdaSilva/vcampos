import { useEffect, useState } from "react";
import {
	Alert,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useGlassStore } from "../stores/GlassStore";
import type { Glass, GlassUpdate } from "../types";
import { FormInput } from "./FormInput";

type UpdateGlassProps = {
	visible: boolean;
	glass: Glass | null;
	onClose: () => void;
};

export const UpdateGlass = ({ visible, glass, onClose }: UpdateGlassProps) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const { updateGlass } = useGlassStore((state) => state);

	useEffect(() => {
		if (!glass) return;

		setName(glass.name);
		setPrice(String(glass.price));
	}, [glass]);

	const handleUpdateGlass = () => {
		Keyboard.dismiss();

		if (!glass) return;
		if (!name || !price) return Alert.alert("Erro", "Preencha nome e preço");

		const parsedPrice = Number.parseFloat(price);

		if (Number.isNaN(parsedPrice)) {
			return Alert.alert("Erro", "Preço deve ser um número válido");
		}

		if (parsedPrice <= 0) {
			return Alert.alert("Erro", "Preço deve ser maior que zero");
		}

		const update: GlassUpdate = {
			id: glass.id,
			name,
			price: parsedPrice,
		};

		updateGlass(update);
		onClose();
		Alert.alert("Sucesso", "Vidro atualizado!");
	};

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Atualizar vidro</Text>

					<FormInput
						label="Nome do Vidro"
						placeholder="Ex: Blindex 8mm"
						onChangeText={setName}
						value={name}
					/>

					<FormInput
						label="Preço em R$"
						placeholder="0.00"
						onChangeText={setPrice}
						keyboardType="numeric"
						value={price}
					/>

					<View style={styles.actions}>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.saveButton}
							onPress={handleUpdateGlass}
						>
							<Text style={styles.buttonText}>Salvar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.35)",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 20,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
		color: "#000",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 10,
		marginTop: 8,
	},
	cancelButton: {
		backgroundColor: "#607D8B",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 5,
	},
	saveButton: {
		backgroundColor: "#2196F3",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
