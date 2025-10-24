import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Search, ShoppingCart } from "lucide-react-native";
import PlanCard, { TrainingPlan } from "@/components/plans/PlanCard";

const TrainingPlansPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null
  );
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // --- Адаптивные классы Card UI ---
  const screenBg = "bg-background dark:bg-gray-900 ocean:bg-ocean-background";
  const cardBg = "bg-card dark:bg-gray-800 ocean:bg-ocean-card";
  const borderClass =
    "border-border dark:border-gray-700 ocean:border-ocean-border";
  const textFg =
    "text-foreground dark:text-gray-100 ocean:text-ocean-foreground";
  const textMutedFg =
    "text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70";
  const primaryBg = "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary";
  const primaryText =
    "text-primary dark:text-primary-400 ocean:text-ocean-primary";
  const primaryFgText = "text-primary-foreground dark:text-white";
  const mutedBg = "bg-muted dark:bg-gray-700 ocean:bg-ocean-muted";

  const trainingPlans: TrainingPlan[] = [
    {
      id: "1",
      title: "Домашняя сила",
      description:
        "Эффективные тренировки дома без дополнительного оборудования",
      price: 1999,
      originalPrice: 2999,
      duration: "месяц",
      level: "beginner",
      equipmentType: "home",
      exercises: 45,
      workoutsPerWeek: 3,
      features: [
        "Видео-инструкции для каждого упражнения",
        "Программа на 4 недели",
        "Упражнения с собственным весом",
        "Чат-поддержка тренера",
        "Трекинг прогресса",
      ],
      popular: true,
    },
    {
      id: "2",
      title: "Уличная атлетика",
      description: "Воркаут программа для турника и брусьев",
      price: 2499,
      duration: "месяц",
      level: "intermediate",
      equipmentType: "home",
      exercises: 35,
      workoutsPerWeek: 4,
      features: [
        "Прогрессия от простого к сложному",
        "Техника выполнения элементов",
        "Программа силовой выносливости",
        "Подготовка к элементам",
        "Растяжка и восстановление",
      ],
    },
    // Добавьте еще один план для демонстрации full-gym и advanced
    {
      id: "3",
      title: "Про-бодибилдинг",
      description: "Комплексная программа для набора массы в полном зале",
      price: 4999,
      duration: "3 месяца",
      level: "advanced",
      equipmentType: "full-gym",
      exercises: 60,
      workoutsPerWeek: 5,
      features: [
        "Сплит-программа на 5 дней",
        "Подробные схемы питания",
        "Инструкции по сушке и объему",
        "Приоритет на большие мышечные группы",
      ],
      popular: false,
    },
  ];

  const equipmentFilters = [
    { id: "home", label: "Дом/Улица" },
    { id: "basic-gym", label: "Малый зал" },
    { id: "full-gym", label: "Полный зал" },
  ];

  const levelFilters = [
    { id: "beginner", label: "Начинающий" },
    { id: "intermediate", label: "Средний" },
    { id: "advanced", label: "Продвинутый" },
  ];

  const filteredPlans = trainingPlans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipment =
      !selectedEquipment || plan.equipmentType === selectedEquipment;
    const matchesLevel = !selectedLevel || plan.level === selectedLevel;

    return matchesSearch && matchesEquipment && matchesLevel;
  });

  return (
    // ✅ Адаптивный фон для всего экрана
    <ScrollView className={`flex-1 p-4 ${screenBg}`}>
      {/* --- Заголовок --- */}
      <View className="flex-row items-center mb-4 space-x-2">
        {/* ✅ Иконка с основным цветом */}
        <ShoppingCart size={28} className={primaryText} />
        <View>
          {/* ✅ Заголовок с основным цветом текста */}
          <Text className={`text-xl ${textFg}`}>Планы тренировок</Text>
          {/* ✅ Описание с приглушенным цветом текста */}
          <Text className={`text-sm ${textMutedFg}`}>
            Выберите программу под ваш инвентарь и уровень
          </Text>
        </View>
      </View>

      {/* --- Поиск --- */}
      <View className="mb-3">
        <View
          className={`flex-row items-center rounded-lg px-3 py-2 shadow-sm ${cardBg} border ${borderClass}`}
        >
          {/* ✅ Иконка поиска с приглушенным цветом */}
          <Search size={18} className={textMutedFg} />
          <TextInput
            // ✅ Основной цвет текста
            className={`flex-1 ml-2 text-base ${textFg}`}
            placeholder="Поиск по названию..."
            // Placeholder color adjustment for dark/ocean themes
            placeholderTextColor={
              screenBg.includes("dark") || screenBg.includes("ocean")
                ? "#888"
                : "#666"
            }
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
      </View>

      {/* --- Фильтры Оборудования --- */}
      <Text className={`font-semibold mt-2 mb-1 ${textFg}`}>Оборудование</Text>
      <View className="flex-row flex-wrap mb-3">
        {equipmentFilters.map((filter) => {
          const isActive = selectedEquipment === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              className={`px-3 py-1.5 rounded-full mr-2 mb-2 transition-all ${
                // ✅ Адаптивный фон: Primary для активного, Muted для неактивного
                isActive ? primaryBg : mutedBg
              }`}
              onPress={() => setSelectedEquipment(isActive ? null : filter.id)}
            >
              <Text
                // ✅ Адаптивный цвет текста: Primary Foreground для активного, Foreground для неактивного
                className={`text-sm ${isActive ? primaryFgText : textFg}`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* --- Фильтры Уровня --- */}
      <Text className={`font-semibold mb-1 ${textFg}`}>Уровень</Text>
      <View className="flex-row flex-wrap mb-3">
        {levelFilters.map((filter) => {
          const isActive = selectedLevel === filter.id;
          return (
            <TouchableOpacity
              key={filter.id}
              className={`px-3 py-1.5 rounded-full mr-2 mb-2 transition-all ${
                // ✅ Адаптивный фон: Primary для активного, Muted для неактивного
                isActive ? primaryBg : mutedBg
              }`}
              onPress={() => setSelectedLevel(isActive ? null : filter.id)}
            >
              <Text
                // ✅ Адаптивный цвет текста: Primary Foreground для активного, Foreground для неактивного
                className={`text-sm ${isActive ? primaryFgText : textFg}`}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* --- Количество найденных --- */}
      <Text className={`${textMutedFg} mb-2`}>
        Найдено планов: {filteredPlans.length}
      </Text>

      {/* --- Карточки планов (используется обновленный PlanCard) --- */}
      <View>
        {filteredPlans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onPurchase={() => console.log("buy", plan.id)}
            isPurchased={false}
          />
        ))}
      </View>

      {/* --- Пустой результат --- */}
      {filteredPlans.length === 0 && (
        <View className="items-center mt-10">
          {/* ✅ Иконка с приглушенным цветом */}
          <ShoppingCart size={48} className={textMutedFg} />
          {/* ✅ Текст с приглушенным цветом */}
          <Text className={`${textMutedFg} mt-3 text-center`}>
            Планы не найдены. Попробуйте сбросить фильтры.
          </Text>
          <TouchableOpacity
            // ✅ Кнопка с основным фоном
            className={`mt-4 px-5 py-2 rounded-lg ${primaryBg}`}
            onPress={() => {
              setSearchTerm("");
              setSelectedEquipment(null);
              setSelectedLevel(null);
            }}
          >
            {/* ✅ Текст с основным цветом фона */}
            <Text className={`${primaryFgText} font-medium`}>
              Сбросить фильтры
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default TrainingPlansPage;
