import React, {useEffect, useState} from "react";
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ArrowLeft, Clock, Play, StopCircle, Trash2,} from "lucide-react-native";
import {useAuth} from "@/contexts/AuthContext";
import {trainingDayService} from "@/services/trainingDayService";
import {mapFromAPI} from "@/services/mapper/trainingDayMapper";

export default function TrainingDayDetail() {
	const navigation = useNavigation();
	const route = useRoute();
	const {id} = route.params as { id: number };
	const {user} = useAuth();

	const [isTrainingDayStarted, setIsTrainingDayStarted] = useState(false);
	const [trainingDayTime, setTrainingDayTime] = useState(0);
	const [trainingDay, setTrainingDay] = useState<any>(null);

	useEffect(() => {
		const loadTrainingDay = async () => {
			if (!id) return;
			try {
				const apiTrainingDay = await trainingDayService.getTrainingDayById(id);
				const adaptedTrainingDay = mapFromAPI(apiTrainingDay);
				setTrainingDay(adaptedTrainingDay);
			} catch (error) {
				console.error("Failed to load training day:", error);
				Alert.alert("Ошибка", "Не удалось загрузить тренировку");
				navigation.goBack();
			}
		};
		loadTrainingDay();
	}, [id]);

	useEffect(() => {
		let interval: any;
		if (isTrainingDayStarted) {
			interval = setInterval(() => {
				setTrainingDayTime((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isTrainingDayStarted]);

	const formatSetsCount = (count: number) => {
		const mod10 = count % 10;
		const mod100 = count % 100;
		if (mod100 >= 11 && mod100 <= 14) return `${count} подходов`;
		if (mod10 === 1) return `${count} подход`;
		if (mod10 >= 2 && mod10 <= 4) return `${count} подхода`;
		return `${count} подходов`;
	};

	const calculateExerciseTotals = (training: any) => {
		const totalReps = training.trainingDetails.reduce(
			(sum: number, set: any) => sum + set.repetition,
			0
		);
		const totalWeight = training.trainingDetails.reduce(
			(sum: number, set: any) => sum + set.repetition * set.weight,
			0
		);
		return {totalReps, totalWeight};
	};

	const calculateTrainingDayTotals = () => {
		let totalReps = 0;
		let totalWeight = 0;
		trainingDay.trainings.forEach((training: any) => {
			const exerciseTotals = calculateExerciseTotals(training);
			totalReps += exerciseTotals.totalReps;
			totalWeight += exerciseTotals.totalWeight;
		});
		return {totalReps, totalWeight};
	};

	const TrainingDayTotals = trainingDay ? calculateTrainingDayTotals() : {totalReps: 0, totalWeight: 0};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return hours > 0
			? `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
			: `${minutes}:${secs.toString().padStart(2, "0")}`;
	};

	const startTrainingDay = async () => {
		if (!trainingDay) return;
		setIsTrainingDayStarted(true);
		setTrainingDayTime(0);
		const now = new Date();
		const updatedTrainingDay = {
			...trainingDay,
			status: "IN_PROGRESS",
			startTime: now,
			modifiedDate: now,
			modifiedBy: user?.id ?? 0,
		};
		await trainingDayService.updateTrainingDay(updatedTrainingDay);
		setTrainingDay(updatedTrainingDay);
		Alert.alert("Тренировка начата", "Удачной тренировки!");
	};

	const finishTrainingDay = async () => {
		if (!trainingDay) return;
		setIsTrainingDayStarted(false);
		const now = new Date();
		const updatedTrainingDay = {
			...trainingDay,
			status: "COMPLETED",
			endTime: now,
			modifiedDate: now,
			modifiedBy: user?.id ?? 0,
		};
		await trainingDayService.updateTrainingDay(updatedTrainingDay);
		setTrainingDay(updatedTrainingDay);
		Alert.alert("Тренировка завершена", `Время тренировки: ${formatTime(trainingDayTime)}`);
	};

	const deleteTrainingDay = async () => {
		Alert.alert(
			"Удаление тренировки",
			"Вы действительно хотите удалить тренировку?",
			[
				{text: "Отмена", style: "cancel"},
				{
					text: "Да",
					style: "destructive",
					onPress: async () => {
						await trainingDayService.deleteTrainingDay(id);
						Alert.alert("Удалено", "Тренировка успешно удалена");
						navigation.goBack();
					},
				},
			]
		);
	};

	if (!trainingDay) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Тренировка не найдена</Text>
				<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
					<Text style={styles.buttonText}>Вернуться к тренировкам</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{/* Заголовок */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
					<ArrowLeft size={20}/>
					<Text style={styles.backText}>Назад</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>{trainingDay.name}</Text>
			</View>

			{/* Таймер */}
			{isTrainingDayStarted && (
				<View style={styles.timer}>
					<Clock size={20} color="#007AFF"/>
					<Text style={styles.timerText}>{formatTime(trainingDayTime)}</Text>
				</View>
			)}

			{/* Действия */}
			<View style={styles.actions}>
				{!isTrainingDayStarted && trainingDay.status !== "COMPLETED" && (
					<TouchableOpacity style={styles.startButton} onPress={startTrainingDay}>
						<Play size={16}/>
						<Text style={styles.buttonText}>Начать тренировку</Text>
					</TouchableOpacity>
				)}
				{isTrainingDayStarted && (
					<TouchableOpacity style={styles.stopButton} onPress={finishTrainingDay}>
						<StopCircle size={16}/>
						<Text style={styles.buttonText}>Закончить тренировку</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity style={styles.deleteButton} onPress={deleteTrainingDay}>
					<Trash2 size={16}/>
					<Text style={styles.buttonText}>Удалить</Text>
				</TouchableOpacity>
			</View>

			{/* Статистика */}
			<View style={styles.stats}>
				<Text style={styles.statText}>Общие повторения: {TrainingDayTotals.totalReps}</Text>
				<Text style={styles.statText}>Общий тоннаж: {TrainingDayTotals.totalWeight.toFixed(0)} кг</Text>
				<Text style={styles.statText}>Упражнений: {trainingDay.trainings.length}</Text>
			</View>

			{/* Список упражнений */}
			{trainingDay.trainings.map((training: any, index: number) => {
				const exerciseTotals = calculateExerciseTotals(training);
				return (
					<View key={training.id} style={styles.exerciseCard}>
						<Text style={styles.exerciseTitle}>{index + 1}. {training.exercise.name}</Text>
						<Text style={styles.setsCount}>{formatSetsCount(training.trainingDetails.length)}</Text>

						{/* Подходы */}
						{training.trainingDetails.map((set: any, setIndex: number) => (
							<View key={setIndex} style={styles.setRow}>
								<Text style={styles.setLabel}>Подход {setIndex + 1}</Text>
								<View style={styles.setDetails}>
									<Text>{set.repetition} повторений</Text>
									{set.weight > 0 && <Text>{set.weight} кг</Text>}
								</View>
							</View>
						))}

						{/* Заметки */}
						{training.note && (
							<View style={styles.noteBox}>
								<Text style={styles.noteTitle}>Заметки:</Text>
								<Text>{training.note}</Text>
							</View>
						)}

						{/* Итог упражнения */}
						<View style={styles.exerciseTotals}>
							<Text>Общее количество повторений: {exerciseTotals.totalReps}</Text>
							<Text>Общий тоннаж: {exerciseTotals.totalWeight.toFixed(1)} кг</Text>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {flex: 1, padding: 16, backgroundColor: "#fff"},
	title: {fontSize: 18, textAlign: "center", marginTop: 20},
	button: {backgroundColor: "#007AFF", padding: 12, borderRadius: 6, alignItems: "center", marginTop: 20},
	buttonText: {color: "#fff", fontWeight: "bold"},
	header: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16},
	headerTitle: {fontSize: 20, fontWeight: "bold"},
	backButton: {flexDirection: "row", alignItems: "center"},
	backText: {marginLeft: 5, color: "#007AFF"},
	timer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#f0f8ff",
		borderRadius: 6,
		marginBottom: 16
	},
	timerText: {marginLeft: 8, fontSize: 18},
	actions: {flexDirection: "row", gap: 8, marginBottom: 16},
	startButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "green",
		borderRadius: 6,
		marginRight: 8
	},
	stopButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "red",
		borderRadius: 6,
		marginRight: 8
	},
	deleteButton: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		backgroundColor: "#f44336",
		borderRadius: 6
	},
	stats: {marginTop: 20, marginBottom: 16},
	statText: {fontSize: 16, marginBottom: 4},
	exerciseCard: {padding: 12, backgroundColor: "#f9f9f9", borderRadius: 6, marginBottom: 16},
	exerciseTitle: {fontSize: 16, fontWeight: "bold"},
	setsCount: {fontSize: 14, color: "#555"},
	setRow: {flexDirection: "row", justifyContent: "space-between", paddingVertical: 4},
	setLabel: {fontWeight: "500"},
	setDetails: {flexDirection: "row", gap: 8},
	noteBox: {backgroundColor: "#eee", padding: 8, borderRadius: 6, marginTop: 8},
	noteTitle: {fontWeight: "bold", marginBottom: 4},
	exerciseTotals: {marginTop: 8, backgroundColor: "#e0e0e0", padding: 8, borderRadius: 6},
});
