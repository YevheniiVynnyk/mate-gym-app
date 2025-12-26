import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ChevronDown, X } from "lucide-react-native";
import { MuscleGroup } from "@/types/trainingDay";
import { muscleGroupService } from "@/services/exerciseService";

interface MuscleGroupSearchSelectProps {
  value?: MuscleGroup | null;
  onSelect?: (group: MuscleGroup | null) => void;
  placeholder?: string;
}

const MuscleGroupSearchSelect: React.FC<MuscleGroupSearchSelectProps> = ({
  value,
  onSelect,
  placeholder = "Выберите группу мышц...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState(value?.name || "");
  const [groups, setGroups] = useState<MuscleGroup[]>([]);

  useEffect(() => {
    muscleGroupService
      .getAll()
      .then(setGroups)
      .catch((e) => {
        console.error("Failed to load muscle groups", e);
        // fallback
        setGroups([
          { id: 1, name: "Грудь" },
          { id: 2, name: "Спина" },
          { id: 3, name: "Ноги" },
          { id: 4, name: "Плечи" },
          { id: 5, name: "Руки" },
          { id: 6, name: "йцу" },
        ]);
      });
  }, []);

  useEffect(() => {
    setInputValue(value?.name || "");
  }, [value]);

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputChange = (text: string) => {
    setInputValue(text);
    setSearchTerm(text);
    setIsOpen(true);
  };

  const handleSelectGroup = (group: MuscleGroup) => {
    setInputValue(group.name);
    setIsOpen(false);
    setSearchTerm("");
    Keyboard.dismiss();

    // ✅ Важный момент: уведомляем родителя о выбранной группе
    onSelect && onSelect(group);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    setIsOpen(false);
    onSelect?.(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm(inputValue);
  };

  return (
    <View className="w-full p-2">
      <View className="flex-row items-center border border-gray-200 rounded-lg bg-gray-100">
        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          className="flex-1 px-2 py-1"
          onFocus={() => setIsOpen(true)}
        />
        {inputValue?.length > 0 && (
          <TouchableOpacity onPress={handleClear} className="p-2">
            <X size={18} color="gray" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleDropdown} className="p-2">
          <ChevronDown size={20} color="black" />
        </TouchableOpacity>
      </View>

      {isOpen && (
        <View
          className="bg-white border border-gray-300 rounded-lg mt-1"
          style={{ maxHeight: 150 }}
        >
          <FlatList
            data={filteredGroups}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-3 border-b border-gray-200"
                onPress={() => handleSelectGroup(item)}
              >
                <Text className="font-bold">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default MuscleGroupSearchSelect;
