import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card } from "@/components/ui/Card";
import { useTheme } from "@/contexts/ThemeContext";
import { ChartDataDTO } from "@/services/bodyService";
import dayjs from "dayjs";

interface Props {
  data: ChartDataDTO[];
  title?: string;
  height?: number;
  showDots?: boolean;
}

export const BMIChart: React.FC<Props> = ({ 
  data, 
  title = "BMI Progress", 
  height = 220,
  showDots = true 
}) => {
  const { theme } = useTheme();
  const screenWidth = Dimensions.get("window").width;

  if (!data || data.length === 0) {
    return (
      <Card className="p-4 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm items-center justify-center h-40">
        <Text className="text-muted-foreground dark:text-gray-400">No data available</Text>
      </Card>
    );
  }

  // Берем последние 6 точек для графика, чтобы не перегружать
  const chartData = data.slice(-6);
  
  const labels = chartData.map(d => dayjs(d.date).format("DD.MM"));
  const values = chartData.map(d => d.value);

  const chartConfig = {
    backgroundGradientFrom: theme === "dark" ? "#1f2937" : theme === "ocean" ? "#0f172a" : "#ffffff",
    backgroundGradientTo: theme === "dark" ? "#1f2937" : theme === "ocean" ? "#0f172a" : "#ffffff",
    color: (opacity = 1) => 
      theme === "dark" 
        ? `rgba(74, 222, 128, ${opacity})` // green-400
        : theme === "ocean"
          ? `rgba(56, 189, 248, ${opacity})` // sky-400
          : `rgba(34, 197, 94, ${opacity})`, // green-500
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    labelColor: (opacity = 1) => 
      theme === "dark" 
        ? `rgba(255, 255, 255, ${opacity})` 
        : theme === "ocean"
          ? `rgba(226, 232, 240, ${opacity})`
          : `rgba(107, 114, 128, ${opacity})`, // gray-500
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: theme === "dark" ? "#1f2937" : "#ffffff",
    },
  };

  return (
    <Card className="p-0 mb-4 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-2xl border-0 shadow-sm overflow-hidden">
      <View className="p-4 border-b border-border/50 dark:border-gray-700">
        <Text className="text-base font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
          {title}
        </Text>
      </View>
      
      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: values }],
        }}
        width={screenWidth - 32} // padding
        height={height}
        chartConfig={chartConfig}
        bezier
        withDots={showDots}
        withInnerLines={false}
        withOuterLines={false}
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 40, // Отступ справа для меток
        }}
      />
    </Card>
  );
};
