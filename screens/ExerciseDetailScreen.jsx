// Tasarım güncellemelerini içeren React Native kodu
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import SwitchSelector from "react-native-switch-selector";

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;
  const [selectedDuration, setSelectedDuration] = useState("5");
  const [alreadyDoneSteps, setAlreadyDoneSteps] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: exercise.title,
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const fetchDoneSteps = async () => {
        const today = moment().format("YYYY-MM-DD");
        const raw = await AsyncStorage.getItem("exerciseLogs");
        const logs = raw ? JSON.parse(raw) : {};
        const doneToday = logs[today] || [];
        setAlreadyDoneSteps(doneToday);
      };

      fetchDoneSteps();
    }, [])
  );

  console.log(exercise.video, "exercise burası");
  return (
    <ScrollView style={styles.container}>
      {exercise.video ? (
        <Image source={{ uri: exercise.video }} style={styles.image} />
      ) : (
        <Image source={exercise.image} style={styles.image} />
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{exercise.title}</Text>
        <Text style={styles.category}>{exercise.category}</Text>
      </View>

      <View style={styles.durationFrame}>
        <Text style={styles.sectionTitle}>Süre Seç</Text>
        <SwitchSelector
          initial={0}
          onPress={(value) => setSelectedDuration(value)}
          options={[
            { label: "5dk", value: "5" },
            { label: "10dk", value: "10" },
            { label: "15dk", value: "15" },
          ]}
          selectedColor="#fff"
          textColor="#436eee"
          buttonColor="#436eee"
          borderColor="#436eee"
          // hasPadding
          style={{ marginBottom: 16 }}
        />
      </View>

      <Text style={styles.sectionTitle}>Adımlar</Text>
      {exercise.steps.map((step, index) => {
        const isStepDone = alreadyDoneSteps.includes(step.name);
        return (
          <View key={step.id} style={styles.stepItem}>
            <Text style={styles.stepText}>
              {index + 1}. {step.name}
            </Text>
            <TouchableOpacity
              disabled={isStepDone}
              style={[
                styles.stepStartButton,
                isStepDone && styles.disabledStepItem,
              ]}
              onPress={() =>
                navigation.navigate("WorkoutSteps", {
                  step: step,
                  stepDuration: selectedDuration * 60,
                })
              }
            >
              <Text style={styles.stepStartButtonText}>
                {isStepDone ? "TAMAMLANDI" : "BAŞLA"}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafe",
  },

  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 20,
    marginBottom: 16,
  },

  headerContainer: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },

  category: {
    fontSize: 14,
    color: "#888",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: "#333",
  },

  durationFrame: {
    backgroundColor: "#eef2ff",
    padding: 12,
    borderRadius: 14,
  },

  stepItem: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 14,
    marginVertical: 6,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },

  stepText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },

  stepStartButton: {
    backgroundColor: "#436eee",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  stepStartButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  disabledStepItem: {
    opacity: 0.5,
    backgroundColor: "#4CAF50",
    pointerEvents: "none",
  },
});
