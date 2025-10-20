import {Text, View} from "react-native";
import {Calendar} from "lucide-react-native";

export default function WeeklyActivitySection({
												  weeklyStats,
												  completedDays,
												  totalDays,
												  weekProgress,
											  }: any) {
	return (
		<View className="bg-gray-50 p-4 rounded-xl mb-4">
			<View className="flex-row items-center mb-3">
				<Calendar size={20} color="#000"/>
				<Text className="ml-2 text-lg font-bold">Активность на этой неделе</Text>
			</View>

			{weeklyStats && weeklyStats.length > 0 ? (
				<>
					<View className="flex-row justify-between mb-3">
						{weeklyStats.map((stat: any) => (
							<View key={stat.day} className="items-center">
								<Text className="text-xs">{stat.day}</Text>
								<View
									className={`w-7 h-7 rounded-full items-center justify-center ${
										stat.completed ? "bg-blue-500" : "bg-gray-400"
									}`}
								>
									<Text className="text-white">{stat.completed ? "✓" : "○"}</Text>
								</View>
							</View>
						))}
					</View>

					<View>
						<View className="flex-row justify-between">
							<Text className="text-sm">Прогресс недели</Text>
							<Text className="text-sm">
								{completedDays}/{totalDays} дней
							</Text>
						</View>
						<View className="h-2 bg-gray-300 rounded-full mt-1 overflow-hidden">
							<View
								className="h-2 bg-blue-500 rounded-full"
								style={{width: `${weekProgress}%`}}
							/>
						</View>
					</View>
				</>
			) : (
				<Text className="text-center text-gray-500">Нет данных за эту неделю</Text>
			)}
		</View>
	);
}