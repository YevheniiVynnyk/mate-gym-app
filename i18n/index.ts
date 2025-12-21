import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage"; // для сохранения выбранного языка
import * as Localization from "expo-localization"; // для получения системного языка

// 💡 Импорт ресурсов
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uk from "./locales/uk.json";

// --- Плагины ---
// Можете использовать специализированный бэкенд для React Native,
// но для начала достаточно простого объекта с переводами.
// Если хотите сохранить язык пользователя, используйте LanguageDetector.

const STORE_LANGUAGE_KEY = "settings.language";

// Создадим простой LanguageDetector, который попытается получить язык из AsyncStorage,
// а если не найдет, то использует системный язык (через expo-localization).
const languageDetector = {
  type: "languageDetector",
  async: true,
  init: () => {},
  // Попытка загрузить язык из AsyncStorage
  // @ts-ignore
  detect: async (callback: (lang: string) => void) => {
    try {
      const storedLanguage = await AsyncStorage.getItem(STORE_LANGUAGE_KEY);
      if (storedLanguage) {
        return callback(storedLanguage);
      }
    } catch (error) {
      console.log("Error reading language from storage", error);
    }
    const fallbackLanguage = "en"; // Язык по умолчанию

    // Если не найдено, используем системный язык, но только поддерживаемые

    // 💡 ИСПРАВЛЕНИЕ: Добавляем проверку на null или используем оператор ??
    const locale = Localization.getLocales()[0];
    const systemLanguageCandidate = locale.languageCode;

    // Используем запасной 'en', если systemLanguageCandidate === null
    const systemLanguage = systemLanguageCandidate ?? fallbackLanguage;

    // Список поддерживаемых языков (должен соответствовать импортам JSON)
    const supportedLanguages = Object.keys(resources);

    const initialLanguage = supportedLanguages.includes(systemLanguage)
      ? systemLanguage
      : fallbackLanguage;

    callback(initialLanguage);
  },

  // Сохранение выбранного языка в AsyncStorage
  // @ts-ignore
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {
      console.log("Error saving language to storage", error);
    }
  },
};

// --- Ресурсы (Переводы) ---
// Создайте соответствующие файлы в /i18n/locales/...
// Для примера используем встроенные
// 💡 Объединяем импортированные ресурсы в один объект
const resources = {
  en: { translation: en },
  ru: { translation: ru },
  uk: { translation: uk },
  // ... добавьте остальные языки
};

i18n
  // @ts-ignore
  .use(languageDetector) // Использование нашего кастомного детектора
  .use(initReactI18next) // Привязка i18next к React
  .init({
    resources,
    fallbackLng: "en", // Язык по умолчанию, если выбранный язык недоступен
    debug: true, // В режиме разработки
    interpolation: {
      escapeValue: false, // Не обязательно для React Native
    },
    // ns: ['translation'], // Пространства имен (можно опустить, если одно)
    // defaultNS: 'translation',
  });

export default i18n;
