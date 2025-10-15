import React, {useState} from "react";
import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useTrainingDayForm} from "@/hooks/useTrainingDayForm";
import {TrainingExerciseCard} from "@/components/trainingDay/TrainingExerciseCard";
import {CalendarModal} from "@/components/trainingDay/CalendarModal";
import {DurationModal} from "@/components/trainingDay/DurationModal";
import {useNavigation} from "@/hooks/useNavigation";
import {Header} from "@/components/trainingDay/Header";
import {Calendar} from "lucide-react-native";

export default function TrainingDayForm({isEdit}: { isEdit?: boolean }) {
    const route = useNavigation();
    const {
        trainingDayName,
        setTrainingDayName,
        trainingDayDate,
        setTrainingDayDate,
        trainings,
        trainingDayDuration,
        setTrainingDayDuration,
        isLoading,
        removeTraining,
        addTraining,
        updateExerciseById,
        updateNotesById,
        updateSetDataById,
        updateSetsById,
        saveTrainingDay,
        validateInputs,
    } = useTrainingDayForm(isEdit);

    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showDurationModal, setShowDurationModal] = useState(false);

    const addTrainingAndFocus = () => addTraining();

    const handleSaveAndExecute = () => {
        if (!validateInputs()) return;
        setShowDurationModal(true);
    };

    const handleDurationSubmit = () => {
        const duration = parseInt(trainingDayDuration);
        if (isNaN(duration) || duration <= 0) {
            Alert.alert("Ошибка", "Введите корректное время тренировки");
            return;
        }
        setShowDurationModal(false);
        saveTrainingDay(true, duration);
    };

    return (
        <ScrollView className="flex-1 bg-gray-100"
                    showsVerticalScrollIndicator={false}>
            <Header
                onBack={() => route.goBack()}
                title={isEdit ? "Редактировать тренировку" : "Создать тренировку"}
            />

            {/* Основной блок тренировки */}
            <View className="bg-white p-4 rounded-xl mb-4 shadow-sm">
                {/* Название тренировки */}
                <View className="mb-3 flex-row items-center justify-start space-x-3">
                    <Text className="text-lg font-medium w-24">Название</Text>
                    <TextInput
                        className="flex-1 p-3 bg-gray-100 rounded-lg"
                        placeholder="Введите название"
                        value={trainingDayName}
                        onChangeText={setTrainingDayName}
                    />
                </View>

                {/* Дата тренировки */}
                <View className="flex-row items-center justify-start space-x-3">
                    <Text className="text-lg font-medium w-24">Дата</Text>
                    <TouchableOpacity
                        className="flex-row items-center p-3  rounded-lg"
                        onPress={() => setShowCalendarModal(true)}
                    >
                        <Calendar size={20} color="#555" className="mr-2" />
                        <Text>
                            {trainingDayDate.toLocaleDateString()}{" "}
                            {trainingDayDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View className=" bg-white p-4 rounded-xl mb-4">
                {/* Список упражнений */}
                {trainings.map((t, i) => (
                    <TrainingExerciseCard
                        key={t.id}
                        training={t}
                        index={i}
                        onExerciseChange={(ex) => updateExerciseById(t.id, ex)}
                        onExerciseSelect={(ex) => updateExerciseById(t.id, ex)}
                        onNoteChange={(v) => updateNotesById(t.id, v)}
                        onSetDataChange={(a, b, c) => updateSetDataById(t.id, a, b, c)}
                        onSetsChange={(n) => updateSetsById(t.id, n)}
                        onRemove={() => removeTraining(t.id)}
                    />
                ))}

                {/* Добавить упражнение */}
                <TouchableOpacity
                    onPress={addTrainingAndFocus}
                    className="bg-green-500 py-3 rounded-lg items-center my-2"
                >
                    <Text className="text-white font-bold">+ Добавить упражнение</Text>
                </TouchableOpacity>
            </View>
            {/* Кнопки сохранения */}
            <View className="flex-row justify-between my-2">
                <TouchableOpacity
                    className="flex-1 bg-green-500 py-3 rounded-lg items-center mr-2"
                    onPress={() => saveTrainingDay(false)}
                    disabled={isLoading}
                >
                    <Text className="text-white font-bold">
                        {isLoading ? "Сохранение..." : "Сохранить"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-1 bg-green-600 py-3 rounded-lg items-center ml-2"
                    onPress={handleSaveAndExecute}
                    disabled={isLoading}
                >
                    <Text className="text-white font-bold">Выполнить</Text>
                </TouchableOpacity>
            </View>

            {/* Модальные окна */}
            <CalendarModal
                visible={showCalendarModal}
                onClose={() => setShowCalendarModal(false)}
                onSelect={(d) => setTrainingDayDate(d)}
                selectedDate={trainingDayDate}
            />

            <DurationModal
                visible={showDurationModal}
                value={trainingDayDuration}
                onChange={setTrainingDayDuration}
                onCancel={() => setShowDurationModal(false)}
                onSubmit={handleDurationSubmit}
            />
        </ScrollView>
    );
}