import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Українська" },
];

export default function LanguageSelector() {
  // 💡 Получаем объект i18n
  const { i18n } = useTranslation();

  // Инициализируем состояние текущим языком из i18n
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // 💡 Синхронизация состояния с языком i18next, если он меняется внешне
  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const changeLanguage = (code: string) => {
    // 💡 Основная логика: меняем язык через i18next
    i18n.changeLanguage(code);

    // Обновляем локальное состояние для обновления стилей
    setSelectedLanguage(code);
  };

  return (
    <View className="flex-row flex-wrap my-2">
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          className={`px-4 py-2 m-1 border rounded-lg ${
            selectedLanguage === lang.code
              ? "bg-blue-600 border-blue-600"
              : "border-blue-600"
          }`}
          onPress={() => changeLanguage(lang.code)}
        >
          <Text
            className={`${
              selectedLanguage === lang.code ? "text-white" : "text-blue-600"
            }`}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
