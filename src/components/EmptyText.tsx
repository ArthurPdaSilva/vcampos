import { StyleSheet, Text } from "react-native";

export const EmptyText = ({ text }: { text: string }) => {
	return <Text style={styles.emptyText}>{text}</Text>;
};

const styles = StyleSheet.create({
	emptyText: {
		textAlign: "center",
		color: "#666",
		marginTop: 40,
		fontSize: 16,
	},
});
