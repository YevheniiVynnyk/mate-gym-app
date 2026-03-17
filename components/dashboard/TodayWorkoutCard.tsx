import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { ChevronRight, Dumbbell, Play } from "lucide-react-native";
import { TrainingDay } from "@/types/trainingDay";
import { useRouter } from "expo-router";

interface Props {
  workout?: TrainingDay;
}

export const TodayWorkoutCard: React.FC<Props> = ({ workout }) => {
  const router = useRouter();

  if (!workout) {
    return (
      <Card className="p-5 my-4 bg-primary/10 dark:bg-primary-900/20 ocean:bg-ocean-primary/10 rounded-2xl border border-border">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground mb-1">
              No workout today
            </Text>
            <Text className="text-sm text-muted-foreground dark:text-gray-400">
              Rest day or time to plan?
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/trainingDay/new")}
            className="bg-primary dark:bg-primary-600 ocean:bg-ocean-primary px-4 py-2.5 rounded-xl flex-row items-center"
          >
            <Text className="text-white font-bold mr-1">Plan</Text>
            <ChevronRight size={16} color="white" />
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  return (
    <Card className="p-0 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm overflow-hidden">
      {/* Header Image / Gradient Placeholder */}
      <View className="h-24 bg-primary/20 dark:bg-primary-900/30 ocean:bg-ocean-primary/20 flex-row items-center justify-center relative">
        <Dumbbell
          size={48}
          className="text-primary/20 dark:text-primary-400/20"
        />
        <View className="absolute bottom-3 left-4">
          <View className="bg-background/80 dark:bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
            <Text className="text-xs font-bold text-foreground dark:text-white">
              TODAY
            </Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground mb-1">
          {workout.name}
        </Text>
        <View className="flex-row items-center mb-4">
          <Text className="text-sm text-muted-foreground dark:text-gray-400 mr-3">
            {workout.trainings.length} exercises
          </Text>
          <Text className="text-sm text-muted-foreground dark:text-gray-400">
            ~{workout.durationMinutes || 60} min
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/trainingDay/${workout.id}`)}
          className="bg-primary dark:bg-primary-600 ocean:bg-ocean-primary w-full py-3.5 rounded-xl flex-row justify-center items-center"
        >
          <Play size={18} color="white" fill="white" className="mr-2" />
          <Text className="text-white font-bold text-base">Start Workout</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
