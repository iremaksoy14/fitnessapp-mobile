import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import {
  addUserExercise,
  getUserExercises,
  deleteUserExercise,
} from "../utils/userExercises";
import { useThemeColors } from "../hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";

export default function EditWorkoutScreen() {
  const [name, setName] = useState(""); //egzersiz adı
  const [reps, setReps] = useState(""); //tekrar

  const [duration, setDuration] = useState(""); //süre

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [selectedDate, setSelectedDate] = useState(new Date()); //tarih

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [exercises, setExercises] = useState([]);

  const colors = useThemeColors();

  useEffect(() => {
    const fetchData = async () => {
      const all = await getUserExercises();
      console.log("all", all);
      setExercises(all);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!name || (!reps && !duration)) {
      Toast.show({
        type: "error",
        text1: "Eksik bilgi",
        text2: "Lütfen tüm alanları doldurduğunuzdan emin olun.",
        position: "bottom",
      });
      return;
    }

    const exercise = {
      name,
      reps,
      duration,
      date: moment(selectedDate).format("DD.MM.YYYY"),
    };
    await addUserExercise(exercise);
    const updated = await getUserExercises();
    setExercises(updated);
    setName("");
    setReps("");
    setDuration("");
  };

  const handleDelete = async (id) => {
    await deleteUserExercise(id);
    const updated = await getUserExercises();
    setExercises(updated);
  };

  console.log("selectedDate", selectedDate);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        Yeni Egzersiz Ekle
      </Text>

      <TextInput
        placeholder="Egzersiz adı"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Tekrar (örnek: 3 x 10)"
        value={reps}
        onChangeText={setReps}
        style={styles.input}
      />
      <TextInput
        placeholder="Süre (örnek: 60 saniye)"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />

      {/* <View style={styles.times}>
        <TextInput
          placeholder="Dakika"
          keyboardType="numeric"
          value={minutes}
          onChangeText={setMinutes}
          style={styles.input}
        />
        <Text style={{ fontSize: 18 }}>-</Text>
        <TextInput
          placeholder="Saniye"
          keyboardType="numeric"
          value={seconds}
          onChangeText={setSeconds}
          style={styles.input}
        />
      </View> */}

      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={styles.dateInput}
      >
        <Text>{moment(selectedDate).format("DD.MM.YYYY")}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(date);
          setDatePickerVisibility(false);
        }}
        onCancel={() => setDatePickerVisibility(false)}
      />
      <Toast />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Ekle</Text>
      </TouchableOpacity>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Ionicons
              name="calendar"
              size={20}
              color="#555"
              style={{ marginRight: 8 }}
            />
            <Text style={{ flex: 1 }}>
              {moment(item.date).format("DD.MM.YYYY")} – {item.name} – {item.reps || item.duration}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: "red" }}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateInput: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  times: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
  },
});
