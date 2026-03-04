import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "@/components/ui/Card";

interface Props {
  onPress: () => void;
}

export function CreateTrainingButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      className={cn(
        "p-3 rounded-xl mb-4 active:opacity-80",
        "bg-primary dark:bg-primary-600 ocean:bg-ocean-primary",
      )}
      onPress={onPress}
    >
      <Text
        className={cn(
          "text-center font-semibold",
          "text-primary-foreground dark:text-white ocean:text-ocean-primary-foreground",
        )}
      >
        Создать тренировку
      </Text>
    </TouchableOpacity>
  );
}
