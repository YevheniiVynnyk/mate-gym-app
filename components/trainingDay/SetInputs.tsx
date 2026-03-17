import React, { useState } from "react";
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
  // Локальное состояние для веса каждого подхода
  const [weightInputs, setWeightInputs] = useState<string[]>(
    setData.map((s) => (s.weight != null ? s.weight.toString() : "")),
  );
  const handleSetsChange = (newSetsCount: number) => {
    if (newSetsCount >= 1 && newSetsCount <= 10 && onSetsChange) {
      onSetsChange(newSetsCount);

      // Добавляем новые элементы в weightInputs при увеличении подходов
      if (newSetsCount > weightInputs.length) {
        const prevWeight = weightInputs[weightInputs.length - 1] || "0";
        setWeightInputs([...weightInputs, prevWeight]);
      } else if (newSetsCount < weightInputs.length) {
        setWeightInputs(weightInputs.slice(0, newSetsCount));
      }
    }
  };

  const handleWeightChange = (index: number, val: string) => {
    // Разрешаем только цифры, точку и запятую
    let sanitized = val.replace(/[^0-9.,]/g, "");

    // Убираем ведущий ноль, если начинается с него
    if (
      sanitized.startsWith("0") &&
      sanitized.length > 1 &&
      !sanitized.startsWith("0.")
    ) {
      sanitized = sanitized.replace(/^0+/, "");
    }

    const newWeights = [...weightInputs];
    newWeights[index] = sanitized;
    setWeightInputs(newWeights);
  };

  const handleWeightEndEditing = (index: number) => {
    const normalized = weightInputs[index].replace(",", ".");
    const num = parseFloat(normalized);
    onSetDataChange(index, "weight", isNaN(num) ? 0 : num);
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
              {/* Повторения */}
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

              {/* Вес */}
              <View className="flex-1 mx-1">
                <Text className="text-xs font-medium p-1">Вес (кг)</Text>
                <TextInput
                  className="border-1 border-gray-300 rounded-2xl bg-gray-100 px-3"
                  keyboardType="decimal-pad"
                  value={weightInputs[index]}
                  onChangeText={(val) => handleWeightChange(index, val)}
                  onFocus={() => {
                    // Убираем дефолтный ноль при фокусе
                    if (weightInputs[index] === "0") {
                      const newWeights = [...weightInputs];
                      newWeights[index] = "";
                      setWeightInputs(newWeights);
                    }
                  }}
                  onEndEditing={() => handleWeightEndEditing(index)}
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
