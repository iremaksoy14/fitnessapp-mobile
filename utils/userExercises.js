import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const USER_EXERCISES = "USER_EXERCISES";

// Tüm egzersizleri getir
export const getUserExercises = async () => {
  const raw = await AsyncStorage.getItem(USER_EXERCISES);

  //json string->object
  return raw ? JSON.parse(raw) : [];
};

// Yeni egzersiz ekle
export const addUserExercise = async (exercise) => {
  const existing = await AsyncStorage.getItem(USER_EXERCISES);
  const exercises = existing ? JSON.parse(existing) : [];

  exercises.push({
    id: uuidv4(), 
    ...exercise,
  });

  await AsyncStorage.setItem(USER_EXERCISES, JSON.stringify(exercises));
};

// Egzersiz güncelle
export const updateUserExercise = async (id, updatedFields) => {
  const list = await getUserExercises();
  const updated = list.map((ex) =>
    ex.id === id ? { ...ex, ...updatedFields } : ex
  );
  await AsyncStorage.setItem(USER_EXERCISES, JSON.stringify(updated));
};

// Egzersiz sil
export const deleteUserExercise = async (id) => {
  const list = await getUserExercises();
  const updated = list.filter((ex) => ex.id !== id);
  await AsyncStorage.setItem(USER_EXERCISES, JSON.stringify(updated));
};
