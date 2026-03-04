import { Alert } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { trainingDayService } from "@/services/trainingDayService";
import { useNavigation } from "@/hooks/useNavigation";
import {
  mapFromAPI,
  mapToUpdateDTO,
} from "@/services/mapper/trainingDayMapper";
import { logError } from "@/utils/logger";

const CONTEXT = "useTrainingDay";

export const useTrainingDay = (id: number, userId?: number) => {
  const queryClient = useQueryClient();
  const router = useNavigation();

  // 1. Получение данных (Query)
  const {
    data: trainingDay,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trainingDay", id],
    queryFn: async () => {
      const dto = await trainingDayService.getById(id);
      return mapFromAPI(dto);
    },
    enabled: !!id, // Запрос выполняется только если есть ID
  });

  // 2. Мутация: Завершение тренировки
  const completeMutation = useMutation({
    mutationFn: async () => {
      if (!trainingDay) return;
      const updatedTrainingDay = {
        ...trainingDay,
        status: "COMPLETED" as const,
      };
      const dto = mapToUpdateDTO(updatedTrainingDay);
      await trainingDayService.update(dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingDay", id] });
      queryClient.invalidateQueries({ queryKey: ["trainingDays"] });
      Alert.alert("Готово", "Тренировка выполнена");
    },
    onError: (e) => {
      logError(e, `${CONTEXT}/complete`);
      Alert.alert("Ошибка", "Не удалось завершить тренировку");
    },
  });

  // 3. Мутация: Удаление тренировки
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await trainingDayService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainingDays"] });
      Alert.alert("Удалено", "Тренировка успешно удалена");
      router.goBack(); // Возвращаемся назад после удаления
    },
    onError: (e) => {
      logError(e, `${CONTEXT}/delete`);
      Alert.alert("Ошибка", "Не удалось удалить тренировку");
    },
  });

  return {
    trainingDay,
    isLoading,
    error,
    complete: completeMutation.mutate,
    remove: deleteMutation.mutate,
    isCompleting: completeMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
