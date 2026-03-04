import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 💡 Импорт ресурсов
import en from "./locales/en.json";

// --- Ресурсы (Переводы) ---
const resources = {
  en: { translation: en },
};

i18n
  .use(initReactI18next) // Привязка i18next к React
  .init({
    resources,
    lng: "en", // Принудительно устанавливаем английский язык
    fallbackLng: "en",
    debug: __DEV__,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
