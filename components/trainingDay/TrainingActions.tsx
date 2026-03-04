import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Check, Edit3, RotateCcw, Trash2 } from "lucide-react-native";
import { cn } from "@/components/ui/Card";

interface Props {
  status: "PLANNED" | "COMPLETED";
  onComplete: () => void;
  onEdit: () => void;
  onRepeat: () => void;
  onDelete: () => void;
}

const ActionButton = ({
  icon,
  label,
  colorClass,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  colorClass: string;
  onPress: () => void;
}) => {
  // Клонируем иконку, чтобы задать ей цвет
  const coloredIcon = React.cloneElement(icon as React.ReactElement, {
    size: 20,
    color: "white", // Все иконки белые для контраста
  });

  return (
    <TouchableOpacity
      className={cn(
        "flex-1 flex-row items-center justify-center py-3 mx-1 rounded-xl shadow-sm active:opacity-80",
        colorClass
      )}
      onPress={onPress}
    >
      {coloredIcon}
      <Text className="text-white font-bold ml-2 text-sm">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function TrainingActions({
  status,
  onComplete,
  onEdit,
  onRepeat,
  onDelete,
}: Props) {
  return (
    <View className="flex-row justify-between m-2">
      {status === "PLANNED" ? (
        <ActionButton
          icon={<Check />}
          label="Done"
          colorClass="bg-green-500 dark:bg-green-600"
          onPress={onComplete}
        />
      ) : (
        <ActionButton
          icon={<RotateCcw />}
          label="Repeat"
          colorClass="bg-blue-500 dark:bg-blue-600"
          onPress={onRepeat}
        />
      )}

      <ActionButton
        icon={<Edit3 />}
        label="Edit"
        colorClass="bg-orange-500 dark:bg-orange-600" // Изменил на оранжевый
        onPress={onEdit}
      />

      <ActionButton
        icon={<Trash2 />}
        label="Delete"
        colorClass="bg-red-500 dark:bg-red-600"
        onPress={onDelete}
      />
    </View>
  );
}
