import { StyleSheet, Text } from "react-native";

export const Label = ({ text }: { text: string }) => {
	return <Text style={styles.label}>{text}</Text>;
};

const styles = StyleSheet.create({
	label: { fontWeight: "bold", fontSize: 16 },
});
