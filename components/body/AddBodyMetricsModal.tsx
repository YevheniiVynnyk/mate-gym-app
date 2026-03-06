import React, { useEffect, useState } from "react";
import { Modal, Platform, Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { TextInputUI } from "@/components/ui/TextInputUI";
import DateTimePicker from "@react-native-community/datetimepicker";
import { bodyService } from "@/services/bodyService";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react-native";
import { WeightHistoryDTO } from "@/types/progress";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: WeightHistoryDTO | null;
}

export const AddBodyMetricsModal: React.FC<Props> = ({ visible, onClose, onSuccess, initialData }) => {
  const { t } = useTranslation();
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState(""); // Height might not be in WeightHistoryDTO, need to handle
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setWeight(initialData.weight.toString());
        // setHeight(initialData.height.toString()); // Если height есть в DTO
        setDate(new Date(initialData.date));
      } else {
        setWeight("");
        setHeight("");
        setDate(new Date());
      }
    }
  }, [visible, initialData]);

  const handleSave = async () => {
    if (!weight) return; // Height might be optional for updates

    setLoading(true);
    try {
      // Если есть initialData, это обновление (но у нас нет ID в WeightHistoryDTO пока)
      // В реальном приложении: if (initialData?.id) await bodyService.update(...)
      
      // Пока просто создаем новую запись
      await bodyService.createBodyRecord({
        weight: parseFloat(weight),
        height: parseFloat(height) || 175, // Default height if not provided
        date: date,
      });
      onSuccess();
      onClose();
    } catch (e) {
      console.error("Failed to save body metrics", e);
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <Card className="w-full bg-card dark:bg-gray-800 ocean:bg-ocean-card p-6 rounded-3xl">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-foreground dark:text-gray-100 ocean:text-ocean-foreground">
              {initialData ? "Edit Body Metrics" : "Add Body Metrics"}
            </Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <X size={24} className="text-muted-foreground" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-sm font-medium text-muted-foreground mb-1">Weight (kg)</Text>
              <TextInputUI
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                placeholder="0.0"
                className="bg-secondary/30 border-0"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-muted-foreground mb-1">Height (cm)</Text>
              <TextInputUI
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                placeholder="0"
                className="bg-secondary/30 border-0"
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-muted-foreground mb-1">Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="bg-secondary/30 p-3 rounded-xl"
              >
                <Text className="text-foreground dark:text-gray-100">
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}

            <TouchableOpacity
              onPress={handleSave}
              disabled={loading}
              className="bg-primary dark:bg-primary-600 ocean:bg-ocean-primary py-4 rounded-xl mt-4 items-center"
            >
              <Text className="text-white font-bold text-lg">
                {loading ? "Saving..." : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </Modal>
  );
};
