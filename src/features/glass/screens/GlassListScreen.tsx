import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { EmptyText } from "../../../components/EmptyText";
import type { Glass } from "../../../types";
import { GlassRegistration } from "../components/GlassRegistration";
import { StockItem } from "../components/StockItem";
import { UpdateGlass } from "../components/UpdateGlass";
import { useGlassStore } from "../stores/GlassStore";

export const GlassListScreen = () => {
	const navigation = useNavigation();
	const { glasses } = useGlassStore((state) => state);
	const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
	const [isRegistrationModalVisible, setIsRegistrationModalVisible] =
		useState(false);
	const [selectedGlass, setSelectedGlass] = useState<Glass | null>(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => setIsRegistrationModalVisible(true)}
					style={styles.headerButton}
				>
					<MaterialCommunityIcons name="plus" size={26} color="#000" />
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const handleCloseUpdate = () => {
		setIsUpdateModalVisible(false);
		setSelectedGlass(null);
	};

	const handleCloseRegistration = () => {
		setIsRegistrationModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={glasses}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<EmptyText text="Nenhum item adicionado ao estoque. Use o cadastro para adicionar itens." />
				}
				renderItem={({ item }) => (
					<StockItem
						setIsUpdateModalVisible={setIsUpdateModalVisible}
						setSelectedGlass={setSelectedGlass}
						item={item}
					/>
				)}
			/>

			<UpdateGlass
				visible={isUpdateModalVisible}
				glass={selectedGlass}
				onClose={handleCloseUpdate}
			/>

			<GlassRegistration
				visible={isRegistrationModalVisible}
				onClose={handleCloseRegistration}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 10 },
	headerButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
});
