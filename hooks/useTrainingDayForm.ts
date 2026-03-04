import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { trainingDayService } from "@/services/trainingDayService";
import {
  mapFromAPI,
  mapToCreateDTO,
  mapToUpdateDTO,
} from "@/services/mapper/trainingDayMapper";
import {
  createEmptyTraining,
  updateSetData,
  updateSetsCount,
  updateTrainingField,
} from "@/utils/utils";
import { Exercise, Training, TrainingDay } from "@/types/trainingDay";
import dayjs from "dayjs";
import { logError, logInfo } from "@/utils/logger";

export interface TrainingDayParams {
  id?: string;
  selectedDate?: string;
  prefilledData?: string;
}

export const useTrainingDayForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams() as TrainingDayParams;
  const { id, selectedDate, prefilledData } = params;

  const [trainingDayName, setTrainingDayName] = useState("");
  const [trainingDayDate, setTrainingDayDate] = useState(
    selectedDate ? dayjs(selectedDate).toDate() : new Date(),
  );
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [trainingDayDuration, setTrainingDayDuration] = useState("");
  const [originalTrainingDay, setOriginalTrainingDay] =
    useState<TrainingDay | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastExerciseRef = useRef<any>(null);
  const [focusNew, setFocusNew] = useState(false);
  const isEdit = !!id;

  useEffect(() => {
    if (id) {
      const load = async () => {
        try {
          setIsLoading(true);
          const apiData = await trainingDayService.getById(+id);
          const adapted = mapFromAPI(apiData);

          setOriginalTrainingDay(adapted);
          setTrainingDayName(adapted.name);
          setTrainingDayDate(dayjs(adapted.date).toDate());
          setTrainings(adapted.trainings || []);
          setTrainingDayDuration(adapted.durationMinutes?.toString() || "");

          logInfo(
            `Training day ${id} loaded for editing.`,
            "useTrainingDayForm",
          );
        } catch (e) {
          logError(e, "useTrainingDayForm/load");
          Alert.alert("Ошибка", "Не удалось загрузить тренировку");
          router.back();
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [id]);

  useEffect(() => {
    if (prefilledData) {
      try {
        const parsedData: TrainingDay = JSON.parse(prefilledData);
        setTrainingDayName(parsedData.name);
        setTrainingDayDate(dayjs(parsedData.date).toDate());
        setTrainings(parsedData.trainings || []);
        setTrainingDayDuration(parsedData.durationMinutes?.toString() || "");
        logInfo("Prefilled data parsed successfully.", "useTrainingDayForm");
      } catch (e) {
        logError(e, "useTrainingDayForm/prefilledData");
        Alert.alert("Ошибка", "Не удалось загрузить данные тренировки");
      }
    }
  }, [prefilledData]);

  useEffect(() => {
    if (focusNew) {
      setTimeout(() => {
        lastExerciseRef.current?.focus?.();
        setFocusNew(false);
      }, 100);
    }
  }, [focusNew, trainings]);

  const addTraining = () => {
    setTrainings((prev) => [...prev, createEmptyTraining()]);
    setFocusNew(true);
  };

  const removeTraining = (trainingId: number) =>
    setTrainings(trainings.filter((t) => t.id !== trainingId));

  const updateExerciseById = (trainingId: number, exercise: Exercise) =>
    setTrainings(
      updateTrainingField(trainings, trainingId, "exercise", exercise),
    );

  const updateNotesById = (trainingId: number, note: string) =>
    setTrainings(updateTrainingField(trainings, trainingId, "note", note));

  const updateSetDataById = (
    trainingId: number,
    setIndex: number,
    field: "weight" | "repetition",
    value: number,
  ) =>
    setTrainings(updateSetData(trainings, trainingId, setIndex, field, value));

  const updateSetsById = (trainingId: number, sets: number) =>
    setTrainings(updateSetsCount(trainings, trainingId, sets));

  const validateInputs = () => {
    if (!trainingDayName.trim()) {
      Alert.alert("Ошибка", "Введите название тренировки");
      return false;
    }
    if (!trainings.length || trainings.every((t) => !t.exercise.name.trim())) {
      Alert.alert("Ошибка", "Добавьте хотя бы одно упражнение");
      return false;
    }
    return true;
  };

  const saveTrainingDay = async (execute = false, duration?: number) => {
    const finalName =
      trainingDayName.trim() ||
      `Тренировка ${dayjs(trainingDayDate).format("DD.MM.YYYY")}`;
    setTrainingDayName(finalName);
    setIsLoading(true);

    try {
      const status = execute ? "COMPLETED" : "PLANNED";
      // Формируем объект, соответствующий интерфейсу TrainingDay
      const payload: TrainingDay = {
        id: id ? Number(id) : 0,
        name: finalName,
        date: trainingDayDate, // Передаем Date объект
        trainings,
        status,
        durationMinutes: duration,
      } as TrainingDay;

      logInfo(
        `Saving training day: ${JSON.stringify(payload)}`,
        "useTrainingDayForm/save",
      );

      if (isEdit && originalTrainingDay && id) {
        // Обновление
        await trainingDayService.update(mapToUpdateDTO(payload));
      } else {
        // Создание
        await trainingDayService.create(mapToCreateDTO(payload));
      }

      Alert.alert(
        "Успешно!",
        execute ? "Тренировка выполнена" : "Тренировка сохранена",
      );
      router.back();
    } catch (e) {
      logError(e, "useTrainingDayForm/saveTrainingDay");
      Alert.alert("Ошибка", "Не удалось сохранить тренировку");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEdit,
    trainingDayName,
    setTrainingDayName,
    trainingDayDate,
    setTrainingDayDate,
    trainingDayDuration,
    setTrainingDayDuration,
    trainings,
    addTraining,
    removeTraining,
    updateExerciseById,
    updateNotesById,
    updateSetDataById,
    updateSetsById,
    validateInputs,
    saveTrainingDay,
    isLoading,
    lastExerciseRef,
  };
};
