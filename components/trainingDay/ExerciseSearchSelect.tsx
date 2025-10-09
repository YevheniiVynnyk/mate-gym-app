import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	Keyboard
} from "react-native";
import { ChevronDown } from "lucide-react-native";
import { exerciseService, ExerciseDTO } from "@/services/exerciseService";

interface ExerciseSearchSelectProps {
	value: string;
	onChange: (value: string) => void;
	onExerciseSelect?: (exercise: ExerciseDTO) => void;
	placeholder?: string;
}

const ExerciseSearchSelect: React.FC<ExerciseSearchSelectProps> = ({
																	   value,
																	   onChange,
																	   onExerciseSelect,
																	   placeholder = "Выберите упражнение..."
																   }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [inputValue, setInputValue] = useState(value);
	const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadExercises = async () => {
			try {
				setIsLoading(true);
				const exerciseData = await exerciseService.getAllExercises();
				setExercises(exerciseData);
			} catch (error) {
				console.error("Failed to load exercises:", error);
				const fallbackExercises: ExerciseDTO[] = [
					"Жим лежа", "Приседания", "Становая тяга", "Жим стоя", "Подтягивания"
				].map((name, index) => ({
					id: index + 1,
					name,
					description: "",
					muscleGroup: { id: 1, name: "Общие" }
				}));
				setExercises(fallbackExercises);
			} finally {
				setIsLoading(false);
			}
		};
		loadExercises();
	}, []);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const filteredExercises = exercises.filter((exercise) =>
		exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleInputChange = (text: string) => {
		setInputValue(text);
		setSearchTerm(text);
		onChange(text);
		setIsOpen(true);
	};

	const handleSelectExercise = (exercise: ExerciseDTO) => {
		setInputValue(exercise.name);
		onChange(exercise.name);
		onExerciseSelect && onExerciseSelect(exercise);
		setIsOpen(false);
		setSearchTerm("");
		Keyboard.dismiss();
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
		setSearchTerm(inputValue);
	};

	return (
		<View className="w-full">
			<View className="flex-row items-center border border-gray-300 rounded-lg">
				<TextInput
					value={inputValue}
					onChangeText={handleInputChange}
					placeholder={placeholder}
					className="flex-1 p-2"
					onFocus={() => setIsOpen(true)}
				/>
				<TouchableOpacity onPress={toggleDropdown} className="p-2">
					<ChevronDown size={20} color="black" />
				</TouchableOpacity>
			</View>

			{isOpen && (
				<View className="bg-white border border-gray-300 rounded-lg max-h-52 mt-1">
					{filteredExercises.length > 0 ? (
						<FlatList
							data={filteredExercises}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									className="p-3 border-b border-gray-200"
									onPress={() => handleSelectExercise(item)}
								>
									<Text className="font-bold">{item.name}</Text>
									{item.description ? (
										<Text className="text-xs text-gray-500">{item.description}</Text>
									) : null}
									<Text className="text-[10px] text-gray-400">{item.muscleGroup.name}</Text>
								</TouchableOpacity>
							)}
						/>
					) : (
						<Text className="p-3 text-center text-gray-400">
							Упражнений не найдено
						</Text>
					)}
				</View>
			)}
		</View>
	);
};

export default ExerciseSearchSelect;
