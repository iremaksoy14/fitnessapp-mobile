import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Bildirim izinlerini iste
export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// Günlük hatırlatma bildirimi ayarla
export async function scheduleDailyReminder() {
  const reminderTimeStr = await AsyncStorage.getItem("reminderTime");
  const reminderText =
    (await AsyncStorage.getItem("reminderText")) || "Spor zamanı!";

  if (!reminderTimeStr) return;

  const reminderTime = new Date(reminderTimeStr);
  const hour = reminderTime.getHours();
  const minute = reminderTime.getMinutes();

  // Önceki bildirimleri temizle
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Egzersiz Zamanı",
      body: reminderText,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
}
