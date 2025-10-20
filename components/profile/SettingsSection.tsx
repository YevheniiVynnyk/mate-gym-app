import { Text, TouchableOpacity, View } from "react-native";
import LanguageSelector from "@/components/profile/LanguageSelector";
import ThemeSelector from "@/components/profile/ThemeSelector";

export default function SettingsSection({ handleLogout }: any) {
  return (
    <View className="bg-white p-4 rounded-lg mb-4 shadow-sm">
      <Text className="text-lg font-semibold mb-2">Настройки и действия</Text>
      <LanguageSelector />
      <ThemeSelector />
      <TouchableOpacity
        className="bg-red-500 py-2 rounded-md mt-3 items-center"
        onPress={handleLogout}
      >
        <Text className="text-white font-bold">Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}
