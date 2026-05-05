import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import { Alert, Keyboard, StyleSheet, View } from "react-native";
import { FormInput } from "../components/FormInput";
import { GlassTypePicker } from "../components/GlassTypePicker";
import { PrimaryButton } from "../components/PrimaryButton";
import {
	type GlassRegistrationFormData,
	glassRegistrationSchema,
} from "../schemas/glassRegistrationSchema";
import { useGlassStore } from "../stores/GlassStore";
import type { GlassType } from "../types";

export const GlassRegistrationScreen = () => {
	const [type, setType] = useState<GlassType>("Temperado");
	const { addGlass } = useGlassStore((state) => state);
	const { control, handleSubmit, reset } = useForm<GlassRegistrationFormData>({
		resolver: zodResolver(glassRegistrationSchema),
		defaultValues: {
			name: "",
			price: "",
		},
	});

	const handleSave = ({ name, price }: GlassRegistrationFormData) => {
		Keyboard.dismiss();

		const newGlass = {
			id: Date.now().toString(),
			name: name.trim(),
			type,
			price: Number.parseFloat(price),
		};

		addGlass(newGlass);
		reset({ name: "", price: "" });
		Alert.alert("Sucesso", "Item cadastrado!");
	};

	const handleInvalidSubmit = (
		errors: FieldErrors<GlassRegistrationFormData>,
	) => {
		const errorMessage = errors.name?.message ?? errors.price?.message;

		if (!errorMessage) return;
		Alert.alert("Erro", errorMessage);
	};

	return (
		<View style={styles.container}>
			<Controller
				control={control}
				name="name"
				render={({ field: { onChange, value } }) => (
					<FormInput
						label="Nome"
						placeholder="Ex: Blindex 8mm"
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>

			<Controller
				control={control}
				name="price"
				render={({ field: { onChange, value } }) => (
					<FormInput
						label="Preço em R$"
						placeholder="0.00"
						onChangeText={onChange}
						keyboardType="numeric"
						value={value}
					/>
				)}
			/>

			<GlassTypePicker type={type} setType={setType} />
			<PrimaryButton
				title="Cadastrar"
				onPress={handleSubmit(handleSave, handleInvalidSubmit)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { padding: 20, flex: 1, backgroundColor: "#fff" },
});
