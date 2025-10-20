// screens/CalendarScreen.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Svg, { Path, Circle } from "react-native-svg";
import * as Pedometer from "expo-sensors/build/Pedometer";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { getExerciseLogs } from "../utils/storage";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../hooks/useScale";

export default function CalendarScreen({ navigation }) {
  const s = useStyles();
  const { width, hs } = useScale({ maxLayoutWidth: 700 });
  const padding = hs(16);
  const innerW  = Math.max(0, width - 2 * padding);

  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [stepCount, setStepCount] = useState(0);

  // Bilgi kartı (ikon + metin) — mevcut yapıyı korudum
  const [info] = useState([
    {
      id: 0,
      value: 0,
      text: "steps",
      icon: <MaterialCommunityIcons name="shoe-print" size={30} color="white" />,
    },
    {
      id: 1,
      value: 98,
      text: "bpm",
      icon: <EvilIcons name="heart" size={30} color="white" />,
    },
    {
      id: 2,
      value: 460,
      text: "calories",
      icon: <MaterialCommunityIcons name="fire" size={30} color="white" />,
    },
  ]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getExerciseLogs();
      const marked = {};
      for (const date in logs) {
        marked[date] = { marked: true, dotColor: "#436eee" };
      }
      setMarkedDates(marked);
      if (logs[selectedDate]) setSelectedExercises(logs[selectedDate]);
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    const sub = Pedometer.watchStepCount((res) => setStepCount(res.steps));
    return () => sub?.remove?.();
  }, []);

  const onDayPress = useCallback((day) => {
    const date = day.dateString;
    setSelectedDate(date);
    getExerciseLogs().then((logs) => setSelectedExercises(logs[date] || []));
  }, []);

  // Header bileşeni (Calendar + özet + info kartı)
  const renderHeader = useCallback(() => {
    const distanceKm = (stepCount * 0.000762).toFixed(2);

    return (
      <View style={{ width:innerW, alignSelf: "center" }}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              ...(markedDates[selectedDate] || {}),
              selected: true,
              selectedColor: "#436eee",
            },
          }}
          style={s.calendar}
          theme={{
            selectedDayBackgroundColor: "#436eee",
            todayTextColor: "#436eee",
            arrowColor: "#436eee",
          }}
        />

        <View style={s.summaryContainer}>
          <Image
            source={require("../assets/images/runner.png")}
            style={s.runnerImage}
          />
          <View style={s.summaryTextContainer}>
            <Text style={s.summaryTitle}>Today you run for</Text>
            <Text style={s.summaryDistance}>{distanceKm} km</Text>
          </View>
          <TouchableOpacity
            style={s.detailsButton}
            onPress={() => navigation.navigate("DailyStep")}
            activeOpacity={0.85}
          >
            <Text style={s.detailsText}>Details</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient colors={["#657ef8", "#5d5df7"]} style={s.infoCard}>
          {info.map((it) => (
            <View key={it.id}>
              <View style={s.infoRow}>
                {it.icon}
                <Text style={s.infoText}>
                  {it.value} {it.text}
                </Text>
              </View>
              <LinearGradient
                colors={["#ffffff", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={s.gradientLine}
              />
            </View>
          ))}
          {/* Eğer kavisli çizgi kullanacaksan: */}
          {/* <Svg height={hs(80)} width="100%" style={s.curvedLine}>
              <Path d="M0 70 C 100 10, 250 60, 500 10" stroke="#ffffffcc" strokeWidth="4" fill="none" />
              <Circle cx="250" cy="40" r="8" fill="#fff" stroke="#ff6b6b" strokeWidth="3" />
            </Svg> */}
        </LinearGradient>

        <Text style={s.exerciseHeader}>
          {moment(selectedDate).format("DD.MM.YYYY")} Egzersizleri
        </Text>
      </View>
    );
  }, [width, onDayPress, markedDates, selectedDate, stepCount, s, info, navigation]);

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      data={selectedExercises}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <View style={[s.exerciseCard, { width:innerW, alignSelf: "center" }]}>
          <Text style={s.exerciseName}>{item}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={s.noData}>Bugün egzersiz yapılmamış.</Text>}
      contentContainerStyle={{ paddingVertical: padding }} 
      showsVerticalScrollIndicator={false}
    />
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  calendar: {
    borderRadius: hs(10),
    elevation: 2,
    marginBottom: hs(15),
  },

  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: hs(12),
    borderRadius: hs(12),
    marginBottom: hs(12),
  },
  runnerImage: {
    width: hs(100),
    aspectRatio: 1,
    resizeMode: "cover",
    marginRight: hs(12),
  },
  summaryTextContainer: { flex: 1 },
  summaryTitle: { fontSize: fs(14), color: "#333333" },
  summaryDistance: {
    fontSize: fs(18),
    fontWeight: "700",
    color: "#436eee",
    marginTop: hs(3),
  },
  detailsButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: hs(6),
    paddingHorizontal: hs(12),
    borderRadius: hs(20),
    elevation: 2,
  },
  detailsText: { color: "#FFFFFF", fontWeight: "700", fontSize: fs(12) },

  infoCard: {
    borderRadius: hs(16),
    padding: hs(16),
    marginBottom: hs(20),
    position: "relative",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hs(6),
    gap: hs(10),
  },
  infoText: { color: "#FFFFFF", fontSize: fs(16), fontWeight: "600" },
  curvedLine: { position: "absolute", bottom: -10, left: 0 },

  exerciseHeader: {
    fontSize: fs(18),
    fontWeight: "600",
    marginBottom: hs(12),
    color: "#436eee",
    textAlign: "center",
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    padding: hs(14),
    borderRadius: hs(10),
  },
  exerciseName: { fontSize: fs(15), fontWeight: "500", color: "#333333" },

  noData: {
    fontSize: fs(14),
    color: "#000000",
    textAlign: "center",
    marginTop: hs(6),
  },
  gradientLine: { height: hs(2), width: "100%", marginBottom: hs(8) },
}));
