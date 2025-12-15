import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DAILY_WORKOUT_HOUR = 18;
const DAILY_WORKOUT_MINUTE = 0;
const DAYS_NO_WORKOUT = 2;
const DAILY_NOTIFICATION_KEY = "dailyWorkoutNotificationScheduled";

export function useWorkoutReminders(userId?: number) {
  useEffect(() => {
    if (!userId) return;

    async function init() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") return;

      await scheduleDailyWorkoutReminder();
      await checkInactivityReminder();
    }

    init();
  }, [userId]);
}

async function scheduleDailyWorkoutReminder() {
  const already = await AsyncStorage.getItem(DAILY_NOTIFICATION_KEY);
  if (already === "true") return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Время тренировки!",
      body: "Не забудь позаниматься сегодня!",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: DAILY_WORKOUT_HOUR,
      minute: DAILY_WORKOUT_MINUTE,
      repeats: true,
    },
  });

  await AsyncStorage.setItem(DAILY_NOTIFICATION_KEY, "true");
}

export async function checkInactivityReminder() {
  const lastTraining = await AsyncStorage.getItem("lastTrainingDate");
  if (!lastTraining) return;

  const diffDays = (Date.now() - new Date(lastTraining).getTime()) / 86400000;

  if (diffDays >= DAYS_NO_WORKOUT) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Давно не тренировался!",
        body: "Пора вернуться к тренировкам 💪",
        sound: true,
      },
      trigger: null,
    });
  }
}

export async function markWorkoutDone() {
  await AsyncStorage.setItem("lastTrainingDate", new Date().toISOString());
}
