import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import { FormInput } from "../../../components/FormInput";
import type { GlassType } from "../../../types";
import {
	type GlassRegistrationFormData,
	glassRegistrationSchema,
} from "../schemas/glassRegistrationSchema";
import { useGlassStore } from "../stores/GlassStore";
import { GlassTypePicker } from "./GlassTypePicker";

type GlassRegistrationProps = {
	visible: boolean;
	onClose: () => void;
};

export const GlassRegistration = ({
	visible,
	onClose,
}: GlassRegistrationProps) => {
	const [type, setType] = useState<GlassType>("Temperado");
	const { addGlass } = useGlassStore((state) => state);
	const { control, handleSubmit, reset } = useForm<GlassRegistrationFormData>({
		resolver: zodResolver(glassRegistrationSchema),
		defaultValues: {
			name: "",
			price: "",
		},
	});

	useEffect(() => {
		if (!visible) return;

		reset({ name: "", price: "" });
		setType("Temperado");
	}, [reset, visible]);

	const handleSave = ({ name, price }: GlassRegistrationFormData) => {
		Keyboard.dismiss();

		const newGlass = {
			id: Date.now().toString(),
			name: name.trim(),
			type,
			price: Number.parseFloat(price),
		};

		addGlass(newGlass);
		onClose();
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
		<Modal
			visible={visible}
			transparent={true}
			animationType="slide"
			onRequestClose={onClose}
		>
			<KeyboardAvoidingView
				style={styles.keyboardAvoidingContainer}
				behavior="padding"
			>
				<TouchableWithoutFeedback onPress={onClose}>
					<View style={styles.overlay}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								<Text style={styles.title}>Cadastrar item</Text>
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

								<View style={styles.actions}>
									<CustomButton
										style={styles.cancelButton}
										onPress={onClose}
										title="Cancelar"
										textStyle={styles.buttonText}
									/>
									<CustomButton
										style={styles.saveButton}
										onPress={handleSubmit(handleSave, handleInvalidSubmit)}
									>
										<Text style={styles.buttonText}>Salvar</Text>
									</CustomButton>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	keyboardAvoidingContainer: {
		flex: 1,
	},
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
		backgroundColor: "#4CAF50",
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
