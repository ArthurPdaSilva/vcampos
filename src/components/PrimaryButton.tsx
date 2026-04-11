import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PrimaryButtonProps = {
	onPress: () => void;
	title: string;
};

export const PrimaryButton = ({ onPress, title }: PrimaryButtonProps) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.buttonText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#2196F3",
		padding: 10,
		borderRadius: 5,
		marginTop: 20,
	},
	buttonText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
});
