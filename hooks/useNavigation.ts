import { useRouter } from "expo-router";
import { TrainingDayParams } from "@/hooks/useTrainingDayForm";

export const useNavigation = () => {
  const router = useRouter();

  const goBack = () => router.back();

  // -------------------------
  // TrainingDay navigation
  // -------------------------

  // /trainingDay
  const toTrainingList = () => router.push("/trainingDay");

  // /trainingDay/new
  const toCreateTrainingDay = () => router.push("/trainingDay/new");

  // /trainingDay/:id
  const toTrainingDetail = (id: string | number) =>
    router.push(`/trainingDay/${id}`);

  // /trainingDay/:id/edit
  const toTrainingEdit = (params: TrainingDayParams) => {
    const { id, selectedDate, prefilledData } = params;

    if (!id) {
      throw new Error("toTrainingEdit requires id");
    }

    router.push({
      pathname: `/trainingDay/${id}/edit`,
      params: {
        ...(selectedDate && { selectedDate }),
        ...(prefilledData && {
          prefilledData: JSON.stringify(prefilledData),
        }),
      },
    });
  };

  // -------------------------
  // Main navigation
  // -------------------------

  const toHome = () => router.push("/");
  const toDashboard = () => router.push("/dashboard");
  const toProfile = () => router.push("/profile");
  const toProgress = () => router.push("/progress");
  const toAuth = () => router.push("/auth");

  return {
    goBack,
    toTrainingList,
    toCreateTrainingDay,
    toTrainingDetail,
    toTrainingEdit,
    toHome,
    toDashboard,
    toProfile,
    toProgress,
    toAuth,
  };
};
