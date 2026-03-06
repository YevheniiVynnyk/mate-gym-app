import React from "react";
import { Text, View } from "react-native";
import { Card, cn } from "@/components/ui/Card";
import { ActivityHeatmapDTO } from "@/types/progress";

interface Props {
  data: ActivityHeatmapDTO[];
}

export const ActivityHeatmap: React.FC<Props> = ({ data }) => {
  return (
    <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm">
      <Text className="text-lg font-bold mb-4 text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
        Activity Heatmap
      </Text>
      <View className="flex-row flex-wrap gap-1">
        {data.slice(0, 98).map((day, i) => ( // Показываем последние 98 дней (14 недель)
          <View
            key={i}
            className={cn(
              "w-3 h-3 rounded-sm",
              day.count > 0 ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
            )}
          />
        ))}
      </View>
    </Card>
  );
};
