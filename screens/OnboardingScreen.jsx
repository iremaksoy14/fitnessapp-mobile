import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "../store/profileSlice";
import { Ionicons } from "@expo/vector-icons";
import { normalizeName, isValidEmail } from "../helper/validation";
import ProfileForm from "../components/ProfileForm";
export default function OnboardingScreen() {
  const dispatch = useDispatch();

  const onSubmit = (fullName, email) => {
    dispatch(completeOnboarding({ name: fullName, email }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View
            style={{
              backgroundColor: "#5D5DF7",
              borderRadius: 16,
              padding: 18,
              marginBottom: 18,
              shadowColor: "#5D5DF7",
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 8 },
              shadowRadius: 16,
              elevation: 4,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, opacity: 0.9 }}>
              Hoş geldin 👋
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "800",
                marginTop: 2,
              }}
            >
              Hadi profili tamamlayalım
            </Text>
          </View>
          <ProfileForm submitLabel="Giriş Yap" onSubmit={onSubmit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
