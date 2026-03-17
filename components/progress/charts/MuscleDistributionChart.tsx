import React from "react";
import { Dimensions, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Card } from "@/components/ui/Card";
import { MuscleDistributionDTO } from "@/types/progress";
import { Activity } from "lucide-react-native";
import Label from "@/components/ui/label";

interface Props {
  data: MuscleDistributionDTO[];
}

export const MuscleDistributionChart: React.FC<Props> = ({ data }) => {
  const screenWidth = Dimensions.get("window").width;

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 mb-4 items-center justify-center h-48">
        <Text className="text-muted-foreground">
          No muscle data to display.
        </Text>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    name: item.muscleGroupName,
    population: item.percentage,
    color: item.color,
  }));

  // Убрали chartConfig, так как он не нужен, если цвета заданы в chartData
  const chartConfig = {
    color: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`, // Этот цвет теперь используется только для текста легенды
  };

  return (
    <Card className="p-4 mb-6 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-3xl border-0 shadow-sm">
      <Label icon={Activity} text={"Muscle Distribution"} />

      <View className="flex-row items-center ml-4">
        {/* Диаграмма (слева) */}
        <View className="flex-1">
          <PieChart
            data={chartData}
            width={screenWidth / 2}
            height={180}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[5, 0]}
            hasLegend={false}
            absolute
          />
        </View>

        {/* Кастомная легенда (справа) */}
        <View className="flex-1">
          {chartData.map((item, index) => (
            <View key={index} className="flex-row items-center">
              <View
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              />
              <View className="flex-1">
                <Text
                  className="text-sm font-medium text-foreground dark:text-gray-200"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text className="text-sm font-bold text-muted-foreground dark:text-gray-400">
                  {item.population.toFixed(1)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};
