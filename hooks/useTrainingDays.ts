import { useQuery } from "@tanstack/react-query";
import { trainingDayService } from "@/services/trainingDayService";
import { logError } from "@/utils/logger";
import { mapFromAPI } from "@/services/mapper/trainingDayMapper";

const CONTEXT = "useTrainingDaysData";

export const useTrainingDaysData = () => {
  const {
    data: trainingDays,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trainingDays"],
    queryFn: async () => {
      const dtos = await trainingDayService.getAll();
      // Преобразуем DTO в наш внутренний тип TrainingDay
      return dtos.map(mapFromAPI);
    },
  });

  if (error) {
    logError(error, CONTEXT);
  }

  return {
    // Возвращаем пустой массив, если данных еще нет или произошла ошибка
    trainingDays: trainingDays ?? [],
    isLoading,
    error,
    refetch, // Функция для ручного обновления данных
  };
};
