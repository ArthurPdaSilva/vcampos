import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, type FieldErrors, useForm } from "react-hook-form";
import {
	Alert,
	FlatList,
	Keyboard,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { CalculationItem } from "../components/CalculationItem";
import { FormInput } from "../components/FormInput";
import { GlassTypePicker } from "../components/GlassTypePicker";
import { PrimaryButton } from "../components/PrimaryButton";
import {
	type GlassCalculationFormData,
	glassCalculationSchema,
} from "../schemas/glassCalculationSchema";
import { useGlassStore } from "../stores/GlassStore";
import {
	type CalculatedGlass,
	EXPENSES_PERCENTAGE,
	GLASS_SHEET_SIZE,
	type GlassType,
	PROFIT_PERCENTAGE,
} from "../types";

export const GlassCalculationScreen = () => {
	const [type, setType] = useState<GlassType>("Temperado");
	const [results, setResults] = useState<CalculatedGlass[]>([]);
	const [hideDetails, setHideDetails] = useState(false);
	const { glasses } = useGlassStore((state) => state);
	const { control, handleSubmit } = useForm<GlassCalculationFormData>({
		resolver: zodResolver(glassCalculationSchema),
		defaultValues: {
			height: "",
			width: "",
		},
	});

	const calculate = ({ height, width }: GlassCalculationFormData) => {
		const h = Number.parseFloat(height);
		const w = Number.parseFloat(width);

		const areaInSquareMeters = (h * w) / 10000;

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
			});
		}

		if (calculated.length === 0) {
			return Alert.alert(
				"Aviso",
				"Nenhum vidro encontrado para o tipo selecionado",
			);
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

			<PrimaryButton
				title="Calcular"
				onPress={handleSubmit(calculate, handleInvalidSubmit)}
			/>

			<TouchableOpacity
				style={styles.toggleBtn}
				onPress={() => setHideDetails(!hideDetails)}
			>
				<Text style={{ color: "#fff", fontSize: 16 }}>
					{hideDetails ? "Mostrar Detalhes" : "Ocultar Detalhes"}
				</Text>
			</TouchableOpacity>

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
