import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Card, cn } from "@/components/ui/Card";
import { ActivityHeatmapDTO } from "@/types/progress";
import { useRouter } from "expo-router";
import { ChevronRight, Calendar } from "lucide-react-native";
import Label from "@/components/ui/label";

interface Props {
  data: ActivityHeatmapDTO[];
}

export const ActivityHeatmap: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  return (
    <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm">
      <Label icon={Calendar} text="Activity Heatmap" color="#F59E0B" />

      {!data || data.length === 0 ? (
        <View className="items-center justify-center py-8">
          <Text className="text-muted-foreground dark:text-gray-400 mb-4 text-center">
            No activity recorded yet.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/trainingDay/new")}
            className="bg-primary/10 dark:bg-primary-900/30 py-2 px-4 rounded-lg flex-row items-center"
          >
            <Text className="text-primary dark:text-primary-400 font-bold">
              Start a Workout
            </Text>
            <ChevronRight
              size={16}
              className="text-primary dark:text-primary-400 ml-1"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row flex-wrap gap-1">
          {data.slice(0, 98).map((day, i) => (
            <View
              key={i}
              className={cn(
                "w-3 h-3 rounded-sm",
                day.count > 0 ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700",
              )}
            />
          ))}
        </View>
      )}
    </Card>
  );
};
