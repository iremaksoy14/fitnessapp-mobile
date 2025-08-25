// screens/ProfileScreen.jsx
import React, { useState, useCallback, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../helper/theme";
import { formatNumber } from "../utils";
import ProgressBar from "../components/ProgressBar";
import Badge from "../components/BadgeSection";
import SectionArea from "../components/SectionArea";
import StatCard from "../components/StatCard";
import ActionRow from "../components/ActionRow";

import { makeStyles } from "../helper/makeStyles";
import { useScale } from "../helper/useScale";

// Grid/spacing parametreleri
const VISIBLE_COUNT = 3;


export default function Profile({
  user = {
    name: "İrem Aksoy",
    username: "aksoyirem612@gmail.com",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
  stats = {
    weekSteps: 24000,
    weekMinutes: 185,
    weekCalories: 1650,
    streakDays: 4,
  },
  goal = { type: "steps" },
  badges = [
    { id: "b1", title: "İlk 10K Adım" },
    { id: "b2", title: "3 Gün Streak" },
    { id: "b3", title: "İlk Yoga" },
    { id: "b4", title: "İlk 10K Adım" },
    { id: "b5", title: "3 Gün Streak" },
    { id: "b6", title: "İlk Yoga" },
  ],
  onEditProfile,
  onOpenSettings,
  onOpenSubscriptions,
  onConnectHealth,
  onExportData,
}) {
  const s = useStyles();
  const { width, hs } = useScale();

  const [dailyGoal, setDailyGoal] = useState(100);
  const [todaySteps, setTodayStep] = useState(70);

  useFocusEffect(
    useCallback(() => {
      const loadStepGoal = async () => {
        try {
          const savedGoal = await AsyncStorage.getItem("stepGoal");
          const currentStep = await AsyncStorage.getItem("currentStep");
          if (savedGoal) setDailyGoal(parseInt(savedGoal, 10));
          if (currentStep) setTodayStep(parseInt(currentStep, 10));
        } catch (error) {
          console.error("Adım hedefi yüklenemedi:", error);
        }
      };
      loadStepGoal();
    }, [])
  );

  const padding = hs(theme.padding);
  const gutter = hs(theme.gap);

  // KULLANILABİLİR clamp edilen layout genişliği - yatay paddingler
  const innerW = width - 2 * padding;

  // Rozet (Badge) genişliği: 3 görünür item + aralarındaki boşluklara göre
  const itemWidth = useMemo(() => {
    return Math.floor(
      (innerW - gutter * (VISIBLE_COUNT - 1)) / VISIBLE_COUNT
    );
  }, [innerW, gutter]);

  const goalUnit =
    goal.type === "kcal" ? "kcal" : goal.type === "minutes" ? "dk" : "adım";

    console.log("widthhhhhhhhh",width)
  return (
    <ScrollView style={s.screen} contentContainerStyle={{}}>
      {/* İçeriği clamp edilen genişliğe oturt ve ortala */}
      <View style={{ width, alignSelf: "center", padding }}>
        {/* HEADER */}
       
        <View style={s.headerCard}>
          <Image source={{ uri: user.avatar }} style={s.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{user.name}</Text>
            <Text style={s.username}>{user.username}</Text>
          </View>
          <TouchableOpacity
            onPress={onEditProfile}
            style={s.editBtn}
            activeOpacity={0.9}
          >
            <Text style={s.editBtnText}>Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* BU HAFTA */}
        <SectionArea title="Bu Hafta">
          <View style={s.statsRow}>
            <StatCard label="Adım" value={formatNumber(stats.weekSteps)} />
            <StatCard label="Süre" value={`${stats.weekMinutes} dk`} />
            
            <StatCard label="Kalori" value={`${stats.weekCalories}`} sub="kcal"
            />
          </View>
        </SectionArea>

        {/* HEDEFLER */}
        <SectionArea
          title="Hedefler"
          right={
            <TouchableOpacity onPress={onOpenSettings}>
              <Text style={s.link}>Hedefi Güncelle</Text>
            </TouchableOpacity>
          }
        >
          <View style={s.goalCard}>
            <Text style={s.goalTitle}>
              Günlük hedef: {formatNumber(dailyGoal)} {goalUnit}
            </Text>
            <Text style={s.goalCurrent}>
              Bugün:{" "}
              <Text style={{ fontWeight: "700" }}>
                {formatNumber(todaySteps)}
              </Text>{" "}
              / {formatNumber(dailyGoal)} {goalUnit}
            </Text>
            <ProgressBar value={todaySteps} max={dailyGoal} />
          </View>  
        </SectionArea>

        {/* BAŞARILAR */}
        <SectionArea
          title="Başarılar"
          right={<Text style={s.link}>Tümünü gör</Text>}
        >
          <FlatList
            data={badges}
            keyExtractor={(b) => b.id}
            renderItem={({ item }) => (
              <Badge itemWidth={itemWidth} title={item.title} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={{ paddingVertical: hs(4) }}
            ItemSeparatorComponent={() => <View style={{ width: gutter }} />}
          />
        </SectionArea>

        {/*  EYLEMLER */}
        <SectionArea title="Eylemler">
          <View style={s.card}>
            <ActionRow
              label="Apple Health / Google Fit"
              hint="Adım ve kalori verisi senkronize et"
              onPress={onConnectHealth}
              right={<Text style={s.connectBadge}>Bağla</Text>}
            />
            <View style={s.divider} />
            <ActionRow
              label="Bildirimler"
              hint="Günlük hatırlatıcıları ayarla"
              onPress={onOpenSettings}
            />
            <View style={s.divider} />
            <ActionRow
              label="Verilerimi Dışa Aktar"
              hint="CSV/JSON indir"
              onPress={onExportData}
            />
            <View style={s.divider} />
            <ActionRow
              label="Abonelik"
              hint="Planını yönet"
              onPress={onOpenSubscriptions}
            />
          </View>
        </SectionArea>

        {/* GİZLİLİK */}
        <SectionArea title="Gizlilik">
          <View style={s.card}>
            <ActionRow
              label="Gizli Mod"
              hint="İlerleme verilerini gizle"
              onPress={() => {}}
            />
            <View style={s.divider} />
            <ActionRow
              label="Hesabı Sil"
              hint="Geri alınamaz"
              onPress={() => {}}
              right={<Text style={[s.rowChevron, { color: "#E11D48" }]}>›</Text>}
            />
          </View>
        </SectionArea>
      </View>
    </ScrollView>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  screen: { backgroundColor: theme.colors.light, flex: 1 },

  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: hs(10),
    backgroundColor: theme.colors.bg,
    borderRadius: hs(16),
    padding: hs(14),
    marginBottom: hs(16),
    elevation: 1,
    shadowColor: theme.colors.dark,
    shadowOpacity: 0.05,
    shadowRadius: hs(6),
    shadowOffset: { width: 0, height: hs(2) },
  },
  avatar: { 
    width: hs(60),
     height: hs(60),
      borderRadius: hs(30)
     },
  name: { 
    fontSize: fs(16),
    fontWeight: "700", 
    color: theme.colors.darkGray 
  },
  username: { color: theme.colors.gray, marginTop: hs(2), fontSize: fs(12) },

  statsRow: { flexDirection: "row", gap: hs(12) },

  editBtn: {
    backgroundColor: theme.colors.purple,
    paddingHorizontal: hs(12),
    paddingVertical: hs(8),
    borderRadius: hs(12),
  },
  editBtnText: { color: theme.colors.bg, fontWeight: "700", fontSize: fs(14) },

  link: { color: theme.colors.purple, fontWeight: "700", fontSize: fs(12) },

  goalCard: {
    backgroundColor: theme.colors.bg,
    borderRadius: hs(16),
    padding: hs(14),
    gap: hs(8),
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: hs(6),
    shadowOffset: { width: 0, height: hs(2) },
  },
  goalTitle: { fontWeight: "700", color: theme.colors.darkGray, fontSize: fs(16) },
  goalCurrent: { color: theme.colors.mediumGray, fontSize: fs(14) },

  // actions
  card: {
    backgroundColor: theme.colors.bg,
    borderRadius: hs(16),
    overflow: "hidden",
    elevation: 1,
    shadowColor: theme.colors.dark,
    shadowOpacity: 0.05,
    shadowRadius: hs(6),
    shadowOffset: { width: 0, height: hs(2) },
  },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: theme.colors.lightGray },

  connectBadge: {
    backgroundColor: "#E0E7FF",
    color: "#3730A3",
    fontWeight: "700",
    paddingHorizontal: hs(10),
    paddingVertical: hs(6),
    borderRadius: 999,
    fontSize: fs(12),
  },

  rowChevron: { fontSize: fs(18), color: "#94A3B8" },
}));
