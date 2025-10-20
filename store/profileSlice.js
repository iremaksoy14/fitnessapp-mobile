// store/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Küçük yardımcılar
const normalizeName = (v) =>
  String(v || "")
    .replace(/\s+/g, " ")
    .trim();

const normalizeEmail = (v) => {
  if (v == null) return undefined; // email opsiyonel
  const s = String(v).trim().toLowerCase();
  return s || undefined;
};

const initialState = {
  booting: true, // persist rehydrate bitene kadar
  hasProfile: false, // profil var mı
  profile: null, // { id, name, email, avatarUri, units, createdAt, updatedAt }
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setBooting(state, action) {
      state.booting = !!action.payload;
    },

    // Onboarding tamamlandığında tek seferlik profil oluştur
    completeOnboarding(state, action) {
      const now = Date.now();
      state.profile = {
        id: Math.random(),
        name: normalizeName(action.payload?.name),
        email: normalizeEmail(action.payload?.email),
        // İleride ihtiyaç olursa:
        // units: action.payload?.units ?? "metric",
        // avatarUri: action.payload?.avatarUri ?? undefined,
        createdAt: now,
        updatedAt: now,
      };
      state.hasProfile = true;
    },

    // Sadece gönderilen alanları güncelle (id/createdAt korunur)
    updateProfile(state, action) {
      if (!state.profile) return;

      const patch = {};
      if ("name" in action.payload)
        patch.name = normalizeName(action.payload.name);
      if ("email" in action.payload)
        patch.email = normalizeEmail(action.payload.email);
      if ("units" in action.payload) patch.units = action.payload.units;
      if ("avatarUri" in action.payload)
        patch.avatarUri = action.payload.avatarUri;

      state.profile = {
        ...state.profile,
        ...patch,
        updatedAt: Date.now(),
      };
    },

    // Çıkış / hesabı sıfırla (persist varsa kalıcı olarak boşalır)
    signOut(state) {
      state.profile = null;
      state.hasProfile = false;
    },
  },
});

// İsteğe bağlı seçiciler (kullandığını gördüm)
export const selectHasProfile = (s) => s.profile?.hasProfile;
export const selectProfile = (s) => s.profile?.profile;

export const { setBooting, completeOnboarding, updateProfile, signOut } =
  profileSlice.actions;

export default profileSlice.reducer;
