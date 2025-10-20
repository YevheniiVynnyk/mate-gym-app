import { useRouter } from "expo-router";
//import { TrainingDay } from "@/types/trainingDay";
import { TrainingDayParams } from "@/hooks/useTrainingDayForm";

export const useNavigation = () => {
  const router = useRouter();

  const goBack = () => router.back();

  // Тренировки
  const toCreateTrainingDay = () => router.push("/trainingDay/trainingDayForm");
  const toTrainingList = () => router.push("/trainingDay/trainingDayView");
  const toTrainingDetail = (id: string | number) =>
    router.push(`/trainingDay/${id}`);
  const toTrainingEdit = (params: TrainingDayParams) => {
    const { id, clientId, selectedDate, prefilledData } = params;

    const query = new URLSearchParams({
      ...(id ? { id: String(id) } : {}),
      ...(clientId ? { clientId } : {}),
      ...(selectedDate ? { selectedDate } : {}),
      ...(prefilledData
        ? { prefilledData: JSON.stringify(prefilledData) }
        : {}),
      isEdit: "true",
    }).toString();

    router.push(`/trainingDay/trainingDayForm?${query}`);
  };

  // Пример для других разделов
  const toHome = () => router.push("/app");
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
