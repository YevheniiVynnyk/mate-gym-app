import React from "react";
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { useTrainingDayForm } from "@/hooks/useTrainingDayForm";
import Header from "@/components/welcome/Header";
import {TrainingExerciseCard} from "@/components/trainingDay/TrainingExerciseCard";
import {CalendarModal} from "@/components/trainingDay/CalendarModal";
import {DurationModal} from "@/components/trainingDay/DurationModal";

export default function TrainingDayForm({isEdit}: { isEdit?: boolean }) {
	const navigation = useNavigation();
	const {
		trainingDayDate, setTrainingDayDate,
		trainings, trainingDayDuration, setTrainingDayDuration,
		isLoading, showCalendarModal, setShowCalendarModal,
		showDurationModal, setShowDurationModal,
		addTrainingAndFocus, removeTraining,
		updateExerciseNameById, updateExerciseById,
		updateNotesById, updateSetDataById, updateSetsById,
		saveTrainingDay, validateInputs,
	} = useTrainingDayForm(isEdit);

	const handleSaveAndExecute = () => {
		if (validateInputs()) setShowDurationModal(true);
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
		<ScrollView className="flex-1 bg-gray-100 p-4">
			<Header
				onBack={() => navigation.goBack()}
				title={isEdit ? "Редактировать тренировку" : "Создать тренировку"}
			/>

			<View className="bg-white p-3 rounded-xl mb-3">
				<Text className="text-lg font-semibold">Дата</Text>
				<TouchableOpacity className="p-3 bg-gray-100 rounded-lg mt-2"
								  onPress={() => setShowCalendarModal(true)}>
					<Text>{trainingDayDate.toLocaleDateString()}</Text>
				</TouchableOpacity>
			</View>

			{trainings.map((t, i) => (
				<TrainingExerciseCard
					key={t.id}
					training={t}
					index={i}
					onExerciseChange={(v) => updateExerciseNameById(t.id, v)}
					onExerciseSelect={(ex) => updateExerciseById(t.id, ex)}
					onNoteChange={(v) => updateNotesById(t.id, v)}
					onSetDataChange={(a, b, c) => updateSetDataById(t.id, a, b, c)}
					onSetsChange={(n) => updateSetsById(t.id, n)}
					onRemove={() => removeTraining(t.id)}
				/>
			))}

			<TouchableOpacity onPress={addTrainingAndFocus} className="bg-blue-500 py-3 rounded-lg items-center my-2">
				<Text className="text-white font-bold">+ Добавить упражнение</Text>
			</TouchableOpacity>

			<View className="flex-row justify-between mt-3">
				<TouchableOpacity
					className="flex-1 bg-blue-500 py-3 rounded-lg items-center mr-2"
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