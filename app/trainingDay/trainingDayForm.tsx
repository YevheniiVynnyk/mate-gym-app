import React, {useState} from "react";
import {Alert, View} from "react-native";
import {useTrainingDayForm} from "@/hooks/useTrainingDayForm";
import {useNavigation} from "@/hooks/useNavigation";
import {Header} from "@/components/trainingDay/Header";
import {CalendarModal} from "@/components/trainingDay/CalendarModal";
import {DurationModal} from "@/components/trainingDay/DurationModal";
import {TrainingInfoSection} from "@/components/trainingDay/TrainingInfoSection";
import {ExerciseListSection} from "@/components/trainingDay/ExerciseListSection";
import {SaveButtonsSection} from "@/components/trainingDay/SaveButtonsSection";

export default function TrainingDayForm() {
	const route = useNavigation();
	const {
		isEdit,
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
	} = useTrainingDayForm();

	const [showCalendarModal, setShowCalendarModal] = useState(false);
	const [showDurationModal, setShowDurationModal] = useState(false);

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
		<View className="flex-1 bg-gray-100">
			<Header
				onBack={() => route.goBack()}
				title={isEdit ? "Редактировать тренировку" : "Создать тренировку"}
			/>

			<TrainingInfoSection
				trainingDayName={trainingDayName}
				setTrainingDayName={setTrainingDayName}
				trainingDayDate={trainingDayDate}
				onOpenCalendar={() => setShowCalendarModal(true)}
			/>

			<ExerciseListSection
				trainings={trainings}
				addTraining={addTraining}
				removeTraining={removeTraining}
				updateExerciseById={updateExerciseById}
				updateNotesById={updateNotesById}
				updateSetDataById={updateSetDataById}
				updateSetsById={updateSetsById}
			/>

			<SaveButtonsSection
				isLoading={isLoading}
				onSave={() => saveTrainingDay(false)}
				onExecute={handleSaveAndExecute}
			/>

			<CalendarModal
				visible={showCalendarModal}
				onClose={() => setShowCalendarModal(false)}
				onSelect={(d: Date) => setTrainingDayDate(d)}
				selectedDate={trainingDayDate}
			/>

			<DurationModal
				visible={showDurationModal}
				value={trainingDayDuration}
				onChange={setTrainingDayDuration}
				onCancel={() => setShowDurationModal(false)}
				onSubmit={handleDurationSubmit}
			/>
		</View>
	);
}