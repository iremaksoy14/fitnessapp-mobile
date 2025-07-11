import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const [stepGoal, setStepGoal] = useState("");
  const [initialGoal, setInitialGoal] = useState(null);

  useEffect(() => {
    const fetchStepGoal = async () => {
      const storedGoal = await AsyncStorage.getItem("stepGoal");
      if (storedGoal) {
        setInitialGoal(storedGoal);
        setStepGoal(storedGoal);
      }
    };
    fetchStepGoal();
  }, []);

  const saveGoal = async () => {
    if (!stepGoal || isNaN(stepGoal) || parseInt(stepGoal) <= 0) {
      Alert.alert("Uyarı", "Lütfen geçerli bir adım hedefi giriniz.");
      return;
    }
    await AsyncStorage.setItem("stepGoal", stepGoal);
    Alert.alert("Başarılı", "Hedef başarıyla kaydedildi.");
    setInitialGoal(stepGoal);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Günlük Adım Hedefi</Text>
      <Text style={styles.description}>
        Günlük adım hedefinizi belirleyin. Bu hedef, “Günlük Adım” ekranında
        gösterilecektir.
      </Text>

      <TextInput
        placeholder="Örn: 8000"
        keyboardType="numeric"
        value={stepGoal}
        onChangeText={(text) => {
          // Sadece rakamları al
          const filtered = text.replace(/[^0-9]/g, "");
          setStepGoal(filtered);
        }}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveGoal}>
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>

      {/* {initialGoal && (
        <Text style={styles.currentGoal}>
          Mevcut hedefiniz:{" "}
          <Text style={{ fontWeight: "bold" }}>{initialGoal} adım</Text>
        </Text>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#5d5df7",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  currentGoal: {
    marginTop: 24,
    fontSize: 14,
    color: "#444",
  },
});
