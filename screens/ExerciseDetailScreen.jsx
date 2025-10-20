// screens/ExerciseDetailScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
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

import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../hooks/useScale";

export default function ExerciseDetailScreen({ route, navigation }) {
  const { exercise } = route.params;
  const s = useStyles();
  const { width, hs } = useScale({ maxLayoutWidth: 700 });

  const [selectedDuration, setSelectedDuration] = useState("5");
  const [alreadyDoneSteps, setAlreadyDoneSteps] = useState([]);

  useEffect(() => {
    navigation.setOptions({ title: exercise.title });
  }, [navigation, exercise.title]);

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

  return (
    <ScrollView
      style={s.screen}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {/* İçerik clamp + ortalama */}
      <View style={[s.container, { width }]}>
        {exercise.video ? (
          <Image source={{ uri: exercise.video }} style={s.image} />
        ) : (
          <Image source={exercise.image} style={s.image} />
        )}

        <View style={s.headerContainer}>
          <Text style={s.title}>{exercise.title}</Text>
          <Text style={s.category}>{exercise.category}</Text>
        </View>

        <View style={s.durationFrame}>
          <Text style={s.sectionTitle}>Süre Seç</Text>
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
            style={{ marginBottom: hs(16) }}
          />
        </View>

        <Text style={s.sectionTitle}>Adımlar</Text>
        {(exercise.steps || []).map((step, index) => {
          const isStepDone = alreadyDoneSteps.includes(step.name);
          return (
            <View key={step.id ?? index} style={s.stepItem}>
              <Text style={s.stepText}>
                {index + 1}. {step.name}
              </Text>

              <TouchableOpacity
                disabled={isStepDone}
                style={[s.stepStartButton, isStepDone && s.disabledStepItem]}
                hitSlop={{
                  top: hs(6),
                  bottom: hs(6),
                  left: hs(6),
                  right: hs(6),
                }}
                onPress={() =>
                  navigation.navigate("WorkoutSteps", {
                    step,
                    stepDuration: Number(selectedDuration) * 60,
                  })
                }
                activeOpacity={0.85}
              >
                <Text style={s.stepStartButtonText}>
                  {isStepDone ? "TAMAMLANDI" : "BAŞLA"}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  screen: { flex: 1, backgroundColor: "#f9fafe" },

  container: {
    alignSelf: "center",
    padding: hs(16),
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: hs(20),
    marginBottom: hs(16),
  },

  headerContainer: {
    marginBottom: hs(16),
    paddingHorizontal: hs(4),
  },

  title: {
    fontSize: fs(26),
    fontWeight: "700",
    color: "#222222",
    marginBottom: hs(4),
  },

  category: {
    fontSize: fs(14),
    color: "#888888",
  },

  sectionTitle: {
    fontSize: fs(20),
    fontWeight: "600",
    marginTop: hs(15),
    marginBottom: hs(10),
    color: "#333333",
  },

  durationFrame: {
    backgroundColor: "#eef2ff",
    padding: hs(12),
    borderRadius: hs(14),
  },

  stepItem: {
    backgroundColor: "#ffffff",
    padding: hs(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: hs(14),
    marginVertical: hs(6),

    shadowColor: "#000",
    shadowOffset: { width: 0, height: hs(1) },
    shadowOpacity: 0.08,
    shadowRadius: hs(2),
    elevation: 1,
  },

  stepText: {
    fontSize: fs(16),
    fontWeight: "500",
    color: "#444444",
    flex: 1,
    paddingRight: hs(12),
  },

  stepStartButton: {
    backgroundColor: "#436eee",
    paddingVertical: hs(6),
    paddingHorizontal: hs(14),
    borderRadius: hs(20),
  },

  stepStartButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: fs(14),
  },

  disabledStepItem: {
    opacity: 0.5,
    backgroundColor: "#4CAF50",
  },
}));
