// screens/WorkoutStepsScreen.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import { View, Text, Image, Animated, Easing } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
// import * as Speech from "expo-speech";
import ConfettiCannon from "react-native-confetti-cannon";
import { saveExerciseForToday } from "../utils/storage";

import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../hooks/useScale";

const motivationMessages = [
  "Harika gidiyorsun!",
  "Devam et!",
  "Neredeyse bitti!",
  "Sıkı çalışıyorsun!",
];

export default function WorkoutStepsScreen({ route, navigation }) {
  const { step, stepDuration } = route.params;

  const s = useStyles();
  const { width, hs, fs } = useScale({ maxLayoutWidth: 700 });

  // Ölçekli daire metrikleri
  const RADIUS = hs(45);
  const STROKE_WIDTH = hs(6);
  const SIZE = hs(100);
  const CIRCLE_LENGTH = useMemo(() => 2 * Math.PI * RADIUS, [RADIUS]);

  const [timeLeft, setTimeLeft] = useState(Number(stepDuration) || 0);
  const [isStarted, setIsStarted] = useState(false);
  const [prepCountdown, setPrepCountdown] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const progress = useMemo(
    () => (stepDuration > 0 ? timeLeft / stepDuration : 0),
    [timeLeft, stepDuration]
  );

  // 3-2-1 animasyonu
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
  }, [prepCountdown, scaleAnim]);

  // Hazırlık geri sayımı
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setPrepCountdown((prev) => prev - 1);
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

  // Süre geri sayım
  useEffect(() => {
    if (!isStarted || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [isStarted, timeLeft]);

  // Motivasyon mesajları (opsiyonel seslendirme)
  useEffect(() => {
    if (!isStarted) return;
    const id = setInterval(() => {
      const msg =
        motivationMessages[
          Math.floor(Math.random() * motivationMessages.length)
        ];
      // Speech.speak(msg);
    }, 6000);
    return () => clearInterval(id);
  }, [isStarted]);

  // Bitiş
  useEffect(() => {
    if (timeLeft === 0 && isStarted) {
      saveExerciseForToday(step.name);
      setShowConfetti(true);
      setTimeout(() => navigation.goBack(), 2000);
    }
  }, [timeLeft, isStarted, navigation, step.name]);

  useEffect(() => {
    navigation.setOptions({ title: step.name });
  }, [navigation, step.name]);

  return (
    <View style={s.screen}>
      <View style={[s.container, { width }]}>
        {/* GIF + başlık overlay */}
        <View style={s.gifWrapper}>
          <Image
            source={{ uri: step.gif }}
            style={s.gif}
            resizeMode="contain"
          />
          <View style={s.overlay} />
          <Text style={s.stepTitleOverlay}>{step.name}</Text>
        </View>

        {/* Hazırlık sayacı */}
        {!isStarted && prepCountdown > 0 && (
          <View style={s.fullscreenCountdown}>
            <Animated.Text
              style={[s.countdownText, { transform: [{ scale: scaleAnim }] }]}
            >
              {prepCountdown}
            </Animated.Text>
          </View>
        )}
        {!isStarted && prepCountdown === 0 && (
          <View style={s.fullscreenCountdown}>
            <Text style={s.countdownText}>BAŞLA!</Text>
          </View>
        )}

        {/* Zamanlayıcı */}
        {isStarted && (
          <View style={s.timerWrapper}>
            <Svg width={SIZE} height={SIZE}>
              <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <Stop offset="0%" stopColor="#436eee" />
                  <Stop offset="100%" stopColor="#67e8f9" />
                </LinearGradient>
              </Defs>

              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="#e0e0e0"
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
              <Circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                stroke="url(#grad)"
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCLE_LENGTH}
                strokeDashoffset={CIRCLE_LENGTH * (1 - progress)}
                strokeLinecap="round"
                rotation="-90"
                origin={`${SIZE / 2}, ${SIZE / 2}`}
              />
            </Svg>
            <Text style={s.timerText}>{timeLeft}</Text>
          </View>
        )}

        {/* Lineer ilerleme */}
        {isStarted && (
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${progress * 100}%` }]} />
          </View>
        )}
      </View>

      {/* Konfeti */}
      {showConfetti && (
        <ConfettiCannon count={100} origin={{ x: width / 2, y: 0 }} />
      )}
    </View>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  screen: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    position: "relative",
  },
  container: {
    alignSelf: "center",
    padding: hs(16),
  },

  // Görsel alanı
  gifWrapper: {
    width: "100%",
    position: "relative",
  },
  gif: {
    width: "100%",
    aspectRatio: 4 / 3,
    borderRadius: hs(12),
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: hs(12),
  },
  stepTitleOverlay: {
    position: "absolute",
    bottom: hs(20),
    left: hs(20),
    color: "#FFFFFF",
    fontSize: fs(28),
    fontWeight: "700",
  },

  // Sayaç
  timerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hs(30),
  },
  timerText: {
    position: "absolute",
    top: "30%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: fs(28),
    fontWeight: "700",
    color: "#436eee",
  },

  // Hazırlık sayacı
  fullscreenCountdown: {
    position: "absolute",
    top: hs(200),
    left: 0,
    right: 0,
    zIndex: 99,
    alignItems: "center",
  },
  countdownText: {
    fontSize: fs(64),
    fontWeight: "700",
    color: "#436eee",
  },

  progressBar: {
    height: hs(10),
    width: "100%",
    backgroundColor: "#DDDDDD",
    borderRadius: hs(5),
    overflow: "hidden",
    marginTop: hs(30),
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#436eee",
  },
}));
