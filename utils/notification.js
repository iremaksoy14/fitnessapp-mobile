import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";

// iOS ve Android için izin alma
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
};

// Belirli bir saate günlük bildirim planla
export const scheduleDailyNotification = async (hour = 9, minute = 0) => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // önceki bildirimleri sil

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🏋️ Egzersiz Zamanı!",
      body: "Bugünkü sporunu yapmayı unutma 💪",
      sound: true,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
};
