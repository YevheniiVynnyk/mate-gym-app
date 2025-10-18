import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Play, Trash2, Edit3, RotateCcw } from "lucide-react-native";

interface Props {

	status: "COMPLETED" | "IN_PROGRESS" | string;
	onStart: () => void;
	onEdit: () => void;
	onRepeat: () => void;
	onDelete: () => void;
}

export default function TrainingActions({
											status,
											onStart,
											onEdit,
											onRepeat,
											onDelete,
										}: Props) {
	return (
		<View className="flex-row justify-around mb-4">
			{/* === Если тренировка завершена === */}
			{status === "COMPLETED" && (
				<>
					<ActionButton
						label="Редактировать"
						icon={<Edit3 size={16} color="#fff" />}
						color="bg-blue-500"
						onPress={onEdit}
					/>
					<ActionButton
						label="Повторить"
						icon={<RotateCcw size={16} color="#fff" />}
						color="bg-green-600"
						onPress={onRepeat}
					/>
					<ActionButton
						label="Удалить"
						icon={<Trash2 size={16} color="#fff" />}
						color="bg-red-500"
						onPress={onDelete}
					/>
				</>
			)}

			{/* === Если тренировка в процессе === */}
			{(status === "IN_PROGRESS" || status!== "COMPLETED") && (
				<>
					<ActionButton
						label="Начать"
						icon={<Play size={16} color="#fff" />}
						color="bg-green-600"
						onPress={onStart}
					/>
					<ActionButton
						label="Редактировать"
						icon={<Edit3 size={16} color="#fff" />}
						color="bg-blue-500"
						onPress={onEdit}
					/>
					<ActionButton
						label="Удалить"
						icon={<Trash2 size={16} color="#fff" />}
						color="bg-red-500"
						onPress={onDelete}
					/>
				</>
			)}
		</View>
	);
}
/** Вложенный компонент кнопки */
const ActionButton = ({
						  label,
						  icon,
						  color,
						  onPress,
					  }: {
	label: string;
	icon: React.ReactNode;
	color: string;
	onPress: () => void;
}) => (
	<TouchableOpacity
		className={`flex-row items-center ${color} px-3 py-2 rounded-lg shadow-sm`}
		activeOpacity={0.8}
		onPress={onPress}
	>
		{icon}
		<Text className="text-white font-semibold ml-2">{label}</Text>
	</TouchableOpacity>
);