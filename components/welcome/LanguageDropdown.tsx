import React from "react";
import { Platform, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@/contexts/ThemeContext"; // ✅ Импортируем хук темы

const languages = [
  // 🇺🇸 Флаг США (English)
  { code: "en", label: "🇺🇸 English" },
  // 🇷🇺 Флаг России (Русский)
  { code: "ru", label: "🇷🇺 Русский" },
  // 🇺🇦 Флаг Украины (Українська)
  { code: "uk", label: "🇺🇦 Українська" },
];

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  // --- Адаптивные классы ---
  // Цвет текста: Акцентный цвет (primary) для текста в Picker
  const pickerTextColor = theme === "ocean" ? "#33c9ff" : "#4ADE80"; // Пример акцентного цвета
  // Цвет фона и рамки: bg-card и border-border
  const pickerBgClass =
    "bg-card border-border dark:bg-gray-700 dark:border-gray-600 ocean:bg-ocean-card ocean:border-blue-700";

  // Так как Picker сложно стилизовать через Nativewind, используем
  // инлайн-стили для критических свойств (width/height/color) и
  // классы для фона/рамки (где Nativewind более надежен).

  return (
    <View
      // ✅ АДАПТАЦИЯ: Применяем классы фона и рамки для адаптивности
      // Используем w-36 (144px) для ширины и h-10 (40px) для высоты
      className={`w-36 h-10 rounded-lg overflow-hidden border shadow-xl ${pickerBgClass}`}
    >
      <Picker
        selectedValue={i18n.language}
        onValueChange={(itemValue: string) => changeLanguage(itemValue)}
        prompt={t("selectLanguage")}
        // 💡 ИСПРАВЛЕНИЕ: Используем инлайн-стили для ширины/высоты и цвета текста,
        // так как Picker плохо поддерживает классы.
        style={{
          width: "100%",
          height: "100%",
          // 💡 ИСПРАВЛЕНИЕ ТЕКСТА: Устанавливаем цвет текста
          color: pickerTextColor,
          // 💡 ИСПРАВЛЕНИЕ ДЛЯ ANDROID:
          textAlign: "right",
          // Немного сдвигаем на iOS для центрирования
          ...(Platform.OS === "ios" && {
            transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
            marginTop: -5,
            marginLeft: -5,
          }),
        }}
        dropdownIconColor={pickerTextColor} // Цвет иконки (стрелки)
      >
        {languages.map((lang) => (
          <Picker.Item
            key={lang.code}
            label={lang.label}
            value={lang.code}
            // 💡 ИСПРАВЛЕНИЕ: Цвет текста элемента списка
            color={pickerTextColor}
            // 💡 Нельзя использовать itemStyle для Android, только iOS
            style={
              Platform.OS === "ios" ? { fontSize: 14, height: 40 } : undefined
            }
          />
        ))}
      </Picker>
    </View>
  );
}
