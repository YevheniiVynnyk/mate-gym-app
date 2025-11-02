import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
// ✅ Импортируем cn для условной стилизации
import { cn } from "@/components/ui/Card";

export type DayStatus = "CREATED" | "IN_PROGRESS" | "COMPLETED";

interface CalendarProps {
  selectedDate: string | undefined;
  setSelectedDate: (date: string) => void;
  trainingDays: { date: string; status: DayStatus }[];
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  setSelectedDate,
  trainingDays,
}) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const today = dayjs().format("YYYY-MM-DD");

  // Логика построения сетки календаря
  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const daysInMonth = endOfMonth.date();
  const startDay = (startOfMonth.day() + 6) % 7; // Начинаем с понедельника

  const weeks: { day: number; monthOffset: number }[][] = [];
  let dayCounter = 1 - startDay;
  for (let week = 0; week < 6; week++) {
    const days: { day: number; monthOffset: number }[] = [];
    for (let d = 0; d < 7; d++) {
      let monthOffset = 0;
      let day = dayCounter;
      if (dayCounter < 1) {
        day =
          startOfMonth.subtract(1, "month").endOf("month").date() + dayCounter;
        monthOffset = -1;
      } else if (dayCounter > daysInMonth) {
        day = dayCounter - daysInMonth;
        monthOffset = 1;
      }
      days.push({ day, monthOffset });
      dayCounter++;
    }
    weeks.push(days);
  }
  const getDayStyle = (dayObj: { day: number; monthOffset: number }) => {
    const { day, monthOffset } = dayObj;
    let dateKey = currentMonth.date(day).format("YYYY-MM-DD");

    if (monthOffset === -1)
      dateKey = currentMonth
        .subtract(1, "month")
        .date(day)
        .format("YYYY-MM-DD");
    if (monthOffset === 1)
      dateKey = currentMonth.add(1, "month").date(day).format("YYYY-MM-DD");

    const td = trainingDays.find((t) => t.date === dateKey);
    const isSelected = dateKey === selectedDate;
    const isToday = dateKey === today;
    const isCurrentMonth = monthOffset === 0;

    let containerClasses = "w-10 h-10 justify-center items-center rounded-lg";
    let textClasses = "font-medium";
    let statusClass = "";

    // 1. Стилизация по статусу тренировки
    if (td) {
      switch (td.status) {
        case "COMPLETED":
          // Зеленый фон с прозрачностью и зеленый текст
          statusClass =
            "bg-green-500/20 text-green-600 dark:text-green-400 ocean:bg-green-600/20 ocean:text-green-400";
          break;
        case "IN_PROGRESS":
          // Синий фон с прозрачностью и синий текст
          statusClass =
            "bg-blue-500/20 text-blue-600 dark:text-blue-400 ocean:bg-blue-600/20 ocean:text-blue-400";
          break;
        default:
          // Стандартный фон для запланированных
          statusClass = "bg-secondary text-foreground";
      }
    } else {
      // Нет тренировки - просто фоновый цвет карточки (прозрачный)
      statusClass = "bg-transparent text-foreground";
    }

    // 2. Стилизация "Сегодня" (может перекрывать базовый статус тренировки)
    if (isToday) {
      // Бордюр акцентного цвета (например, primary)
      containerClasses +=
        " border-2 border-primary dark:border-green-500 ocean:border-ocean-primary";
    }

    // 3. Стилизация "Выбранный день" (перекрывает всё, кроме isToday)
    if (isSelected) {
      // Фон-акцент, белый/светлый текст.
      containerClasses =
        "w-10 h-10 justify-center items-center rounded-lg border-2 " +
        "bg-primary border-primary dark:bg-primary-600 dark:border-primary-600 ocean:bg-ocean-primary ocean:border-ocean-primary";
      textClasses =
        "font-bold text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground";
      return { containerClasses, textClasses }; // Выбранный день имеет приоритет
    }

    // 4. Окончательная сборка классов контейнера (без isSelected)
    containerClasses = cn(containerClasses, statusClass);

    // 5. Окончательная сборка классов текста (без isSelected)
    if (isCurrentMonth) {
      // Текст текущего месяца - обычный
      textClasses = cn(
        textClasses,
        statusClass.includes("text-")
          ? statusClass.match(/text-\S+/)?.[0]
          : "text-foreground dark:text-gray-100 ocean:text-ocean-foreground"
      );
    } else {
      // Текст прошлого/будущего месяца - приглушенный
      textClasses =
        "font-medium text-muted-foreground dark:text-gray-500 ocean:text-ocean-foreground/60";
      containerClasses = cn(containerClasses, "opacity-50"); // Делаем прозрачнее
    }

    // Если статус не задал цвет текста, ставим дефолтный
    if (!textClasses.includes("text-")) {
      textClasses = cn(
        textClasses,
        "text-foreground dark:text-gray-100 ocean:text-ocean-foreground"
      );
    }

    return { containerClasses, textClasses };
  };

  const handleDayPress = (dayObj: { day: number; monthOffset: number }) => {
    let date = currentMonth.date(dayObj.day);
    if (dayObj.monthOffset === -1)
      date = currentMonth.subtract(1, "month").date(dayObj.day);
    if (dayObj.monthOffset === 1)
      date = currentMonth.add(1, "month").date(dayObj.day);
    setSelectedDate(date.format("YYYY-MM-DD"));
  };

  return (
    <View className="rounded-xl ">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 ">
        <TouchableOpacity
          onPress={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          className="p-1"
        >
          {/* ✅ Адаптивный цвет для стрелок */}
          <ChevronLeft
            size={24}
            className="text-primary dark:text-white ocean:text-ocean-primary"
          />
        </TouchableOpacity>

        {/* ✅ Адаптивный заголовок месяца */}
        <Text className="text-xl font-semibold text-primary dark:text-white ocean:text-ocean-primary">
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity
          onPress={() => setCurrentMonth(currentMonth.add(1, "month"))}
          className="p-1"
        >
          {/* ✅ Адаптивный цвет для стрелок */}
          <ChevronRight
            size={24}
            className="text-primary dark:text-white ocean:text-ocean-primary"
          />
        </TouchableOpacity>
      </View>

      {/* Days of week */}
      <View className="flex-row justify-between px-4 mt-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
          <Text
            key={d}
            // ✅ Адаптивный цвет для дней недели (muted-foreground)
            className="text-center w-10 font-bold text-muted-foreground dark:text-gray-400 ocean:text-ocean-foreground/70 mb-2"
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Days */}
      {weeks.map((week, i) => (
        <View key={i} className="flex-row justify-between px-4 mt-1 ">
          {week.map((dayObj, j) => {
            // Получаем классы из адаптированной функции
            const { containerClasses, textClasses } = getDayStyle(dayObj);

            return (
              <TouchableOpacity
                key={j}
                // ✅ Используем cn для стилей контейнера
                className={cn(containerClasses)}
                onPress={() => handleDayPress(dayObj)}
                // Убираем инлайн-стили для backgroundColor и borderColor,
                // используя классы Tailwind
              >
                <Text
                  // ✅ Используем cn для стилей текста
                  className={cn(textClasses)}
                >
                  {dayObj.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      <View className="pb-4" />
    </View>
  );
};
