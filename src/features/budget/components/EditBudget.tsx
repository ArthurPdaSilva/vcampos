import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import type { Budget } from "../../../types";
import {
	type EditBudgetFormData,
	editBudgetSchema,
} from "../schemas/editBudgetSchema";
import { useBudgetStore } from "../stores/BudgetStore";

type EditBudgetProps = {
	visible: boolean;
	onClose: () => void;
	budget: Budget;
};

export const EditBudget = ({ visible, onClose, budget }: EditBudgetProps) => {
	const {
		updateBudget,
		budgetItems,
		discount,
		totalValue,
		description,
		clearBudget,
	} = useBudgetStore((state) => state);
	const { control, handleSubmit, reset } = useForm<EditBudgetFormData>({
		resolver: zodResolver(editBudgetSchema),
		defaultValues: {
			name: budget.name,
			clientName: budget.clientName,
			address: budget.address,
		},
	});

	useEffect(() => {
		if (!visible) return;

		reset({
			name: budget.name,
			clientName: budget.clientName,
			address: budget.address,
		});
	}, [budget.address, budget.clientName, budget.name, reset, visible]);

	const handleEditBudget = ({
		name,
		clientName,
		address,
	}: EditBudgetFormData) => {
		Keyboard.dismiss();

		updateBudget({
			...budget,
			name,
			clientName,
			address,
			items: budgetItems,
			discount,
			totalValue,
			description,
		});

		clearBudget();
		onClose();
		Alert.alert("Sucesso", "Orçamento atualizado!");
	};

	const handleInvalidSubmit = (errors: FieldErrors<EditBudgetFormData>) => {
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
				behavior="padding"
			>
				<TouchableWithoutFeedback onPress={onClose}>
					<View style={styles.overlay}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								<Text style={styles.title}>Editar Orçamento</Text>
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
											handleEditBudget,
											handleInvalidSubmit,
										)}
									>
										<Text style={styles.buttonText}>Atualizar</Text>
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
