// screens/SettingsScreen.jsx
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../helper/useScale";

export default function SettingsScreen() {
  const s = useStyles();
  const { width, hs } = useScale({ maxLayoutWidth: 700 });

  const [stepGoal, setStepGoal] = useState("");
  const [initialGoal, setInitialGoal] = useState(null);

  useEffect(() => {
    const fetchStepGoal = async () => {
      try {
        const stored = await AsyncStorage.getItem("stepGoal");
        if (stored) {
          setInitialGoal(stored);
          setStepGoal(stored);
        }
      } catch (e) {
        console.warn("stepGoal okunamadı", e);
      }
    };
    fetchStepGoal();
  }, []);

  const saveGoal = useCallback(async () => {
    const n = parseInt(stepGoal, 10);
    if (!stepGoal || Number.isNaN(n) || n <= 0) {
      Alert.alert("Uyarı", "Lütfen geçerli bir adım hedefi giriniz.");
      return;
    }
    await AsyncStorage.setItem("stepGoal", String(n));
    Alert.alert("Başarılı", "Hedef başarıyla kaydedildi.");
    setInitialGoal(String(n));
  }, [stepGoal]);

  return (
    <View style={s.screen}>
      {/* İçeriği clamp edilen genişliğe oturt ve ortala */}
      <View style={[s.container, { width }]}>
        <Text style={s.title}>Günlük Adım Hedefi</Text>
        <Text style={s.description}>
          Günlük adım hedefinizi belirleyin. Bu hedef, “Günlük Adım” ekranında
          gösterilecektir.
        </Text>

        <TextInput
          placeholder="Örn: 8000"
          keyboardType="number-pad"
          returnKeyType="done"
          value={stepGoal}
          onChangeText={(t) => setStepGoal(t.replace(/[^0-9]/g, ""))}
          onSubmitEditing={saveGoal}
          style={s.input}
          placeholderTextColor="#9CA3AF"
        />

        <TouchableOpacity style={s.saveButton} onPress={saveGoal}
          hitSlop={{ top: hs(6), bottom: hs(6), left: hs(6), right: hs(6) }}>
          <Text style={s.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>

        {/* {initialGoal && (
          <Text style={s.currentGoal}>
            Mevcut hedefiniz: <Text style={{ fontWeight: "bold" }}>{initialGoal} adım</Text>
          </Text>
        )} */}
      </View>
    </View>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    alignSelf: "center",
    padding: hs(24),
  },
  title: {
    fontSize: fs(20),
    fontWeight: "700",
    marginBottom: hs(12),
    color: "#111827",
  },
  description: {
    fontSize: fs(14),
    color: "#6B7280",
    marginBottom: hs(20),
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    borderRadius: hs(10),
    paddingVertical: hs(12),
    paddingHorizontal: hs(12),
    fontSize: fs(16),
    marginBottom: hs(20),
    color: "#111827",
  },
  saveButton: {
    backgroundColor: "#5D5DF7",
    paddingVertical: hs(12),
    borderRadius: hs(10),
    alignItems: "center",
    justifyContent: "center",
    minHeight: hs(44),
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: fs(16),
    fontWeight: "700",
  },
  currentGoal: {
    marginTop: hs(24),
    fontSize: fs(14),
    color: "#374151",
  },
}));
