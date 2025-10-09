import React, {useEffect, useRef, useState} from "react";
import {Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Calendar} from "react-native-calendars";

import ExerciseSearchSelect from "../../components/trainingDay/ExerciseSearchSelect";
import SetInputs from "../../components/trainingDay/SetInputs";
import {calculateTotals, createEmptyTraining, updateSetData, updateSetsCount, updateTrainingField} from "@/lib/utils";
import {trainingDayService} from "@/services/trainingDayService";
import {mapFromAPI, mapToCreateDTO, mapToUpdateDTO} from "@/services/mapper/trainingDayMapper";
import {Exercise, Training, TrainingDay} from "@/types/trainingDay";

type Props = { isEdit?: boolean };

const TrainingDayForm: React.FC<Props> = ({isEdit}) => {
	const navigation = useNavigation();
	const route = useRoute();
	const {id, clientId, prefilledData, selectedDate} = route.params || {};

	const [trainingDayName, setTrainingDayName] = useState(prefilledData?.name || "");
	const [trainingDayDate, setTrainingDayDate] = useState<Date>(() => {
		if (prefilledData?.date) return new Date(prefilledData.date);
		if (selectedDate) {
			const now = new Date();
			const combined = new Date(selectedDate);
			combined.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
			return combined;
		}
		return new Date();
	});

	const [trainings, setTrainings] = useState<Training[]>(prefilledData?.trainings || []);
	const [trainingDayDuration, setTrainingDayDuration] = useState(prefilledData?.durationMinutes?.toString() || "");
	const [isLoading, setIsLoading] = useState(false);
	const [originalTrainingDay, setOriginalTrainingDay] = useState<TrainingDay | null>(null);

	const [showCalendarModal, setShowCalendarModal] = useState(false);
	const [showDurationModal, setShowDurationModal] = useState(false);

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
				} catch (err) {
					console.error(err);
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

	const addTrainingAndFocus = () => {
		setTrainings(prev => [...prev, createEmptyTraining()]);
		setFocusNew(true);
	};

	const removeTraining = (trainingId: number) => setTrainings(trainings.filter(t => t.id !== trainingId));
	const updateExerciseNameById = (trainingId: number, value: string) =>
		setTrainings(updateTrainingField(trainings, trainingId, "exercise", {
			...trainings.find(t => t.id === trainingId)?.exercise,
			name: value
		}));
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

	const saveTrainingDay = async (execute: boolean = false, duration?: number) => {
		let finalName = trainingDayName.trim();
		if (!finalName) {
			finalName = `Тренировка ${trainingDayDate}`;
			setTrainingDayName(finalName);
		}

		setIsLoading(true);
		try {
			const status = execute ? "COMPLETED" : "CREATED";

			await (clientId
				? trainingDayService.createTrainingForClient(
					+clientId,
					mapToCreateDTO({
						id: null,
						name: finalName,
						date: trainingDayDate,
						trainings,
						status,
						...(duration ? {durationMinutes: duration} : {}),
					})
				)
				: isEdit && originalTrainingDay && id
					? trainingDayService.updateTrainingDay(
						mapToUpdateDTO({
							...originalTrainingDay,
							name: finalName,
							date: trainingDayDate,
							trainings,
							status,
							...(duration ? {durationMinutes: duration} : {}),
						})
					)
					: trainingDayService.createTrainingDay(
						mapToCreateDTO({
							id: null,
							name: finalName,
							date: trainingDayDate,
							trainings,
							status,
							...(duration ? {durationMinutes: duration} : {}),
						})
					));

			Alert.alert("Успешно!", execute ? "Тренировка сохранена и выполнена" : "Тренировка сохранена");
			navigation.goBack();
		} catch (err) {
			console.error(err);
			Alert.alert("Ошибка", "Не удалось сохранить тренировку");
		} finally {
			setIsLoading(false);
		}
	};

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
		<ScrollView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.backButton}>Назад</Text>
				</TouchableOpacity>
				<Text style={styles.title}>{isEdit ? "Редактировать тренировку" : "Создать тренировку"}</Text>
			</View>

			{/* Основная информация */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Основная информация</Text>
				<TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendarModal(true)}>
					<Text>{trainingDayDate}</Text>
				</TouchableOpacity>
			</View>

			{/* Модал календаря */}
			<Modal visible={showCalendarModal} animationType="slide">
				<Calendar
					onDayPress={(day) => {
						const date = new Date(day.dateString);
						const now = new Date();
						date.setHours(now.getHours(), now.getMinutes(), 0, 0);
						setTrainingDayDate(date);
						setShowCalendarModal(false);
					}}
					markedDates={{
						trainingDayDate: {selected: true},
					}}
				/>
				<TouchableOpacity onPress={() => setShowCalendarModal(false)}>
					<Text style={styles.closeButton}>Закрыть</Text>
				</TouchableOpacity>
			</Modal>

			{/* Упражнения */}
			{trainings.map((training, index) => {
				const totals = calculateTotals(training.trainingDetails);
				return (
					<View key={training.id} style={styles.card}>
						<Text style={styles.cardTitle}>Упражнение {index + 1}</Text>
						<ExerciseSearchSelect
							value={training.exercise.name}
							onChange={(v) => updateExerciseNameById(training.id, v)}
							onExerciseSelect={(ex) => updateExerciseById(training.id, ex)}
						/>
						<SetInputs
							sets={training.trainingDetails.length}
							setData={training.trainingDetails}
							onSetDataChange={(i, f, v) => updateSetDataById(training.id, i, f, v)}
							onSetsChange={(newCount) => updateSetsById(training.id, newCount)}
						/>
						<TextInput
							placeholder="Заметки"
							multiline
							value={training.note || ""}
							onChangeText={(v) => updateNotesById(training.id, v)}
							style={styles.textarea}
						/>
						<Text>Итого: {totals.totalReps} повторений, {totals.totalWeight.toFixed(1)} кг</Text>
						<TouchableOpacity onPress={() => removeTraining(training.id)}>
							<Text style={styles.removeButton}>Удалить упражнение</Text>
						</TouchableOpacity>
					</View>
				);
			})}
			<TouchableOpacity onPress={addTrainingAndFocus} style={styles.addButton}>
				<Text style={styles.addButtonText}>+ Добавить упражнение</Text>
			</TouchableOpacity>

			{/* Кнопки сохранения */}
			<View style={styles.buttonRow}>
				<TouchableOpacity style={styles.saveButton} onPress={() => saveTrainingDay(false)} disabled={isLoading}>
					<Text style={styles.buttonText}>{isLoading ? "Сохранение..." : "Сохранить"}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.executeButton} onPress={handleSaveAndExecute} disabled={isLoading}>
					<Text style={styles.buttonText}>Выполнить</Text>
				</TouchableOpacity>
			</View>

			{/* Модал длительности */}
			<Modal visible={showDurationModal} animationType="slide">
				<View style={styles.modalContent}>
					<Text>Сколько времени заняла тренировка? (мин)</Text>
					<TextInput
						style={styles.input}
						keyboardType="numeric"
						value={trainingDayDuration}
						onChangeText={setTrainingDayDuration}
					/>
					<View style={styles.buttonRow}>
						<TouchableOpacity onPress={() => setShowDurationModal(false)}>
							<Text style={styles.buttonText}>Отмена</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleDurationSubmit}>
							<Text style={styles.buttonText}>Сохранить</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</ScrollView>
	);
};

