import {
	type StyleProp,
	StyleSheet,
	Text,
	type TextStyle,
	TouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from "react-native";

type CustomButtonProps = TouchableOpacityProps & {
	title?: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
};

export const CustomButton = ({
	title,
	style,
	textStyle,
	children,
	...props
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			style={[title ? styles.button : undefined, style]}
			{...props}
		>
			{title ? (
				<Text style={[styles.buttonText, textStyle]}>{title}</Text>
			) : null}
			{children}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#2196F3",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
		textAlign: "center",
	},
});
