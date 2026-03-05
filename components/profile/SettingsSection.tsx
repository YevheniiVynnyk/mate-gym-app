import { Text, TouchableOpacity, View } from "react-native";
import LanguageSelector from "@/components/profile/LanguageSelector";
import ThemeSelector from "@/components/profile/ThemeSelector";
import BiometricSelector from "@/components/profile/BiometricSelector";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/Card";
import { LogOut, Settings } from "lucide-react-native";

export default function SettingsSection({ handleLogout }: any) {
  const { t } = useTranslation();
  return (
    <Card className="mb-6 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-3xl border-0 shadow-sm overflow-hidden">
      <View className="flex-row items-center px-6 py-4 border-b border-border/50 dark:border-gray-700">
        <Settings size={20} className="text-foreground dark:text-gray-100 mr-3" />
        <Text className="text-lg font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          {t("SettingsSection.title")}
        </Text>
      </View>
      
      <View className="p-4 space-y-4">
        <BiometricSelector />
        <LanguageSelector />
        <ThemeSelector />
        
        <TouchableOpacity
          className="flex-row items-center justify-center bg-red-50 dark:bg-red-900/20 py-4 rounded-xl mt-4 active:opacity-80"
          onPress={handleLogout}
        >
          <LogOut size={20} className="text-red-600 dark:text-red-400 mr-2" />
          <Text className="text-red-600 dark:text-red-400 font-bold text-base">
            {t("SettingsSection.logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}
