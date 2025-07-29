import React, { useEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { getExerciseLogs } from "../utils/storage";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";

export default function CalendarScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedExercises, setSelectedExercises] = useState([]);

  const [stepCount, setStepCount] = useState(0);

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
    const subscribe = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    return () => subscribe.remove();
  }, []);
  const onDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);
    getExerciseLogs().then((logs) => {
      setSelectedExercises(logs[date] || []);
    });
  };

  const renderheader = () => {
    return (
      <View>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              ...markedDates[selectedDate],
              selected: true,
              selectedColor: "#436eee",
            },
          }}
          style={styles.calendar}
          theme={{
            selectedDayBackgroundColor: "#436eee",
            todayTextColor: "#436eee",
            arrowColor: "#436eee",
          }}
        />

        <View style={styles.summaryContainer}>
          <Image
            source={require("../assets/images/runner.png")}
            style={styles.runnerImage}
          />
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>Today you run for</Text>
            <Text style={styles.summaryDistance}>
              {" "}
              {(stepCount * 0.000762).toFixed(2)} km
            </Text>
          </View>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient colors={["#657ef8", "#5d5df7"]} style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="shoe-print" size={30} color="white" />
            <Text style={styles.infoText}>{stepCount} steps</Text>
          </View>
          <LinearGradient
            colors={["#ffffff", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientLine}
          />

          <View style={styles.infoRow}>
            <EvilIcons name="heart" size={30} color="white" />
            <Text style={styles.infoText}>98 bpm</Text>
          </View>
          <LinearGradient
            colors={["#ffffff", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientLine}
          />
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="fire" size={30} color="white" />
            <Text style={styles.infoText}>460 calories</Text>
          </View>
          <LinearGradient
            colors={["#ffffff", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientLine}
          />

          {/* 🎯 SVG ile kavisli çizgi */}
          {/* <Svg height="80" width="100%" style={styles.curvedLine}>
          <Path
            d="M0 70 C 100 10, 250 60, 500 10"
            stroke="#ffffffcc"
            strokeWidth="4"
            fill="none"
          />
          <Circle
            cx="250"
            cy="40"
            r="8"
            fill="#fff"
            stroke="#ff6b6b"
            strokeWidth="3"
          />
        </Svg> */}
        </LinearGradient>

        <Text style={styles.exerciseHeader}>
          {moment(selectedDate).format("DD.MM.YYYY")} Egzersizleri
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      // style={{ padding: 16 }}
      ListHeaderComponent={renderheader}
      data={selectedExercises}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.exerciseCard}>
          <Text style={styles.exerciseName}>{item}</Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.noData}>Bugün egzersiz yapılmamış.</Text>
      }
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  calendar: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },

  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f7ff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  runnerImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginRight: 12,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    color: "#333",
  },
  summaryDistance: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#436eee",
  },
  detailsButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 2,
  },
  detailsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    gap: 10,
  },
  infoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  curvedLine: {
    position: "absolute",
    bottom: -10,
    left: 0,
  },

  exerciseHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  exerciseCard: {
    backgroundColor: "white",
    padding: 14,

    marginVertical: 5,
    borderRadius: 10,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  noData: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
    marginTop: 6,
  },
  gradientLine: {
    height: 1.5,
    width: "100%",
    marginBottom: 8,
  },
});
