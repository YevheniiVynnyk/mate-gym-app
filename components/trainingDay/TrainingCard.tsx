import React, {memo, useCallback} from "react";
import {Pressable, Text, View} from "react-native";
import {Clock, Target} from "lucide-react-native";
import {useRouter} from "expo-router";
import {Training, TrainingDay} from "@/types/trainingDay";

type TrainingCardProps = {
	trainingDay: TrainingDay;
};
const TrainingCard: React.FC<TrainingCardProps> = memo(({trainingDay}) => {
	const router = useRouter();

	const handlePress = useCallback(() => {
		router.push(`/trainingDay/${trainingDay.id}`);
	}, [router, trainingDay.id]);

	const isCompleted = trainingDay.status === "COMPLETED";

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
			<View className="mt-3 space-y-2">
				{/* Первая строка с двумя InfoRow */}
				<View className="flex-row justify-between">
					<InfoRow
						icon={<Clock size={16} color="orange"/>}
						text={formatDuration(trainingDay.durationMinutes)}
					/>
					<InfoRow
						icon={<Target size={16} color="green"/>}
						text={`${trainingDay.trainings.length} упражнений`}
					/>
				</View>

				{/* Вторая строка с InfoTraining */}
				<InfoTraining trainings={trainingDay.trainings}/>
			</View>
		</Pressable>
	);
});

TrainingCard.displayName = "TrainingCard";

export default TrainingCard;

const InfoRow = ({
					 icon,
					 text,
				 }: {
	icon: React.ReactNode;
	text: string;
}) => (
	<View className="m-1">
		<View className="flex-row items-center">
			{icon}
			<Text className="ml-2 text-xs text-foreground">{text}</Text>
		</View>
	</View>
);

const InfoTraining = ({trainings}: { trainings: Training[] }) => (
	<View className="mt-1 p-1 rounded-lg">
		{trainings.map((t) => (
			<View key={t.id} className="bg-white rounded-lg p-2 m-1 border border-gray-200">
				{/* Название упражнения */}
				<Text className="text-sm font-semibold text-gray-700 mb-1">{t.exercise.name}</Text>

				{/* Подходы как плитки */}
				<View className="flex-row flex-wrap justify-around">
					{t.trainingDetails.map((d, i) => (
						<View
							key={i}
							className="bg-gray-200 rounded-md p-1"
						>
							<Text className="text-xs text-gray-700">
								{d.set} × {d.repetition} {d.weight ? `× ${d.weight}кг` : ""}
							</Text>
						</View>
					))}
				</View>

				{/* Примечания */}
				{t.note && (
					<Text className="text-xs text-gray-400 mt-1">
						{t.note}
					</Text>
				)}
			</View>
		))}
	</View>
);