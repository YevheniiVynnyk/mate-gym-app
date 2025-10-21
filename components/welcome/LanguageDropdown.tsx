import React, { useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";

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

  // 💡 Используем i18n.language напрямую, без дополнительного useState,
  // так как Picker обновится, когда i18n.language изменится.

  const changeLanguage = (code: string) => {
    // 💡 Основная логика: меняем язык через i18next
    i18n.changeLanguage(code);
    // UI обновится автоматически, так как i18n.language обновится
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      {/* Picker на iOS отображается по-другому, чем на Android. 
        Нам нужно стилизовать его для хорошего отображения вверху экрана.
      */}
      <Picker
        selectedValue={i18n.language}
        onValueChange={(itemValue: string) => changeLanguage(itemValue)}
        // 💡 ИСПРАВЛЕНИЕ: Добавляем prompt, используя перевод
        prompt={t("selectLanguage")}
        style={[
          styles.pickerBase,
          Platform.OS === "ios" && styles.pickerIOS,
          {
            color: "#3b82f6",
            // 💡 ВАЖНОЕ ИСПРАВЛЕНИЕ ДЛЯ ANDROID:
            textAlign: "right", // Или 'center', чтобы заставить текст появиться
          },
        ]}
        itemStyle={Platform.OS === "ios" ? styles.itemIOS : null}
        dropdownIconColor="#3b82f6"
      >
        {languages.map((lang) => (
          <Picker.Item
            key={lang.code}
            label={lang.label}
            value={lang.code}
            color="#3b82f6" // Цвет текста
          />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // 💡 Вернуть рабочие размеры
    width: 150,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    // 💡 Убрать красный фон
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  shadow: {
    // Добавьте тень, если это нужно для NativeWind "shadow-xl"
    // Пример тени (может отличаться от shadow-xl в NativeWind)
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  pickerBase: {
    width: "100%",
    height: "100%",
  },
  pickerIOS: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    marginTop: -5,
    marginLeft: -5,
  },
  itemIOS: {
    fontSize: 14,
    height: 40,
  },
});
