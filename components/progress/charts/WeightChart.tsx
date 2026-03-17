import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Card, cn } from "@/components/ui/Card";
import { ChartPointDTO } from "@/types/progress";
import { useTheme } from "@/contexts/ThemeContext";
import { Edit2, List, Plus, Trash2, TrendingUp } from "lucide-react-native";
import { AddBodyMetricsModal } from "@/components/body/AddBodyMetricsModal";
import { bodyService, BodyDTO } from "@/services/bodyService";
import Label from "@/components/ui/label";

interface Props {
  weightData: ChartPointDTO[];
  bmiData: ChartPointDTO[];
  fullHistory?: BodyDTO[];
  onRefresh: () => void;
}

export const WeightChart: React.FC<Props> = ({
  weightData,
  bmiData,
  fullHistory,
  onRefresh,
}) => {
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<"weight" | "bmi">("weight");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<BodyDTO | null>(null);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

  const handleDelete = async (id: number) => {
    Alert.alert("Delete Record", "Delete this record?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await bodyService.delete(id);
            onRefresh();
          } catch (e) {
            console.error(e);
            Alert.alert("Error", "Failed to delete record");
          }
        },
      },
    ]);
  };

  const handleEdit = (item: BodyDTO) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const chartData = useMemo(() => {
    const sourceData = activeTab === "weight" ? weightData : bmiData;
    if (!sourceData || sourceData.length === 0) return [];

    let mappedData = sourceData.map((item) => ({
      value: item.value,
      label: item.date.slice(5),
      dataPointText:
        activeTab === "weight" ? `${item.value}kg` : `${item.value}`,
      date: item.date,
    }));

    if (mappedData.length === 1) {
      const singlePoint = mappedData[0];
      mappedData = [
        { ...singlePoint, label: "", hideDataPoint: true },
        singlePoint,
      ];
    }

    return mappedData;
  }, [weightData, bmiData, activeTab]);

  const lineColor =
    activeTab === "weight"
      ? theme === "dark"
        ? "#4ade80"
        : "#22c55e"
      : theme === "dark"
        ? "#60a5fa"
        : "#3b82f6";

  return (
    <Card className="p-0 mb-6 bg-card dark:bg-gray-800 ocean:bg-ocean-card rounded-3xl border-0 shadow-sm overflow-hidden">
      {/* HEADER */}
      <View className="p-4 pb-2">
        <View className="flex-row justify-between items-center mb-4">
          <Label icon={TrendingUp} text="Body Metrics" color="#EF4444" />

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => setIsHistoryModalVisible(true)}
              className="bg-secondary/20 dark:bg-gray-700/30 p-2 rounded-full"
            >
              <List size={20} color={lineColor} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setEditingItem(null);
                setIsModalVisible(true);
              }}
              className="bg-primary/10 dark:bg-primary-900/30 p-2 rounded-full"
            >
              <Plus size={20} color={lineColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-secondary/30 dark:bg-gray-700/50 p-1 rounded-xl">
          <TouchableOpacity
            onPress={() => setActiveTab("weight")}
            className={cn(
              "flex-1 py-2 rounded-lg items-center",
              activeTab === "weight" && "bg-white dark:bg-gray-600",
            )}
          >
            <Text
              className={cn(
                "text-sm font-bold",
                activeTab === "weight"
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              Weight
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("bmi")}
            className={cn(
              "flex-1 py-2 rounded-lg items-center",
              activeTab === "bmi" && "bg-white dark:bg-gray-600",
            )}
          >
            <Text
              className={cn(
                "text-sm font-bold",
                activeTab === "bmi" ? "text-blue-500" : "text-muted-foreground",
              )}
            >
              BMI
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CHART */}
      {chartData.length > 0 ? (
        <View className="px-2 pb-4">
          <LineChart
            data={chartData}
            thickness={3}
            color={lineColor}
            areaChart
            startFillColor={lineColor}
            startOpacity={0.25}
            endOpacity={0.05}
            animated
            animationDuration={800}
            hideRules
            yAxisColor="transparent"
            xAxisColor="transparent"
            dataPointsRadius={5}
            dataPointsColor={lineColor}
            textColor={theme === "dark" ? "#ffffff" : "#666"}
            spacing={60}
            initialSpacing={20}
            isScrollable
            scrollAnimation
            focusEnabled
            showTextOnFocus
          />
        </View>
      ) : (
        <View className="h-40 items-center justify-center">
          <Text className="text-muted-foreground">No data yet</Text>
        </View>
      )}

      {/* MODAL HISTORY */}
      <Modal
        visible={isHistoryModalVisible}
        animationType="slide"
        onRequestClose={() => setIsHistoryModalVisible(false)}
        transparent
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="w-full max-h-[80%] bg-card dark:bg-gray-800 rounded-3xl p-6 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-foreground dark:text-gray-100">
                History
              </Text>
              <TouchableOpacity onPress={() => setIsHistoryModalVisible(false)}>
                <Text className="text-primary dark:text-primary-400 font-bold">
                  Close
                </Text>
              </TouchableOpacity>
            </View>

            {fullHistory.length > 0 ? (
              <FlatList
                data={fullHistory.slice().reverse()}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View className="flex-row justify-between items-center py-4 border-b border-border/30">
                    <View>
                      <Text className="text-lg font-bold text-foreground dark:text-gray-200">
                        {item.weight}{" "}
                        <Text className="text-sm font-normal text-muted-foreground">
                          kg
                        </Text>
                        <Text className="text-sm font-normal text-muted-foreground">
                          {" "}
                          •{" "}
                        </Text>
                        {item.height}{" "}
                        <Text className="text-sm font-normal text-muted-foreground">
                          cm
                        </Text>
                      </Text>
                      <Text className="text-xs text-muted-foreground">
                        BMI: {item.bmi} •{" "}
                        {new Date(item.date).toLocaleDateString()}
                      </Text>
                    </View>

                    <View className="flex-row gap-2">
                      <TouchableOpacity
                        onPress={() => handleEdit(item)}
                        className="p-2 bg-blue-500/10 rounded-lg"
                      >
                        <Edit2 size={18} color="#3b82f6" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/10 rounded-lg"
                      >
                        <Trash2 size={18} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            ) : (
              <View className="py-10 items-center">
                <Text className="text-muted-foreground">No records found.</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* ADD / EDIT MODAL */}
      <AddBodyMetricsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSuccess={onRefresh}
        initialData={editingItem}
      />
    </Card>
  );
};
