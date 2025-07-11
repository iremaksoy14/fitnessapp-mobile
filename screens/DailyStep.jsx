import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import * as Pedometer from "expo-sensors/build/Pedometer";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";
import { tips, motivationMessages } from "../data/daily";
import moment from "moment";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function DailyStep() {
  const [stepCount, setStepCount] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [dailyGoal, setDailyGoal] = useState(100);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
    const index = moment().dayOfYear() % motivationMessages.length;
    setMotivation(motivationMessages[index]);

    return () => subscription.remove();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadStepGoal = async () => {
        try {
          const savedGoal = await AsyncStorage.getItem("stepGoal");
          console.log("savedGoal", savedGoal);
          if (savedGoal) {
            setDailyGoal(parseInt(savedGoal));
          }
        } catch (error) {
          console.error("Adım hedefi yüklenemedi:", error);
        }
      };

      loadStepGoal();
    }, [])
  );

  console.log("dailyGoal", dailyGoal);

  const distance = (stepCount * 0.000762).toFixed(2); // km
  const calorie = Math.floor(stepCount * 0.04); // kaba hesap

  const progress = Math.min(stepCount / dailyGoal, 1);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Bugünkü Adımlarınız</Text>

      <LinearGradient colors={["#657ef8", "#5d5df7"]} style={styles.card}>
        <Text style={styles.steps}>{stepCount} adım</Text>
        <ProgressBar progress={progress} color="#fff" style={styles.progress} />
        <Text style={styles.goalText}>
          Hedef: {dailyGoal} adım (%{(stepCount * 100) / dailyGoal})
        </Text>
      </LinearGradient>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Image
            source={require("../assets/images/steps.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Mesafe</Text>
          <Text style={styles.value}>{distance} km</Text>
        </View>

        <View style={styles.statBox}>
          <Image
            source={require("../assets/images/calorie.png")}
            style={styles.icon}
          />
          <Text style={styles.label}>Kalori</Text>
          <Text style={styles.value}>{calorie} kcal</Text>
        </View>
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 İpuçları</Text>
        {tips.map((tip, index) => (
          <View key={index} style={styles.tipItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>

      <View style={styles.motivationContainer}>
        <Text style={styles.motivationLabel}>Motivasyon</Text>
        <Text style={styles.motivationText}>{motivation}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#657ef8",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },
  steps: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  progress: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#ffffff50",
    marginBottom: 10,
  },
  goalText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statBox: {
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  motivationContainer: {
    backgroundColor: "#f5f7ff",
    padding: 16,
    borderRadius: 12,

    alignItems: "center",
  },
  motivationLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#436eee",
    marginBottom: 6,
  },
  motivationText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
  },
  tipBox: {
    backgroundColor: "#eaf0ff",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
  },
  tipTitle: {
    fontWeight: "bold",
    color: "#436eee",
    marginBottom: 8,
    fontSize: 14,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  bullet: {
    fontSize: 16,
    color: "#436eee",
    marginRight: 6,
    lineHeight: 20,
  },
  tipText: {
    fontSize: 13,
    color: "#333",
    flexShrink: 1,
    lineHeight: 20,
  },
});
