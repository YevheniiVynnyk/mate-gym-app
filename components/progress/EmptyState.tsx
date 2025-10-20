import { Text, TouchableOpacity, View } from "react-native";
import { TrendingUp } from "lucide-react-native";

export default function EmptyState() {
  return (
    <View className="flex-1 justify-center items-center p-5">
      <TrendingUp size={50} color="#999" />
      <Text className="text-xl font-bold mt-2 text-center">
        Нет данных для отображения
      </Text>
      <Text className="text-center text-gray-500 mt-1">
        Похоже, вы ещё не добавили ни одной тренировки или записи о весе.
      </Text>
      <TouchableOpacity
        className="bg-blue-500 px-4 py-3 rounded-lg mt-4"
        onPress={() => console.log("Добавить тренировку")}
      >
        <Text className="text-white font-bold">
          ➕ Добавить первую тренировку
        </Text>
      </TouchableOpacity>
    </View>
  );
}
