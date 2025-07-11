import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";

const WORKOUT_HISTORY = "WORKOUT_HISTORY";
import dayjs from "dayjs";
import moment from "moment";

export const saveExerciseForToday = async (exerciseName) => {
  const today = moment().format("YYYY-MM-DD");

  try {
    const raw = await AsyncStorage.getItem("exerciseLogs");
    const logs = raw ? JSON.parse(raw) : {};

    if (!logs[today]) {
      //daha önce kayıt yoksa boş dizi oluştur
      logs[today] = [];
    }

    if (!logs[today].includes(exerciseName)) {
      logs[today].push(exerciseName);
    }

    console.log("Kaydedilen adım:", exerciseName);
    console.log("Tüm kayıt:", logs);

    await AsyncStorage.setItem("exerciseLogs", JSON.stringify(logs));

    //{"2025-07-02": ["Squat", "Front Lunges", "Push-up", "Squat"]}
    await AsyncStorage.setItem("exerciseLogs", JSON.stringify(logs));
  } catch (err) {
    console.error("Kayıt hatası:", err);
  }
};

export const getExerciseLogs = async () => {
  try {
    const raw = await AsyncStorage.getItem("exerciseLogs");
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Veri çekme hatası:", err);
    return {};
  }
};
