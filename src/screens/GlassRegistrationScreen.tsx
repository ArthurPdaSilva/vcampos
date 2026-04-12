import { useState } from "react";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import { FormInput } from "../components/FormInput";
import { GlassTypePicker } from "../components/GlassTypePicker";
import { PrimaryButton } from "../components/PrimaryButton";
import { useGlassStore } from "../stores/GlassStore";
import type { GlassType } from "../types";

export const GlassRegistrationScreen = () => {
	const [name, setName] = useState("");
	const [type, setType] = useState<GlassType>("Temperado");
	const [price, setPrice] = useState("");
	const { addGlass } = useGlassStore((state) => state);

	const handleSave = async () => {
		Keyboard.dismiss();
		if (!name || !price) return Alert.alert("Erro", "Preencha todos os campos");

		const parsedPrice = Number.parseFloat(price);

		if (Number.isNaN(parsedPrice)) {
			return Alert.alert("Erro", "Preço deve ser um número válido");
		}

		if (parsedPrice <= 0) {
			return Alert.alert("Erro", "Preço deve ser maior que zero");
		}

		const newGlass = {
			id: Date.now().toString(),
			name,
			type,
			price: parsedPrice,
		};

		addGlass(newGlass);
		setName("");
		setPrice("");
		Alert.alert("Sucesso", "Vidro cadastrado!");
	};

	return (
		<View style={styles.container}>
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

			<GlassTypePicker type={type} setType={setType} />
			<PrimaryButton title="Cadastrar Vidro" onPress={handleSave} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: { padding: 20, flex: 1, backgroundColor: "#fff" },
});
