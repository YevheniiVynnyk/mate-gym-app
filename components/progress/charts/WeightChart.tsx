import React, { useState, useMemo } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Card, cn } from "@/components/ui/Card";
import { WeightHistoryDTO } from "@/types/progress";
import { useTheme } from "@/contexts/ThemeContext";
import { Edit2, Plus, List, Trash2 } from "lucide-react-native";
import { AddBodyMetricsModal } from "@/components/body/AddBodyMetricsModal";
import { bodyService } from "@/services/bodyService";

interface Props {
  data: WeightHistoryDTO[];
  onRefresh: () => void;
}

export const WeightChart: React.FC<Props> = ({ data, onRefresh }) => {
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<"weight" | "bmi">("weight");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<WeightHistoryDTO | null>(null);
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

  const handleDelete = async (id: number) => {
    Alert.alert("Delete Record", "Delete this record?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await bodyService.deleteBodyRecord(id);
            onRefresh();
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  const handleEdit = (item: WeightHistoryDTO) => {
    setEditingItem(item);
    setIsModalVisible(true);
  };

  const chartData = useMemo(() => {
    return data.map((item) => ({
      value: activeTab === "weight" ? item.weight : item.bmi,
      label: item.date.slice(5),
      dataPointText:
        activeTab === "weight" ? `${item.weight}kg` : `${item.bmi}`,
    }));
  }, [data, activeTab]);

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
          <Text className="text-xl font-bold text-foreground dark:text-gray-100">
            Body Metrics
          </Text>

          <View className="flex-row gap-2">
            {/* Кнопка открытия истории */}
            <TouchableOpacity
              onPress={() => setIsHistoryModalVisible(true)}
              className="bg-secondary/20 dark:bg-gray-700/30 p-2 rounded-full"
            >
              <List size={20} color={lineColor} />
            </TouchableOpacity>

            {/* Кнопка добавления */}
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
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-11/12 max-h-3/4 bg-card dark:bg-gray-800 rounded-2xl p-4">
            <Text className="text-lg font-bold text-foreground dark:text-gray-100 mb-4">
              History
            </Text>

            <FlatList
              data={data.slice().reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View className="flex-row justify-between items-center py-2 border-b border-border/30">
                  <View>
                    <Text className="text-base text-foreground dark:text-gray-200">
                      {item.weight} kg{" "}
                      <Text className="text-xs text-muted-foreground">
                        ({item.bmi} BMI)
                      </Text>
                    </Text>
                    <Text className="text-xs text-muted-foreground">
                      {item.date}
                    </Text>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Edit2 size={18} color="#3b82f6" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Trash2 size={18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />

            <TouchableOpacity
              onPress={() => setIsHistoryModalVisible(false)}
              className="mt-4 py-2 bg-primary/20 dark:bg-primary-900/30 rounded-lg items-center"
            >
              <Text className="text-primary dark:text-primary-400 font-bold">
                Close
              </Text>
            </TouchableOpacity>
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
