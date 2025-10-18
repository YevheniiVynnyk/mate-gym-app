import {useEffect, useRef, useState} from "react";
import {Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useLocalSearchParams} from "expo-router";
import {trainingDayService} from "@/services/trainingDayService";
import {mapFromAPI, mapToCreateDTO, mapToUpdateDTO} from "@/services/mapper/trainingDayMapper";
import {createEmptyTraining, updateSetData, updateSetsCount, updateTrainingField} from "@/lib/utils";
import {Exercise, Training, TrainingDay} from "@/types/trainingDay";

export interface TrainingDayParams {
	id?: string;
	clientId?: string;
	prefilledData?: TrainingDay;
	selectedDate?: string;
	isEdit?: boolean;
}

export const useTrainingDayForm = () => {
	const navigation = useNavigation();
	const params = useLocalSearchParams() as TrainingDayParams;
	const {id, clientId, prefilledData, selectedDate, isEdit} = params || {};

	const [trainingDayName, setTrainingDayName] = useState(prefilledData?.name || "");
	const [trainingDayDate, setTrainingDayDate] = useState<Date>(() => {
		if (prefilledData?.date) return new Date(prefilledData.date);
		if (selectedDate) {
			const now = new Date();
			const combined = new Date(selectedDate);
			combined.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
			return combined;
		}
		return new Date();
	});

	const [trainings, setTrainings] = useState<Training[]>(prefilledData?.trainings || []);
	const [trainingDayDuration, setTrainingDayDuration] = useState(prefilledData?.durationMinutes?.toString() || "");
	const [originalTrainingDay, setOriginalTrainingDay] = useState<TrainingDay | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const lastExerciseRef = useRef<any>(null);
	const [focusNew, setFocusNew] = useState(false);

	useEffect(() => {
		if (isEdit && id) {
			(async () => {
				try {
					const apiData = await trainingDayService.getTrainingDayById(+id);
					const adapted = mapFromAPI(apiData);
					setOriginalTrainingDay(adapted);
					setTrainingDayName(adapted.name);
					setTrainingDayDate(adapted.date);
					setTrainings(adapted.trainings || []);
				} catch {
					Alert.alert("Ошибка", "Не удалось загрузить тренировку");
					navigation.goBack();
				}
			})();
		}
	}, [isEdit, id]);

	useEffect(() => {
		if (focusNew) {
			setTimeout(() => {
				lastExerciseRef.current?.focus?.();
				setFocusNew(false);
			}, 100);
		}
	}, [focusNew, trainings]);

	const addTraining = () => {
		setTrainings(prev => [...prev, createEmptyTraining()]);
		setFocusNew(true);
	};

	const removeTraining = (id: number) => setTrainings(trainings.filter(t => t.id !== id));

	const updateExerciseById = (trainingId: number, exercise: Exercise) =>
		setTrainings(updateTrainingField(trainings, trainingId, "exercise", exercise));

	const updateNotesById = (trainingId: number, note: string) =>
		setTrainings(updateTrainingField(trainings, trainingId, "note", note));

	const updateSetDataById = (trainingId: number, setIndex: number, field: "weight" | "repetition", value: number) =>
		setTrainings(updateSetData(trainings, trainingId, setIndex, field, value));

	const updateSetsById = (trainingId: number, sets: number) =>
		setTrainings(updateSetsCount(trainings, trainingId, sets));

	const validateInputs = () => {
		if (!trainingDayName.trim()) {
			Alert.alert("Ошибка", "Введите название тренировки");
			return false;
		}
		if (!trainings.length || trainings.every(t => !t.exercise.name.trim())) {
			Alert.alert("Ошибка", "Добавьте хотя бы одно упражнение");
			return false;
		}
		return true;
	};

	const saveTrainingDay = async (execute = false, duration?: number) => {
		const finalName = trainingDayName.trim() || `Тренировка ${trainingDayDate.toLocaleDateString()}`;
		setTrainingDayName(finalName);
		setIsLoading(true);

		try {
			const status = execute ? "COMPLETED" : "CREATED";
			const payload = {
				id: id ? id : null,
				name: finalName,
				date: trainingDayDate,
				trainings,
				status, ...(duration ? {durationMinutes: duration} : {})
			};
			if (isEdit && originalTrainingDay && id)
				await trainingDayService.updateTrainingDay(mapToUpdateDTO({...originalTrainingDay, ...payload}));
			else
				await trainingDayService.createTrainingDay(mapToCreateDTO(payload));


			Alert.alert("Успешно!", execute ? "Тренировка выполнена" : "Тренировка сохранена");
			navigation.goBack();
		} catch {
			Alert.alert("Ошибка", "Не удалось сохранить тренировку");
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isEdit,
		trainingDayName,
		setTrainingDayName,
		trainingDayDate,
		setTrainingDayDate,
		trainingDayDuration,
		setTrainingDayDuration,
		trainings,
		addTraining,
		removeTraining,
		updateExerciseById,
		updateNotesById,
		updateSetDataById,
		updateSetsById,
		validateInputs,
		saveTrainingDay,
		isLoading,
		lastExerciseRef,
	};
};