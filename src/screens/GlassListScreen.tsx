import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { EmptyText } from "../components/EmptyText";
import { StockItem } from "../components/StockItem";
import { UpdateGlass } from "../components/UpdateGlass";
import { useGlassStore } from "../stores/GlassStore";
import type { Glass } from "../types";

export const GlassListScreen = () => {
	const { glasses } = useGlassStore((state) => state);
	const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
	const [selectedGlass, setSelectedGlass] = useState<Glass | null>(null);

	const handleCloseUpdate = () => {
		setIsUpdateModalVisible(false);
		setSelectedGlass(null);
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, padding: 10 },
});
