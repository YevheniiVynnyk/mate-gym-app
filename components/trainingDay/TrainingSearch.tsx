import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Search, Filter } from "lucide-react-native";

export const TrainingSearch = ({ searchTerm, setSearchTerm }) => (
	<View style={styles.container}>
		<Search size={20} />
		<TextInput
			style={styles.input}
			placeholder="Поиск тренировок..."
			value={searchTerm}
			onChangeText={setSearchTerm}
		/>
		<TouchableOpacity>
			<Filter size={20} />
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		borderRadius: 8,
		marginBottom: 16,
	},
	input: { flex: 1, marginLeft: 8 },
});
