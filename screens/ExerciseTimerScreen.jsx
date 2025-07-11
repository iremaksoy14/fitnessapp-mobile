import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimerScreen({ route, navigation }) {
  const { duration } = route.params;
  const [secondsLeft, setSecondsLeft] = useState(parseInt(duration, 10));

  useEffect(() => {
    if (secondsLeft === 0) {
      navigation.goBack();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{secondsLeft}s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#00ffcc",
  },
});
