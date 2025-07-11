import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WorkoutTimerScreen({ route, navigation }) {
  const { durationInMinutes } = route.params; // örn: 5

  const [secondsLeft, setSecondsLeft] = useState(durationInMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
      <Text style={styles.label}>Süre Dolana Kadar Devam Et!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 64,
    color: "#fff",
    fontWeight: "bold",
  },
  label: {
    marginTop: 12,
    color: "#bbb",
    fontSize: 16,
  },
});
