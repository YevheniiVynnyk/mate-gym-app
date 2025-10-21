import React from "react";
import { Text, View } from "react-native";
import { Dumbbell } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  return (
    <View className="items-center mb-4">
      <View className="flex-row items-center justify-center gap-3 mb-4">
        <View className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
          <Dumbbell color="#fff" size={28} />
        </View>
        <Text className="text-3xl font-bold text-foreground font-sans">
          {t("nameApp")}
        </Text>
      </View>

      <Text className="text-center text-2xl font-bold leading-tight font-sans">
        {t("welcome.captionText1") + " "}
        <Text className="text-primary font-sans">
          {t("welcome.captionText2") + " "}
        </Text>{" "}
        {t("welcome.captionText3") + " "}
      </Text>

      <Text className="text-center text-muted-foreground mt-3 px-3 leading-relaxed font-sans">
        {t("welcome.captionText4") + " "}
      </Text>
    </View>
  );
}
