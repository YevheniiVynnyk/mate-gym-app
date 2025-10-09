import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Calendar} from "react-native-calendars";
import {useNavigation} from "@react-navigation/native";
import {Clock, Filter, Search, Target, Users} from "lucide-react-native";
import {useAuth} from "@/contexts/AuthContext";
import {trainingDayService} from "@/services/trainingDayService";
import {mapFromAPI} from "@/services/mapper/trainingDayMapper";
import {useTrainingDays} from "@/contexts/TrainingDaysContext";

export default function TrainingDayView() {
	const navigation = useNavigation();
	const {user} = useAuth();

	const [selectedDate, setSelectedDate] = useState<string>();
	const [searchTerm, setSearchTerm] = useState("");
	const {trainingDays, setTrainingDays} = useTrainingDays();
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("calendar");

	useEffect(() => {
		const loadTrainingDays = async () => {
			try {
				setIsLoading(true);
				const apiTrainingDays = await trainingDayService.getAllTrainingDays();
				const adaptedTrainingDays = apiTrainingDays.map(mapFromAPI);
				setTrainingDays(adaptedTrainingDays);
			} catch (error) {
				console.error("Failed to load training days:", error);
				setTrainingDays([]);
			} finally {
				setIsLoading(false);
			}
		};
		loadTrainingDays();
	}, []);

	const filteredTrainingDays = trainingDays.filter(td =>
		td.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const selectedDateTrainingDays = selectedDate
		? trainingDays.filter(
			td => td.date.toISOString().split("T")[0] === selectedDate
		)
		: [];

	const formatDuration = (minutes: number) => {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return hours > 0 ? `${hours}ч ${mins}м` : `${mins}м`;
	};

	const renderTrainingCard = (trainingDay: any) => (
		<TouchableOpacity
			key={trainingDay.id}
			style={styles.card}
			onPress={() =>
				navigation.navigate("TrainingDayDetail", {id: trainingDay.id})
			}
		>
			<View style={styles.cardHeader}>
				<Text style={styles.cardTitle}>{trainingDay.name}</Text>
				<View style={[
					styles.badge,
					trainingDay.status === "COMPLETED"
						? styles.badgeCompleted
						: styles.badgeScheduled
				]}>
					<Text style={styles.badgeText}>
						{trainingDay.status === "COMPLETED" ? "Завершена" : "Запланирована"}
					</Text>
				</View>
			</View>

			<Text style={styles.cardDate}>
				{trainingDay.date.toLocaleDateString()}
			</Text>

			<View style={styles.cardBody}>
				<View style={styles.cardInfo}>
					<Clock size={16}/>
					<Text style={styles.infoText}>
						{trainingDay.durationMinutes
							? formatDuration(trainingDay.durationMinutes)
							: "Не указано"}
					</Text>
				</View>
				<View style={styles.cardInfo}>
					<Target size={16}/>
					<Text style={styles.infoText}>
						{trainingDay.trainings.length} упражнений
					</Text>
				</View>
				{user?.role === "TRAINER" && trainingDay.clientId && (
					<View style={styles.cardInfo}>
						<Users size={16}/>
						<Text style={styles.infoText}>Клиент</Text>
					</View>
				)}
			</View>
		</TouchableOpacity>
	);

	if (isLoading) {
		return (
			<View style={styles.loader}>
				<ActivityIndicator size="large"/>
			</View>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{/* Заголовок */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Мои тренировки</Text>
				<Text style={styles.headerSubtitle}>
					Просматривайте и планируйте свои тренировки
				</Text>
			</View>

			{/* Кнопка создать */}
			<TouchableOpacity
				style={styles.createButton}
				onPress={() => navigation.navigate("CreateTrainingDay")}
			>
				<Text style={styles.createButtonText}>Создать тренировку</Text>
			</TouchableOpacity>

			{/* Таблицы */}
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[
						styles.tabButton,
						activeTab === "calendar" && styles.activeTab
					]}
					onPress={() => setActiveTab("calendar")}
				>
					<Text style={activeTab === "calendar" ? styles.activeTabText : styles.tabText}>
						Календарь
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tabButton,
						activeTab === "list" && styles.activeTab
					]}
					onPress={() => setActiveTab("list")}
				>
					<Text style={activeTab === "list" ? styles.activeTabText : styles.tabText}>
						Список
					</Text>
				</TouchableOpacity>
			</View>

			{/* Calendar Tab */}
			{activeTab === "calendar" && (
				<View>
					<Calendar
						onDayPress={day => setSelectedDate(day.dateString)}
						markedDates={{
							[selectedDate || ""]: {selected: true, selectedColor: "#00adf5"}
						}}
					/>

					{selectedDate && (
						<View style={{marginTop: 10}}>
							<Text style={styles.subTitle}>
								Тренировки на {selectedDate}
							</Text>
							{selectedDateTrainingDays.length > 0 ? (
								selectedDateTrainingDays.map(renderTrainingCard)
							) : (
								<Text style={styles.noData}>Нет тренировок на эту дату</Text>
							)}
						</View>
					)}
				</View>
			)}

			{/* List Tab */}
			{activeTab === "list" && (
				<View>
					<View style={styles.searchContainer}>
						<Search size={20}/>
						<TextInput
							style={styles.searchInput}
							placeholder="Поиск тренировок..."
							value={searchTerm}
							onChangeText={setSearchTerm}
						/>
						<TouchableOpacity>
							<Filter size={20}/>
						</TouchableOpacity>
					</View>

					{filteredTrainingDays.length > 0 ? (
						filteredTrainingDays.map(renderTrainingCard)
					) : (
						<Text style={styles.noData}>
							Тренировки не найдены
						</Text>
					)}
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {flex: 1, padding: 16, backgroundColor: "#f9f9f9"},
	header: {marginBottom: 16},
	headerTitle: {fontSize: 24, fontWeight: "bold"},
	headerSubtitle: {color: "#666"},
	createButton: {backgroundColor: "#007bff", padding: 12, borderRadius: 8, marginBottom: 16},
	createButtonText: {color: "#fff", fontWeight: "bold", textAlign: "center"},
	tabContainer: {flexDirection: "row", marginBottom: 16},
	tabButton: {flex: 1, padding: 12, alignItems: "center", backgroundColor: "#ddd"},
	activeTab: {backgroundColor: "#007bff"},
	tabText: {color: "#333"},
	activeTabText: {color: "#fff", fontWeight: "bold"},
	subTitle: {fontSize: 18, fontWeight: "bold", marginBottom: 8},
	loader: {flex: 1, justifyContent: "center", alignItems: "center"},
	card: {
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2
	},
	cardHeader: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
	cardTitle: {fontSize: 16, fontWeight: "bold"},
	badge: {paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12},
	badgeCompleted: {backgroundColor: "#28a745"},
	badgeScheduled: {backgroundColor: "#ffc107"},
	badgeText: {color: "#fff", fontSize: 12},
	cardDate: {color: "#666", fontSize: 12, marginTop: 4},
	cardBody: {marginTop: 8},
	cardInfo: {flexDirection: "row", alignItems: "center", marginBottom: 4},
	infoText: {marginLeft: 4, fontSize: 12, color: "#333"},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		borderRadius: 8,
		marginBottom: 16
	},
	searchInput: {flex: 1, marginLeft: 8},
	noData: {textAlign: "center", color: "#999", marginTop: 20}
});
