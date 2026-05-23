import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Platform,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import { FormInput } from "../../../components/FormInput";
import {
	type SaveBudgetFormData,
	saveBudgetSchema,
} from "../schemas/saveBudgetSchema";
import { useBudgetStore } from "../stores/BudgetStore";

type SaveBudgetProps = {
	visible: boolean;
	onClose: () => void;
};

export const SaveBudget = ({ visible, onClose }: SaveBudgetProps) => {
	const { saveBudget, budgetItems, discount, totalValue } = useBudgetStore(
		(state) => state,
	);
	const { control, handleSubmit, reset } = useForm<SaveBudgetFormData>({
		resolver: zodResolver(saveBudgetSchema),
		defaultValues: {
			name: "",
			clientName: "",
			address: "",
		},
	});

	useEffect(() => {
		if (visible) {
			reset({ name: "", clientName: "", address: "" });
		}
	}, [visible, reset]);

	const handleSaveBudget = ({
		name,
		clientName,
		address,
	}: SaveBudgetFormData) => {
		Keyboard.dismiss();

		saveBudget({
			items: budgetItems,
			discount,
			totalValue,
			name,
			clientName,
			address,
		});
		onClose();
		Alert.alert("Sucesso", "Orçamento salvo na lista!");
	};

	const handleInvalidSubmit = (errors: FieldErrors<SaveBudgetFormData>) => {
		const errorMessage =
			errors.name?.message ??
			errors.clientName?.message ??
			errors.address?.message;

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
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<TouchableWithoutFeedback onPress={onClose}>
					<View style={styles.overlay}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								<Text style={styles.title}>Salvar Orçamento</Text>
								<Controller
									control={control}
									name="name"
									render={({ field: { onChange, value } }) => (
										<FormInput
											label="Nome do orçamento"
											placeholder="Ex: Orçamento casa"
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>

								<Controller
									control={control}
									name="clientName"
									render={({ field: { onChange, value } }) => (
										<FormInput
											label="Nome do cliente"
											placeholder="Ex: João da Silva"
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>

								<Controller
									control={control}
									name="address"
									render={({ field: { onChange, value } }) => (
										<FormInput
											label="Endereço"
											placeholder="Ex: Rua A, 123"
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>

								<View style={styles.actions}>
									<CustomButton
										style={styles.cancelButton}
										onPress={onClose}
										title="Cancelar"
										textStyle={styles.buttonText}
									/>
									<CustomButton
										style={styles.saveButton}
										onPress={handleSubmit(
											handleSaveBudget,
											handleInvalidSubmit,
										)}
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