export default TrainingDayForm;

const styles = StyleSheet.create({
	container: {flex: 1, padding: 16, backgroundColor: "#f2f2f2"},
	header: {flexDirection: "row", alignItems: "center", marginBottom: 16},
	backButton: {color: "#007AFF"},
	title: {fontSize: 20, fontWeight: "bold", marginLeft: 8},
	card: {backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12},
	cardTitle: {fontSize: 16, fontWeight: "bold"},
	dateButton: {padding: 12, backgroundColor: "#eee", borderRadius: 6, marginTop: 8},
	closeButton: {textAlign: "center", marginTop: 20, color: "red"},
	textarea: {borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, minHeight: 60},
	addButton: {backgroundColor: "#007AFF", padding: 12, borderRadius: 6, alignItems: "center", marginVertical: 8},
	addButtonText: {color: "#fff", fontWeight: "bold"},
	removeButton: {color: "red", marginTop: 8},
	buttonRow: {flexDirection: "row", justifyContent: "space-between", marginTop: 12},
	saveButton: {
		backgroundColor: "#007AFF",
		padding: 12,
		flex: 1,
		marginRight: 4,
		borderRadius: 6,
		alignItems: "center"
	},
	executeButton: {
		backgroundColor: "#28a745",
		padding: 12,
		flex: 1,
		marginLeft: 4,
		borderRadius: 6,
		alignItems: "center"
	},
	buttonText: {color: "#fff", fontWeight: "bold"},
	modalContent: {flex: 1, padding: 16, justifyContent: "center"},
	input: {borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginVertical: 8},
});
