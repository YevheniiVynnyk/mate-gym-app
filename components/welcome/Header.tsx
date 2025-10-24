import React from "react";
import { Text, View } from "react-native";
import { Dumbbell } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  // --- Адаптивные классы Card UI ---
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const textMutedFg =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70";
  const primaryBg = "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";
  const primaryText = "text-primary dark:text-primary ocean:text-ocean-primary";

  return (
    <View className="items-center mb-4">
      {/* Логотип и Название приложения */}
      <View className="flex-row items-center justify-center gap-3 mb-4">
        {/* Адаптивный фон для иконки (primary color) */}
        <View
          className={`w-12 h-12 ${primaryBg} rounded-xl flex items-center justify-center`}
        >
          <Dumbbell color="#fff" size={28} />
        </View>
        {/* Адаптивный цвет текста для названия приложения */}
        <Text className={`text-3xl font-bold font-sans ${textFg}`}>
          {t("nameApp")}
        </Text>
      </View>

      {/* Основной заголовок с акцентом */}
      <Text
        className={`text-center text-2xl font-bold leading-tight font-sans ${textFg}`}
      >
        {t("welcome.captionText1") + " "}
        {/* Адаптивный акцентный цвет текста */}
        <Text className={`font-sans ${primaryText}`}>
          {t("welcome.captionText2") + " "}
        </Text>{" "}
        {t("welcome.captionText3") + " "}
      </Text>

      {/* Описание */}
      <Text
        className={`text-center mt-3 px-3 leading-relaxed font-sans ${textMutedFg}`}
      >
        {t("welcome.captionText4") + " "}
      </Text>
    </View>
  );
}
