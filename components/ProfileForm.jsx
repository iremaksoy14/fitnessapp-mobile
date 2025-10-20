// components/ProfileForm.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileForm({
  initialName = "",
  initialEmail = "",
  submitLabel = "Kaydet",
  onSubmit,          // (name, email) => void
  onCancel,          // opsiyonel
}) {
  const [fullName, setFullName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [err, setErr] = useState("");
  const [focus, setFocus] = useState(null);

  const normalizeName = (v) => v.replace(/\s+/g, " ").trim();
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const handleSubmit = () => {
    const $name = normalizeName(fullName);
    if (!$name) return setErr("Lütfen ad soyad yaz.");
    if ($name.split(" ").length < 2) return setErr("Lütfen ad ve soyadı birlikte yaz.");
    if (!isValidEmail(email)) return setErr("Geçerli bir e-mail gir.");
    setErr("");
    onSubmit && onSubmit($name, email);
  };

  const disabled =
    !normalizeName(fullName) ||
    normalizeName(fullName).split(" ").length < 2 ||
    !isValidEmail(email);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }} keyboardShouldPersistTaps="handled">
        {/* İsim */}
        <View>
          <Text style={{ marginBottom: 6, color: "#111827", fontWeight: "600" }}>Ad Soyad</Text>
          <View style={{
            flexDirection: "row", alignItems: "center", borderWidth: 1.4,
            borderColor: focus === "name" ? "#5D5DF7" : "#E5E7EB",
            borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8
          }}>
            <Ionicons name="person-outline" size={18} color={focus === "name" ? "#5D5DF7" : "#9CA3AF"} />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Örn: Ceren Yılmaz"
              autoCapitalize="words"
              onFocus={() => setFocus("name")}
              onBlur={() => setFocus(null)}
              style={{ flex: 1, fontSize: 16 }}
            />
          </View>
        </View>

        {/* Email */}
        <View>
          <Text style={{ marginBottom: 6, color: "#111827", fontWeight: "600" }}>E-mail</Text>
          <View style={{
            flexDirection: "row", alignItems: "center", borderWidth: 1.4,
            borderColor: focus === "email" ? "#5D5DF7" : "#E5E7EB",
            borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8
          }}>
            <Ionicons name="mail-outline" size={18} color={focus === "email" ? "#5D5DF7" : "#9CA3AF"} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="ornek@domain.com"
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setFocus("email")}
              onBlur={() => setFocus(null)}
              style={{ flex: 1, fontSize: 16 }}
            />
          </View>
          {!!email && !isValidEmail(email) && (
            <Text style={{ color: "#DC2626", marginTop: 6, fontSize: 12 }}>Geçerli bir e-mail gir.</Text>
          )}
        </View>

        {!!err && (
          <View style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", borderWidth: 1, padding: 10, borderRadius: 10 }}>
            <Text style={{ color: "#DC2626" }}>{err}</Text>
          </View>
        )}

        <View style={{ flexDirection: "row", gap: 10 }}>
          {onCancel && (
            <TouchableOpacity
              onPress={onCancel}
              style={{ flex: 1, backgroundColor: "#E5E7EB", paddingVertical: 14, borderRadius: 12, alignItems: "center" }}
            >
              <Text style={{ color: "#111827", fontWeight: "700" }}>Vazgeç</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={disabled}
            style={{
              flex: 1,
              backgroundColor: "#5D5DF7",
              opacity: disabled ? 0.6 : 1,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center"
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "800" }}>{submitLabel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
