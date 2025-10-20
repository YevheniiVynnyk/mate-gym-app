import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { TrainingDetail } from "@/types/trainingDay";

interface SetInputsProps {
  sets: number;
  setData: TrainingDetail[];
  onSetDataChange: (
    index: number,
    field: "weight" | "repetition",
    value: number,
  ) => void;
  onSetsChange?: (newSetsCount: number) => void;
}

const SetInputs: React.FC<SetInputsProps> = ({
  sets,
  setData,
  onSetDataChange,
  onSetsChange,
}) => {
  const handleSetsChange = (newSetsCount: number) => {
    if (newSetsCount >= 1 && newSetsCount <= 10 && onSetsChange) {
      onSetsChange(newSetsCount);
    }
  };

  return (
    <View className="p-2">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-medium text-md">Подходы</Text>
        {onSetsChange && (
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => handleSetsChange(sets - 1)}
              disabled={sets <= 1}
              className="p-2 border border-gray-200 rounded-lg bg-gray-100"
            >
              <Minus size={16} />
            </TouchableOpacity>
            <Text className="mx-4 font-medium text-lg ">{sets}</Text>
            <TouchableOpacity
              onPress={() => handleSetsChange(sets + 1)}
              disabled={sets >= 10}
              className="p-2 border border-gray-200 rounded-lg bg-gray-50"
            >
              <Plus size={16} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {Array.from({ length: sets }).map((_, index) => (
        <View
          key={index}
          className="my-1 p-3 border border-gray-200 rounded-2xl"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 flex justify-center items-center bg-green-100 rounded-full">
              <Text className="text-green-600 font-bold text-center">
                {index + 1}
              </Text>
            </View>

            <View className="flex-row flex-1 mx-1 justify-between">
              <View className="flex-1 mx-1">
                <Text className="text-xs font-medium p-1">Повторения</Text>
                <TextInput
                  className="border-1 border-gray-300 rounded-2xl bg-gray-100 px-3"
                  keyboardType="number-pad"
                  value={setData[index]?.repetition?.toString() ?? ""}
                  onChangeText={(val) =>
                    onSetDataChange(
                      index,
                      "repetition",
                      val === "" ? 0 : parseInt(val, 10),
                    )
                  }
                />
              </View>
              <View className="flex-1 mx-1">
                <Text className="text-xs font-medium p-1">Вес (кг)</Text>
                <TextInput
                  className="border-1 border-gray-300 rounded-2xl bg-gray-100 px-3"
                  keyboardType="decimal-pad"
                  value={setData[index]?.weight?.toString() ?? ""}
                  onChangeText={(val) => {
                    if (val === "") {
                      onSetDataChange(index, "weight", 0);
                      return;
                    }
                    const num = parseFloat(val);
                    if (!isNaN(num)) onSetDataChange(index, "weight", num);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SetInputs;
