import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Edit3, Pause, Play, RotateCcw, Trash2 } from "lucide-react-native";

interface Props {
  status: "CREATED" | "IN_PROGRESS" | "COMPLETED";
  isStarted?: boolean; // флаг, начала ли тренировка
  onStart: () => void;
  onStop: () => void; // остановить тренировку
  onEdit: () => void;
  onRepeat: () => void;
  onDelete: () => void;
}

const ActionButton = ({
  icon,
  buttonClasses,
  onPress,
}: {
  icon: React.ReactNode;
  buttonClasses: string;
  onPress: () => void;
}) => {
  const iconSize = 24;
  const coloredIcon = React.cloneElement(icon as React.ReactElement, {
    size: iconSize,
    color: "#fff",
  });

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-center px-3 py-2 rounded-lg shadow-sm active:opacity-80 ${buttonClasses}`}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {coloredIcon}
    </TouchableOpacity>
  );
};

export default function TrainingActions({
  status,
  isStarted = false,
  onStart,
  onStop,
  onEdit,
  onRepeat,
  onDelete,
}: Props) {
  const PRIMARY_BUTTON_CLASSES =
    "bg-primary hover:bg-green-700 dark:bg-primary dark:hover:bg-green-700 ocean:bg-ocean-primary ocean:hover:bg-ocean-primary/90";
  const INFO_BUTTON_CLASSES =
    "bg-blue-500 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 ocean:bg-ocean-info ocean:hover:bg-ocean-info/90";
  const DESTRUCTIVE_BUTTON_CLASSES =
    "bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 ocean:bg-ocean-destructive ocean:hover:bg-ocean-destructive/90";

  return (
    <View className="flex-row justify-around m-2">
      {/* CREATED */}
      {status === "CREATED" && (
        <>
          <ActionButton
            icon={<Play />}
            buttonClasses={PRIMARY_BUTTON_CLASSES}
            onPress={onStart}
          />
          <ActionButton
            icon={<Edit3 />}
            buttonClasses={INFO_BUTTON_CLASSES}
            onPress={onEdit}
          />
          <ActionButton
            icon={<Trash2 />}
            buttonClasses={DESTRUCTIVE_BUTTON_CLASSES}
            onPress={onDelete}
          />
        </>
      )}

      {/* IN_PROGRESS */}
      {status === "IN_PROGRESS" && (
        <>
          {isStarted ? (
            <ActionButton
              icon={<Pause />}
              buttonClasses={PRIMARY_BUTTON_CLASSES}
              onPress={onStop}
            />
          ) : (
            <ActionButton
              icon={<Play />}
              buttonClasses={PRIMARY_BUTTON_CLASSES}
              onPress={onStart}
            />
          )}
          <ActionButton
            icon={<Edit3 />}
            buttonClasses={INFO_BUTTON_CLASSES}
            onPress={onEdit}
          />
          <ActionButton
            icon={<Trash2 />}
            buttonClasses={DESTRUCTIVE_BUTTON_CLASSES}
            onPress={onDelete}
          />
        </>
      )}

      {/* COMPLETED */}
      {status === "COMPLETED" && (
        <>
          <ActionButton
            icon={<Edit3 />}
            buttonClasses={INFO_BUTTON_CLASSES}
            onPress={onEdit}
          />
          <ActionButton
            icon={<RotateCcw />}
            buttonClasses={PRIMARY_BUTTON_CLASSES}
            onPress={onRepeat}
          />
          <ActionButton
            icon={<Trash2 />}
            buttonClasses={DESTRUCTIVE_BUTTON_CLASSES}
            onPress={onDelete}
          />
        </>
      )}
    </View>
  );
}
