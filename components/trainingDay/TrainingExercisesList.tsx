import React from "react";
import { View } from "react-native";
import ExerciseCard from "@/components/trainingDay/ExerciseCard";

interface Props {
  trainingDay: any;
}

export default function TrainingExercisesList({ trainingDay }: Props) {
  // Адаптивные классы для рамки контейнера упражнения
  const containerClasses =
    "bg-card rounded-xl p-4  " + "dark:bg-gray-800 " + "ocean:bg-ocean-card";

  return (
    <>
      {trainingDay.trainings.map((training: any, i: number) => (
        <View
          key={training.id}
          // Применяем адаптивные классы к рамке
          className={`rounded-xl p-2 mb-4 ${containerClasses}`}
        >
          <ExerciseCard index={i} training={training} />
        </View>
      ))}
    </>
  );
}
