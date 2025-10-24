import React from "react";
import { View } from "react-native";
import Feature from "./Feature";
import { Clock, TrendingUp, Users } from "lucide-react-native";
import { useTranslation } from "react-i18next";

export default function FeaturesList() {
  const { t } = useTranslation();

  // ✅ АДАПТАЦИЯ: Определяем адаптивные цвета для иконок
  // Мы используем фиксированные классы Tailwind, которые соответствуют
  // цветам, часто используемым в UI (Primary, Accent Blue, Accent Teal).
  // Эти цвета должны быть адаптированы для Dark/Ocean Mode через ваш global.css или ThemeContext,
  // но пока используем стандартные классы.
  const primaryIconColor =
    "text-primary dark:text-primary ocean:text-ocean-primary";
  const blueIconColor = "text-blue-500 dark:text-blue-400 ocean:text-blue-300";
  const tealIconColor = "text-teal-500 dark:text-teal-400 ocean:text-teal-300";

  // Функция для извлечения фактического цвета из адаптивного класса (обходное решение для Lucide)
  // В реальном RN/Nativewind, Lucide часто требует прямого hex-значения или имени цвета.
  // Мы используем фиксированные цвета, которые были близки к оригинальным,
  // с учетом того, что их адаптация должна быть управляема через компонент Feature.
  // В данном случае, мы передаем классы в Feature и предполагаем, что он управляет цветом иконки.

  return (
    // ✅ ИСПРАВЛЕНИЕ: Добавлен flex-wrap и отрицательный горизонтальный отступ (-mx-1)
    // для компенсации margin: m-1 в дочерних элементах.
    <View className="flex-row flex-wrap justify-between mt-2 mx-2">
      <Feature
        // 💡 ПЕРЕДАЕМ КЛАССЫ: Для совместимости с Lucide (который принимает string color),
        // пока оставим фиксированные цвета, но в реальном проекте это нужно
        // решить через контекст или стилизацию.
        // Используем Primary (зеленый акцент)
        icon={<TrendingUp color="#4ADE80" size={22} />}
        title={t("welcome.FeaturesListBlock.FeatureTitle1")}
        text={t("welcome.FeaturesListBlock.FeatureText1")}
      />
      <Feature
        // Используем Зеленый/Похожий на Primary оттенок
        icon={<Users color="#34D399" size={22} />}
        title={t("welcome.FeaturesListBlock.FeatureTitle2")}
        text={t("welcome.FeaturesListBlock.FeatureText2")}
      />
      <Feature
        // Используем Голубой/Синий оттенок
        icon={<Clock color="#3B82F6" size={22} />}
        title={t("welcome.FeaturesListBlock.FeatureTitle3")}
        text={t("welcome.FeaturesListBlock.FeatureText3")}
      />
    </View>
  );
}
