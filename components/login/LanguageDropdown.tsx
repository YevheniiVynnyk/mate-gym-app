import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

const languages = [
  { label: "🇺🇸 English", value: "en" },
  { label: "🇷🇺 Русский", value: "ru" },
  { label: "🇺🇦 Українська", value: "uk" },
];

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();

  const pickerTextColor = theme === "ocean" ? "#33c9ff" : "#4ADE80";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(i18n.language);

  // Обновляем язык при смене через i18n
  useEffect(() => {
    i18n.changeLanguage(value);
  }, [value]);

  return (
    <View className="absolute top-4 right-4 z-50">
      <DropDownPicker
        open={open}
        value={value}
        items={languages}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={t("selectLanguage")}
        style={[
          { backgroundColor: theme === "ocean" ? "#1E3A8A" : "#fff" },
          {
            borderColor: theme === "ocean" ? "#33c9ff" : "#ccc",
          },
        ]}
        textStyle={{ color: pickerTextColor, fontWeight: "500" }}
        dropDownContainerStyle={{
          backgroundColor: theme === "ocean" ? "#1E3A8A" : "#fff",
          borderColor: theme === "ocean" ? "#33c9ff" : "#ccc",
        }}
        containerStyle={{ width: 130 }}
        zIndex={9999} // overlay поверх всего
        zIndexInverse={9999} // для безопасного рендера
      />
    </View>
  );
}
