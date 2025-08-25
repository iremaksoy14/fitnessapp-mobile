// screens/DailyStep.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import * as Pedometer from "expo-sensors/build/Pedometer";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";
import { tips, motivationMessages } from "../data/daily";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../helper/useScale";

export default function DailyStep() {
  const s = useStyles();
  const { width, hs } = useScale({ maxLayoutWidth: 700 });

  const [stepCount, setStepCount] = useState(56);
  const [motivation, setMotivation] = useState("");
  const [dailyGoal, setDailyGoal] = useState(100);

  useEffect(() => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });
    const index = moment().dayOfYear() % motivationMessages.length;
    setMotivation(motivationMessages[index]);

    return () => {
      if (subscription && subscription.remove) subscription.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadStepGoal = async () => {
        try {
          const savedGoal = await AsyncStorage.getItem("stepGoal");
          if (savedGoal) setDailyGoal(parseInt(savedGoal, 10));
        } catch (error) {
          console.error("Adım hedefi yüklenemedi:", error);
        }
      };
      loadStepGoal();
    }, [])
  );

  const distance = useMemo(() => (stepCount * 0.000762).toFixed(2), [stepCount]); // km
  const calorie = useMemo(() => Math.floor(stepCount * 0.04), [stepCount]); // kaba hesap
  const progress = useMemo(
    () => (dailyGoal > 0 ? Math.min(stepCount / dailyGoal, 1) : 0),
    [stepCount, dailyGoal]
  );
  const percent = useMemo(
    () => (dailyGoal > 0 ? Math.round((stepCount * 100) / dailyGoal) : 0),
    [stepCount, dailyGoal]
  );

  return (
    <ScrollView style={s.screen} contentContainerStyle={{ alignItems: "center" }}>
      {/* İçerik clamp + ortalama */}
      <View style={[s.container, { width }]}>
        <Text style={s.header}>Bugünkü Adımlarınız</Text>

        <LinearGradient colors={["#657ef8", "#5d5df7"]} style={s.card}>
          <Text style={s.steps}>{stepCount} adım</Text>

          <ProgressBar
            progress={progress}
            color="#FFFFFF"
            style={s.progress}
          />

          <Text style={s.goalText}>
            Hedef: {dailyGoal} adım (%{percent})
          </Text>
        </LinearGradient>

        <View style={s.stats}>
          <View style={s.statBox}>
            <Image source={require("../assets/images/steps.png")} style={s.icon} />
            <Text style={s.label}>Mesafe</Text>
            <Text style={s.value}>{distance} km</Text>
          </View>

          <View style={s.statBox}>
            <Image source={require("../assets/images/calorie.png")} style={s.icon} />
            <Text style={s.label}>Kalori</Text>
            <Text style={s.value}>{calorie} kcal</Text>
          </View>
        </View>

        <View style={s.tipBox}>
          <Text style={s.tipTitle}>💡 İpuçları</Text>
          {tips.map((tip, index) => (
            <View key={index} style={s.tipItem}>
              <Text style={s.bullet}>•</Text>
              <Text style={s.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={s.motivationContainer}>
          <Text style={s.motivationLabel}>Motivasyon</Text>
          <Text style={s.motivationText}>{motivation}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    padding: hs(20),
  },

  header: {
    fontSize: fs(20),
    fontWeight: "700",
    marginBottom: hs(20),
    color: "#333333",
  },

  card: {
    borderRadius: hs(16),
    padding: hs(20),
    overflow: "hidden",
    marginBottom: hs(30),
    elevation: 3,
  },
  steps: {
    fontSize: fs(36),
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: hs(10),
  },
  progress: {
    height: hs(8),
    borderRadius: hs(10),
    backgroundColor: "#ffffff50",
    marginBottom: hs(10),
  },
  goalText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: fs(14),
    fontWeight: "700",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: hs(16),
  },
  statBox: {
    alignItems: "center",
  },
  icon: {
    width: hs(40),
    height: hs(40),
    marginBottom: hs(6),
    resizeMode: "contain",
  },
  label: {
    fontSize: fs(14),
    color: "#555555",
  },
  value: {
    fontSize: fs(16),
    fontWeight: "700",
    color: "#333333",
  },

  tipBox: {
    backgroundColor: "#eaf0ff",
    padding: hs(12),
    borderRadius: hs(12),
    marginTop: hs(16),
    marginBottom: hs(24),
  },
  tipTitle: {
    fontWeight: "700",
    color: "#436eee",
    marginBottom: hs(8),
    fontSize: fs(14),
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: hs(8),
  },
  bullet: {
    fontSize: fs(18),
    color: "#436eee",
    marginRight: hs(6),
    lineHeight: fs(20),
  },
  tipText: {
    fontSize: fs(13),
    color: "#333333",
    flexShrink: 1,
    lineHeight: fs(20),
  },

  motivationContainer: {
    backgroundColor: "#f5f7ff",
    padding: hs(16),
    borderRadius: hs(12),
    alignItems: "center",
    marginBottom: hs(16),
  },
  motivationLabel: {
    fontSize: fs(14),
    fontWeight: "700",
    color: "#436eee",
    marginBottom: hs(6),
  },
  motivationText: {
    fontSize: fs(16),
    color: "#333333",
    fontWeight: "700",
    textAlign: "center",
  },
}));
