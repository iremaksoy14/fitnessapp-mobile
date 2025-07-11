import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import ConfettiCannon from "react-native-confetti-cannon";
import { saveExerciseForToday } from "../utils/storage";

const RADIUS = 45;
const STROKE_WIDTH = 6;
const CIRCLE_LENGTH = 2 * Math.PI * RADIUS;
const screenWidth = Dimensions.get("window").width;

const motivationMessages = [
  "Harika gidiyorsun!",
  "Devam et!",
  "Neredeyse bitti!",
  "Sıkı çalışıyorsun!",
];

export default function WorkoutStepsScreen({ route, navigation }) {
  const { step, stepDuration } = route.params;
  const [timeLeft, setTimeLeft] = useState(stepDuration);
  const [isStarted, setIsStarted] = useState(false);
  const [prepCountdown, setPrepCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const progress = timeLeft / stepDuration;

  // 3-2-1 Animasyonu
  useEffect(() => {
    if (prepCountdown > 0) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [prepCountdown]);

  // Geri sayım ve sesli anons
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setPrepCountdown((prev) => {
        const next = prev - 1;
        // if (next > 0) Speech.speak(next.toString());
        return next;
      });
    }, 1000);

    const startTimeout = setTimeout(() => {
      clearInterval(countdownInterval);
      setIsStarted(true);
      // Speech.speak(`${step.name} egzersizi başlıyor. Hazır olun!`);
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(startTimeout);
    };
  }, []);

  // Süreyi geri say
  useEffect(() => {
    if (!isStarted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  // Motivasyon mesajları
  useEffect(() => {
    if (!isStarted) return;
    const interval = setInterval(() => {
      const message =
        motivationMessages[
          Math.floor(Math.random() * motivationMessages.length)
        ];
      // Speech.speak(message);
    }, 6000);
    return () => clearInterval(interval);
  }, [isStarted]);

  // Egzersiz bitince kayıt ve konfeti
  useEffect(() => {
    if (timeLeft === 0 && isStarted) {
      saveExerciseForToday(step.name);
      setShowConfetti(true);
      setTimeout(() => navigation.goBack(), 2000);
    }
  }, [timeLeft, isStarted]);

  useEffect(() => {
    navigation.setOptions({ title: step.name });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* GIF ve Başlık */}
      <View style={styles.gifWrapper}>
        <Image
          source={{ uri: step.gif }}
          style={styles.gif}
          resizeMode="contain"
        />
        <View style={styles.overlay} />
        <Text style={styles.stepTitleOverlay}>{step.name}</Text>
      </View>

      {/* Geri Sayım */}
      {!isStarted && prepCountdown > 0 && (
        <View style={styles.fullscreenCountdown}>
          <Animated.Text
            style={[
              styles.countdownText,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            {prepCountdown}
          </Animated.Text>
        </View>
      )}

      {!isStarted && prepCountdown === 0 && (
        <View style={styles.fullscreenCountdown}>
          <Text style={styles.countdownText}>BAŞLA!</Text>
        </View>
      )}

      {/* Sayaç */}
      {isStarted && (
        <View style={styles.timerWrapper}>
          <Svg width={100} height={100}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="#436eee" />
                <Stop offset="100%" stopColor="#67e8f9" />
              </LinearGradient>
            </Defs>
            <Circle
              cx={50}
              cy={50}
              r={RADIUS}
              stroke="#e0e0e0"
              strokeWidth={STROKE_WIDTH}
              fill="none"
            />
            <Circle
              cx={50}
              cy={50}
              r={RADIUS}
              stroke="url(#grad)"
              strokeWidth={STROKE_WIDTH}
              fill="none"
              strokeDasharray={CIRCLE_LENGTH}
              strokeDashoffset={CIRCLE_LENGTH * (1 - progress)}
              strokeLinecap="round"
              rotation="-90"
              origin="50, 50"
            />
          </Svg>
          <Text style={styles.timerText}>{timeLeft} </Text>
        </View>
      )}

      {/* İlerleme Barı */}
      {isStarted && (
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
      )}

      {/* Konfeti */}
      {showConfetti && (
        <ConfettiCannon count={100} origin={{ x: screenWidth / 2, y: 0 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    position: "relative",
  },
  gifWrapper: {
    width: "100%",
    position: "relative",
  },
  gif: {
    width: "100%",
    aspectRatio: 4 / 3,
  },
  overlay: {
    // ...StyleSheet.absoluteFillObject,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  stepTitleOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  timerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  
  },
  timerText: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#436eee",
  },
  fullscreenCountdown: {
    position: "absolute",
    top: 200,
    left: 0,
    right: 0,
    zIndex: 99,
    alignItems: "center",
  
  },
  countdownText: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#436eee",
  },
  progressBar: {
    height: 10,
    width: "80%",
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 30,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#436eee",
  },
});
