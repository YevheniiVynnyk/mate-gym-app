import React from "react";
import { Text, View } from "react-native";
import { Dumbbell, Layers, Repeat } from "lucide-react-native";
import { cn } from "@/components/ui/Card";

const calcTotals = (trainingDay: any) => {
  let totalReps = 0;
  let totalWeight = 0;
  if (trainingDay.trainings && Array.isArray(trainingDay.trainings)) {
    trainingDay.trainings.forEach((t: any) => {
      if (t.trainingDetails && Array.isArray(t.trainingDetails)) {
        t.trainingDetails.forEach((set: any) => {
          const reps = typeof set.repetition === "number" ? set.repetition : 0;
          const weight = typeof set.weight === "number" ? set.weight : 0;
          totalReps += reps;
          totalWeight += reps * weight;
        });
      }
    });
  }
  return { totalReps, totalWeight };
};

const StatTile = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  return (
    <View className="flex-1 items-center justify-center p-3 bg-secondary/30 dark:bg-gray-800/50 rounded-2xl mx-1">
      <View className="mb-2 p-2 bg-background dark:bg-gray-700 rounded-full shadow-sm">
        {React.cloneElement(icon as React.ReactElement, {
          size: 18,
          className: "text-primary dark:text-primary-400",
        })}
      </View>
      <Text className="text-lg font-bold text-foreground dark:text-gray-100 mb-0.5">
        {value}
      </Text>
      <Text className="text-xs font-medium text-muted-foreground dark:text-gray-400">
        {label}
      </Text>
    </View>
  );
};

export default function TrainingStats({ trainingDay }: { trainingDay: any }) {
  const totals = calcTotals(trainingDay);

  return (
    <View className="bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-3xl p-4 mb-4 shadow-sm border border-border/50 dark:border-gray-700">
      <Text className="text-base font-bold text-foreground dark:text-gray-100 mb-4 ml-1">
        Workout Summary
      </Text>

      <View className="flex-row justify-between">
        <StatTile 
          label="Exercises" 
          value={trainingDay.trainings?.length ?? 0} 
          icon={<Dumbbell />}
        />
        <StatTile 
          label="Total Reps" 
          value={totals.totalReps} 
          icon={<Repeat />}
        />
        <StatTile
          label="Volume"
          value={`${(totals.totalWeight / 1000).toFixed(1)}t`}
          icon={<Layers />}
        />
      </View>
    </View>
  );
}
