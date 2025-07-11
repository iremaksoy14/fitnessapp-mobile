// WorkoutCompleteScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WorkoutCompleteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tebrikler! 🎉</Text>
      <Text style={styles.message}>Tüm egzersizleri başarıyla tamamladın!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
  message: { fontSize: 16, color: "gray" },
});
