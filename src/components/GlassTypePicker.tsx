import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";
import type { GlassType } from "../types";
import { Label } from "./Label";

type GlassTypePickerProps = {
	type: GlassType;
	setType: (value: GlassType) => void;
};

export const GlassTypePicker = ({ type, setType }: GlassTypePickerProps) => {
	return (
		<>
			<Label text="Tipo" />
			<View style={styles.pickerContainer}>
				<Picker
					selectedValue={type}
					onValueChange={(itemValue) => setType(itemValue)}
					dropdownIconColor="#2196F3"
					mode="dropdown"
				>
					<Picker.Item label="Temperado" value="Temperado" />
					<Picker.Item label="Comum" value="Comum" />
				</Picker>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	pickerContainer: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		marginTop: 5,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
});
