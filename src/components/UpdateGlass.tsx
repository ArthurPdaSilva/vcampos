import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import {
	Alert,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {
	type UpdateGlassFormData,
	updateGlassSchema,
} from "../schemas/updateGlassSchema";
import { useGlassStore } from "../stores/GlassStore";
import type { Glass, GlassUpdate } from "../types";
import { FormInput } from "./FormInput";

type UpdateGlassProps = {
	visible: boolean;
	glass: Glass | null;
	onClose: () => void;
};

export const UpdateGlass = ({ visible, glass, onClose }: UpdateGlassProps) => {
	const { updateGlass } = useGlassStore((state) => state);
	const { control, handleSubmit, reset } = useForm<UpdateGlassFormData>({
		resolver: zodResolver(updateGlassSchema),
		defaultValues: {
			name: "",
			price: "",
		},
	});

	useEffect(() => {
		if (!glass) {
			reset({ name: "", price: "" });
			return;
		}

		reset({
			name: glass.name,
			price: String(glass.price),
		});
	}, [glass, reset]);

	const handleUpdateGlass = ({ name, price }: UpdateGlassFormData) => {
		Keyboard.dismiss();

		if (!glass) return;

		const update: GlassUpdate = {
			id: glass.id,
			name: name.trim(),
			price: Number.parseFloat(price),
		};

		updateGlass(update);
		onClose();
		Alert.alert("Sucesso", "Vidro atualizado!");
	};

	const handleInvalidSubmit = (errors: FieldErrors<UpdateGlassFormData>) => {
		const errorMessage = errors.name?.message ?? errors.price?.message;

		if (!errorMessage) return;
		Alert.alert("Erro", errorMessage);
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

					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<FormInput
								label="Nome do Vidro"
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

					<View style={styles.actions}>
						<TouchableOpacity style={styles.cancelButton} onPress={onClose}>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.saveButton}
							onPress={handleSubmit(handleUpdateGlass, handleInvalidSubmit)}
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
