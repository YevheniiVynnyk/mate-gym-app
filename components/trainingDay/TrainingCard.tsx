import React, {memo, useCallback} from "react";
import {Pressable, Text, View} from "react-native";
import {Clock, Target, Users} from "lucide-react-native";
import {useNavigation} from "@react-navigation/native";
import {useAuth} from "@/contexts/AuthContext";

type TrainingCardProps = {
	trainingDay: {
		id: number;
		name: string;
		status: "COMPLETED" | "CREATED" | "PLANNED";
		date: string | Date;
		durationMinutes?: number;
		trainings: any[];
		clientId?: number | null;
	};
};

const formatDuration = (minutes?: number) => {
	if (!minutes) return "Не указано";
	const h = Math.floor(minutes / 60);
	const m = minutes % 60;
	return h > 0 ? `${h}ч ${m}м` : `${m}м`;
};

const formatDate = (date: string | Date) =>
	new Date(date).toLocaleDateString("ru-RU", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});

const TrainingCard: React.FC<TrainingCardProps> = memo(({trainingDay}) => {
	const navigation = useNavigation();
	const {user} = useAuth();

	const handlePress = useCallback(() => {
		navigation.navigate("TrainingDayDetail", {id: trainingDay.id});
	}, [navigation, trainingDay.id]);

	const isCompleted = trainingDay.status === "COMPLETED";

	return (
		<Pressable
			onPress={handlePress}
			className="bg-card rounded-2xl p-4 mb-3 shadow-sm shadow-black/10 active:opacity-80"
		>
			{/* HEADER */}
			<View className="flex-row justify-between items-center">
				<Text className="text-base font-bold text-foreground">
					{trainingDay.name}
				</Text>

				<View
					className={`px-2 py-1 rounded-full ${
						isCompleted ? "bg-green-500" : "bg-yellow-400"
					}`}
				>
					<Text className="text-xs text-white font-semibold">
						{isCompleted ? "Завершена" : "Запланирована"}
					</Text>
				</View>
			</View>

			{/* DATE */}
			<Text className="text-xs text-muted-foreground mt-1">
				{formatDate(trainingDay.date)}
			</Text>

			{/* INFO */}
			<View className="mt-3 space-y-1.5">
				<InfoRow
					icon={<Clock size={16} color="#555"/>}
					text={formatDuration(trainingDay.durationMinutes)}
				/>
				<InfoRow
					icon={<Target size={16} color="#555"/>}
					text={`${trainingDay.trainings.length} упражнений`}
				/>
				{user?.role === "TRAINER" && trainingDay.clientId && (
					<InfoRow
						icon={<Users size={16} color="#555"/>}
						text="Клиент"
					/>
				)}
			</View>
		</Pressable>
	);
});

export default TrainingCard;
const InfoRow = ({
					 icon,
					 text,
				 }: {
	icon: React.ReactNode;
	text: string;
}) => (
	<View className="flex-row items-center">
		{icon}
		<Text className="ml-2 text-xs text-foreground">{text}</Text>
	</View>
);
