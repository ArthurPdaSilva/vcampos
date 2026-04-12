import { useState } from "react";
import {
	Alert,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { FormInput } from "../components/FormInput";
import { GlassTypePicker } from "../components/GlassTypePicker";
import { PrimaryButton } from "../components/PrimaryButton";
import { ShowResult } from "../components/ShowResult";
import { useGlassStore } from "../stores/GlassStore";
import {
	type CalculatedGlass,
	EXPENSES_PERCENTAGE,
	GLASS_SHEET_SIZE,
	type GlassType,
	PROFIT_PERCENTAGE,
} from "../types";

export const GlassCalculationScreen = () => {
	const [height, setHeight] = useState("");
	const [width, setWidth] = useState("");
	const [type, setType] = useState<GlassType>("Temperado");
	const [results, setResults] = useState<CalculatedGlass[]>([]);
	const [hideDetails, setHideDetails] = useState(false);
	const { glasses } = useGlassStore((state) => state);

	const calculate = () => {
		const h = Number.parseFloat(height);
		const w = Number.parseFloat(width);

		if (Number.isNaN(h) || Number.isNaN(w)) {
			return Alert.alert("Erro", "Altura e largura devem ser números válidos");
		}

		if (h <= 0 || w <= 0) {
			return Alert.alert("Erro", "Altura e largura devem ser maiores que zero");
		}

		const areaInSquareMeters = (h * w) / 10000;

		const calculated = [];

		for (const g of glasses) {
			if (g.type !== type) continue;

			let basePrice = 0;

			if (g.type === "Temperado") {
				basePrice = areaInSquareMeters * g.price;
			} else {
				basePrice = g.price * (areaInSquareMeters / GLASS_SHEET_SIZE);
			}

			const expenses = basePrice * EXPENSES_PERCENTAGE;
			const profit = basePrice * PROFIT_PERCENTAGE;
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

	return (
		<ScrollView style={styles.container}>
			<View style={styles.form}>
				<FormInput
					placeholder="Altura (cm)"
					onChangeText={setHeight}
					keyboardType="numeric"
					value={height}
				/>
				<FormInput
					placeholder="Largura (cm)"
					onChangeText={setWidth}
					keyboardType="numeric"
					value={width}
				/>

				<GlassTypePicker type={type} setType={setType} />
			</View>

			<PrimaryButton title="Calcular" onPress={calculate} />

			<TouchableOpacity
				style={styles.toggleBtn}
				onPress={() => setHideDetails(!hideDetails)}
			>
				<Text style={{ color: "#fff", fontSize: 16 }}>
					{hideDetails ? "Mostrar Detalhes" : "Ocultar Detalhes"}
				</Text>
			</TouchableOpacity>

			{results.map((res) => (
				<ShowResult key={res.id} res={res} hideDetails={hideDetails} />
			))}
		</ScrollView>
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
