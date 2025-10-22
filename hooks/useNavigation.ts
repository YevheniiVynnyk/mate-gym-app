import { useRouter } from "expo-router";
//import { TrainingDay } from "@/types/trainingDay";
import { TrainingDayParams } from "@/hooks/useTrainingDayForm";

export const useNavigation = () => {
  const router = useRouter();

  const goBack = () => router.back();

  // --- Навигация для Тренировок (TrainingDay) ---

  // Создание новой записи
  const toCreateTrainingDay = () => router.push("/trainingDay/trainingDayForm");

  // Просмотр списка
  const toTrainingList = () => router.push("/trainingDay/trainingDayView");

  // Детали (Динамический маршрут)
  const toTrainingDetail = (id: string | number) =>
    // Используем объектный синтаксис для динамического маршрута: /trainingDay/[id]
    router.push(`/trainingDay/${id}`);

  // Редактирование (с параметрами запроса)
  const toTrainingEdit = (params: TrainingDayParams) => {
    const { id, clientId, selectedDate, prefilledData } = params;

    // Формируем параметры запроса (query)
    const query = {
      ...(id && { id: String(id) }), // Проверяем и добавляем ID
      ...(clientId && { clientId }),
      ...(selectedDate && { selectedDate }),
      ...(prefilledData
        ? { prefilledData: JSON.stringify(prefilledData) }
        : {}),
      isEdit: "true", // Флаг редактирования всегда присутствует
    };

    // Используем синтаксис с объектом { pathname, params }
    router.push({
      pathname: "/trainingDay/trainingDayForm",
      // router.push автоматически формирует строку запроса из объекта params
      params: query,
    });
  };

  // --- Навигация для Основных разделов ---
  const toHome = () => router.push("/");
  const toDashboard = () => router.push("/dashboard");
  const toProfile = () => router.push("/profile");
  const toProgress = () => router.push("/progress");
  const toDeveloperSupport = () => router.push("/developerSupport");
  const toTrainingPlan = () => router.push("/trainingPlans");

  return {
    goBack,
    toCreateTrainingDay,
    toTrainingList,
    toTrainingDetail,
    toTrainingEdit,
    toHome,
    toDashboard,
    toProfile,
    toProgress,
    toDeveloperSupport,
    toTrainingPlan,
  };
};
