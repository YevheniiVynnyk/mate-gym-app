import { useRouter } from "expo-router";

export const useNavigation = () => {
    const router = useRouter();

    const goBack = () => router.back();

    // Тренировки
    const toCreateTrainingDay = () => router.push("/trainingDay/trainingDayForm");
    const toTrainingList = () => router.push("/trainingDay/trainingDayView");
    const toTrainingDetail = (id: string | number) => router.push(`/trainingDay/${id}`);
    const toTrainingEdit = (id: string | number) => router.push(`/trainingDay/${id}/edit`);

    // Пример для других разделов
    const toHome = () => router.push("/app");
    const toDashboard = () => router.push("/dashboard");
    const toProfile = () => router.push("/profile");
    const toProgress = () => router.push("/progress");
    const toDeveloperSupport = () => router.push("/developerSupport");

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

    };
};