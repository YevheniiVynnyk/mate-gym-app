import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Edit3, Play, RotateCcw, Trash2 } from "lucide-react-native";

interface Props {
  status: "COMPLETED" | "IN_PROGRESS" | string;
  onStart: () => void;
  onEdit: () => void;
  onRepeat: () => void;
  onDelete: () => void;
}

/**
 * Вложенный компонент кнопки, принимающий стили через buttonClasses.
 */
const ActionButton = ({
  label,
  icon,
  buttonClasses, // Теперь принимаем классы напрямую
  onPress,
}: {
  label: string;
  icon: React.ReactNode;
  buttonClasses: string; // Строка с классами Tailwind
  onPress: () => void;
}) => {
  // Класс для текста/иконки (всегда белый/светлый на сплошном фоне)
  const textAndIconClasses =
    "text-white dark:text-white ocean:text-ocean-primary-foreground";
  const iconSize = 16;

  // Клонируем иконку, чтобы применить фиксированный белый цвет
  const coloredIcon = React.cloneElement(icon as React.ReactElement, {
    size: iconSize,
    color: "#fff",
  });

  return (
    <TouchableOpacity
      // Применяем классы фона, переданные через prop
      className={`flex-row items-center justify-center px-3 py-2 rounded-lg shadow-sm active:opacity-80 ${buttonClasses}`}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {coloredIcon}
      {/* Применяем классы цвета текста 
      <Text className={`font-semibold ml-2 text-sm ${textAndIconClasses}`}>
        {/*label
      </Text>*/}
    </TouchableOpacity>
  );
};

export default function TrainingActions({
  status,
  onStart,
  onEdit,
  onRepeat,
  onDelete,
}: Props) {
  // --- Определения классов для сплошной заливки ---

  // Зеленый (Начать/Повторить) - Primary
  const PRIMARY_BUTTON_CLASSES =
    "bg-primary hover:bg-green-700 " +
    "dark:bg-primary dark:hover:bg-green-700 " +
    "ocean:bg-ocean-primary ocean:hover:bg-ocean-primary/90";

  // Синий (Редактировать) - Info
  const INFO_BUTTON_CLASSES =
    "bg-blue-500 hover:bg-blue-600 " +
    "dark:bg-blue-500 dark:hover:bg-blue-600 " +
    "ocean:bg-ocean-info ocean:hover:bg-ocean-info/90";

  // Красный (Удалить) - Destructive
  const DESTRUCTIVE_BUTTON_CLASSES =
    "bg-red-500 hover:bg-red-600 " +
    "dark:bg-red-500 dark:hover:bg-red-600 " +
    "ocean:bg-ocean-destructive ocean:hover:bg-ocean-destructive/90";

  // --- Конец определений классов ---

  return (
    <View className="flex-row justify-around m-2">
      {/* === Если тренировка завершена (COMPLETED) === */}
      {status === "COMPLETED" && (
        <>
          <ActionButton
            label=""
            icon={<Edit3 />}
            buttonClasses={INFO_BUTTON_CLASSES}
            onPress={onEdit}
          />
          <ActionButton
            label=""
            icon={<RotateCcw />}
            buttonClasses={PRIMARY_BUTTON_CLASSES}
            onPress={onRepeat}
          />
          <ActionButton
            label=""
            icon={<Trash2 />}
            buttonClasses={DESTRUCTIVE_BUTTON_CLASSES}
            onPress={onDelete}
          />
        </>
      )}

      {/* === Если тренировка еще не завершена (IN_PROGRESS или любой другой статус) === */}
      {(status === "IN_PROGRESS" || status !== "COMPLETED") && (
        <>
          <ActionButton
            label=""
            icon={<Play />}
            buttonClasses={PRIMARY_BUTTON_CLASSES}
            onPress={onStart}
          />
          <ActionButton
            label=""
            icon={<Edit3 />}
            buttonClasses={INFO_BUTTON_CLASSES}
            onPress={onEdit}
          />
          <ActionButton
            label=""
            icon={<Trash2 />}
            buttonClasses={DESTRUCTIVE_BUTTON_CLASSES}
            onPress={onDelete}
          />
        </>
      )}
    </View>
  );
}
