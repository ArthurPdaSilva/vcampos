import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import { Alert, FlatList, Keyboard, StyleSheet, View } from "react-native";
import { CustomButton } from "../../../components/CustomButton";
import { FormInput } from "../../../components/FormInput";
import {
	type CalculatedGlass,
	type Dimensions,
	EXPENSES_PERCENTAGE,
	GLASS_SHEET_SIZE,
	type GlassType,
	PROFIT_PERCENTAGE,
} from "../../../types";
import { CalculationItem } from "../components/CalculationItem";
import { GlassTypePicker } from "../components/GlassTypePicker";
import {
	type GlassCalculationFormData,
	glassCalculationSchema,
} from "../schemas/glassCalculationSchema";
import { useGlassStore } from "../stores/GlassStore";

export const GlassCalculationScreen = () => {
	const [type, setType] = useState<GlassType>("Temperado");
	const [results, setResults] = useState<CalculatedGlass[]>([]);
	const [hideDetails, setHideDetails] = useState(true);
	const { glasses } = useGlassStore((state) => state);
	const { control, handleSubmit } = useForm<GlassCalculationFormData>({
		resolver: zodResolver(glassCalculationSchema),
		defaultValues: {
			height: "",
			width: "",
		},
	});

	const calculate = ({ height, width }: GlassCalculationFormData) => {
		const dimensions: Dimensions = {
			height: Number.parseFloat(height),
			width: Number.parseFloat(width),
		};
		const areaInSquareMeters = (dimensions.height * dimensions.width) / 10000;

		const calculated: CalculatedGlass[] = [];

		for (const g of glasses) {
			if (g.type !== type) continue;

			const calculators = {
				Comum: g.price * (areaInSquareMeters / GLASS_SHEET_SIZE),
				Temperado: areaInSquareMeters * g.price,
				Outro: g.price,
			};

			const basePrice = calculators[g.type];
			const isOutro = g.type === "Outro";
			const expenses = isOutro ? 0 : basePrice * EXPENSES_PERCENTAGE;
			const profit = isOutro ? 0 : basePrice * PROFIT_PERCENTAGE;
			const finalPrice = basePrice + expenses + profit;

			calculated.push({
				...g,
				basePrice,
				expenses,
				profit,
				finalPrice,
				dimensions,
			});
		}

		if (calculated.length === 0) {
			Alert.alert("Aviso", "Nenhum vidro encontrado para o tipo selecionado");
		}

		setResults(calculated);
		Keyboard.dismiss();
	};

	const handleInvalidSubmit = (
		errors: FieldErrors<GlassCalculationFormData>,
	) => {
		const errorMessage = errors.height?.message ?? errors.width?.message;

		if (!errorMessage) return;
		Alert.alert("Erro", errorMessage);
	};

	return (
		<View style={styles.container}>
			<View style={styles.form}>
				<Controller
					control={control}
					name="height"
					render={({ field: { onChange, value } }) => (
						<FormInput
							placeholder="Altura (cm)"
							onChangeText={onChange}
							keyboardType="numeric"
							value={value}
						/>
					)}
				/>
				<Controller
					control={control}
					name="width"
					render={({ field: { onChange, value } }) => (
						<FormInput
							placeholder="Largura (cm)"
							onChangeText={onChange}
							keyboardType="numeric"
							value={value}
						/>
					)}
				/>

				<GlassTypePicker type={type} setType={setType} />
			</View>

			<CustomButton
				title="Calcular"
				style={{ marginTop: 20 }}
				onPress={handleSubmit(calculate, handleInvalidSubmit)}
			/>

			<CustomButton
				style={styles.toggleBtn}
				onPress={() => setHideDetails(!hideDetails)}
				title={hideDetails ? "Mostrar Detalhes" : "Ocultar Detalhes"}
				textStyle={{ color: "#fff", fontSize: 16 }}
			/>

			<FlatList
				data={results}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<CalculationItem res={item} hideDetails={hideDetails} />
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 15 },
	form: { marginBottom: 20 },
	toggleBtn: {
		backgroundColor: "#607D8B",
		padding: 10,
		marginTop: 10,
		alignItems: "center",
		borderRadius: 5,
		marginBottom: 15,
	},
});
