// screens/TimerScreen.jsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../hooks/useScale";

export default function TimerScreen({ route, navigation }) {
  const { duration } = route.params; // saniye
  const [secondsLeft, setSecondsLeft] = useState(parseInt(duration, 10) || 0);
  const s = useStyles();
  useScale({ maxLayoutWidth: 700 }); // gerekirse hs/fs hesapları için

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigation.goBack();
      return;
    }
    const t = setTimeout(() => {
      setSecondsLeft((s) => s - 1); // functional update (stale olmaz)
    }, 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, navigation]);

  return (
    <View style={s.container}>
      <Text style={s.timer}>{secondsLeft}s</Text>
    </View>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: hs(16),
  },
  timer: {
    fontSize: fs(72),
    lineHeight: fs(80),
    fontWeight: "700",
    color: "#00ffcc",
    letterSpacing: hs(1),
  },
}));
