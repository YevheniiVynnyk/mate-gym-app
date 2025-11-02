import { Text, TouchableOpacity, View } from "react-native";
import LanguageSelector from "@/components/profile/LanguageSelector";
import ThemeSelector from "@/components/profile/ThemeSelector";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

export default function SettingsSection({ handleLogout }: any) {
  const { t } = useTranslation();
  return (
    <Card className="p-4 mb-4 ">
      <CardHeader className="flex-row justify-between items-center pb-0 items-center">
        <CardTitle className="text-lg font-semibold mb-0">
          {t("SettingsSection.title")}
        </CardTitle>
      </CardHeader>
      <LanguageSelector />
      <ThemeSelector />
      <TouchableOpacity
        className="bg-red-600 dark:bg-red-700 ocean:bg-red-800 py-2 rounded-md mt-3 items-center"
        onPress={handleLogout}
      >
        <Text className="text-white font-bold">
          {t("SettingsSection.logout")}
        </Text>
      </TouchableOpacity>
    </Card>
  );
}
