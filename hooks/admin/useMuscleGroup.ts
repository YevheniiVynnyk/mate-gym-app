import { MuscleGroupDTO, muscleGroupService } from "@/services/exerciseService";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useMuscleGroup = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroupDTO[] | null>(
    null,
  );
  useEffect(() => {
    const load = async () => {
      try {
        const apiMuscleGroups = await muscleGroupService.getAllMuscleGroups();
        setMuscleGroups(apiMuscleGroups);
      } catch {
        Alert.alert("Ошибка", "Не удалось загрузить группы мышц");
      }
    };
    load();
  }, []);
  return {
    muscleGroups,
  };
};
