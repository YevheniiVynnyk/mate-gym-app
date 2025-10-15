import React, {useEffect, useState} from "react";
import {FlatList, Keyboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import {ChevronDown, X} from "lucide-react-native";
import {ExerciseDTO, exerciseService} from "@/services/exerciseService";

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

    useEffect(() => {
        const loadExercises = async () => {
            try {
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
                    muscleGroup: {id: 1, name: "Общие"}
                }));
                setExercises(fallbackExercises);
            }
        };
        loadExercises();
    }, []);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const filteredExercises = (exercises || []).filter((exercise) =>
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

    const handleClear = () => {
        setInputValue("");
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setSearchTerm(inputValue);
    };

    return (
        <View className="w-full p-2">
            <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-100">
                <TextInput
                    value={inputValue}
                    onChangeText={handleInputChange}
                    placeholder={placeholder}
                    className="flex-1 px-2 py-1"
                    onFocus={() => setIsOpen(true)}
                />
                {inputValue?.length > 0 && (
                    <TouchableOpacity onPress={handleClear} className="p-2">
                        <X size={18} color="gray"/>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={toggleDropdown} className="p-2">
                    <ChevronDown size={20} color="black"/>
                </TouchableOpacity>
            </View>

            {isOpen && (
                <View className="bg-white border border-gray-300 rounded-lg max-h-52 mt-1">
                    {filteredExercises.length > 0 ? (
                        <FlatList
                            data={filteredExercises}
                            keyExtractor={(item) => item.id.toString()}
                            keyboardShouldPersistTaps="handled"
                            nestedScrollEnabled
                            renderItem={({item}) => (
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