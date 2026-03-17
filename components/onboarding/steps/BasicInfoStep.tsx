import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { cn } from "@/components/ui/Card";
import { Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  data: { gender?: string; birthday?: Date };
  updateData: (key: string, value: any) => void;
}

export const BasicInfoStep: React.FC<Props> = ({ data, updateData }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      updateData("birthday", selectedDate);
    }
  };

  return (
    <View className="w-full">
      <Text className="text-xl font-bold mb-4 text-center text-foreground dark:text-gray-100">
        Basic Info
      </Text>
      <View className="flex-row justify-center gap-4 mb-6">
        <TouchableOpacity
          onPress={() => updateData("gender", "male")}
          className={cn(
            "flex-1 p-4 rounded-xl border-2 items-center",
            data.gender === "male" ? "border-primary bg-primary/10" : "border-border bg-card"
          )}
        >
          <Text className={cn("font-bold", data.gender === "male" ? "text-primary" : "text-foreground")}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateData("gender", "female")}
          className={cn(
            "flex-1 p-4 rounded-xl border-2 items-center",
            data.gender === "female" ? "border-primary bg-primary/10" : "border-border bg-card"
          )}
        >
          <Text className={cn("font-bold", data.gender === "female" ? "text-primary" : "text-foreground")}>Female</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        className="flex-row items-center justify-between bg-secondary/30 p-4 rounded-xl border border-border"
      >
        <Text className={data.birthday ? "text-foreground" : "text-muted-foreground"}>
          {data.birthday ? data.birthday.toLocaleDateString() : "Date of Birth"}
        </Text>
        <Calendar size={20} className="text-muted-foreground" />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data.birthday || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};
