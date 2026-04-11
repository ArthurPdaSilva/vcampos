import { StyleSheet, TextInput } from "react-native";
import { Label } from "./Label";

type FormInputProps = {
	placeholder: string;
	keyboardType?: "default" | "numeric";
	value: string;
	onChangeText: (text: string) => void;
	label?: string;
};

export const FormInput = ({
	label,
	value,
	placeholder,
	onChangeText,
	keyboardType = "default",
}: FormInputProps) => {
	return (
		<>
			{label && <Label text={label} />}
			<TextInput
				placeholder={placeholder}
				style={styles.input}
				keyboardType={keyboardType}
				onChangeText={onChangeText}
				value={value}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
		backgroundColor: "#fff",
		fontSize: 16,
	},
});
