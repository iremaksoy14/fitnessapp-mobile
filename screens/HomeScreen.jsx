// screens/HomeScreen.js
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import exercisesData from "../data/exercises.js";
import { makeStyles } from "../helper/makeStyles.js";
import { useScale } from "../helper/useScale.js";
import { theme } from "../helper/theme.js";

const MIN_CARD = 156;              // tasarım px (Figma)
const GUTTER_PX = theme.gap;       // tasarım px (ör. 12/16)

export default function HomeScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);
  const s = useStyles();
  const { width, hs, fs } = useScale({ maxLayoutWidth: 700 });

  useEffect(() => setExercises(exercisesData), []);

  // Ölçeklenmiş değerler (dp)
  const gutter = hs(GUTTER_PX);
  const minCard = hs(MIN_CARD);

  // Kolon sayısı: genişlik büyüdükçe 1→2→3...
  const columns = useMemo(() => {
    return Math.max(1, Math.floor((width + gutter) / (minCard + gutter)));
  }, [width, gutter, minCard]);

  // İç kullanılabilir genişlik (sol+sağ padding’i düş)
  const innerW = width - 2 * gutter;

  // Kart genişliği: (iç genişlik - kolon aralıkları) / kolon
  const cardW = useMemo(() => {
    return Math.floor((innerW - gutter * (columns - 1)) / columns);
  }, [innerW, gutter, columns]);

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => navigation.navigate("ExerciseDetail", { exercise: item })}
      style={[s.card, { width: cardW, marginBottom: gutter }]}
    >
      <View style={s.media}>
        <Image source={item.image} style={s.mediaImg} resizeMode="cover" />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.55)"]} style={s.overlay} />
        <Text numberOfLines={2} style={s.overlayTitle}>{item.title}</Text>
      </View>

      <View style={s.meta}>
        <Text numberOfLines={1} style={s.metaTitle}>{item.title}</Text>
        <Text numberOfLines={1} style={s.metaCat}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={s.container}>
      {/* Listeyi clamp edilen genişliğe oturt ve ortala */}
      <View style={{ width, alignSelf: "center", flex: 1 }}>
        <FlatList
          data={exercises}
          renderItem={renderExercise}
          keyExtractor={(it) => String(it.id)}
          numColumns={columns}
          key={columns} // kolon değişince layout’u yenile
          contentContainerStyle={{ paddingHorizontal: gutter, paddingVertical: gutter }}
          columnWrapperStyle={{ columnGap: gutter }} // row gap: kartta marginBottom var
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const useStyles = makeStyles(({ hs, fs }) => ({
  container: { flex: 1, backgroundColor: "#fff" },

  // Kart
  card: {
    backgroundColor: "#fff",
    borderRadius: hs(12),
    overflow: "hidden",
  },

  // Görsel alanı
  media: {
    width: "100%",
    aspectRatio: 4 / 5,           // 3/4 veya 1/1 de deneyebilirsin
    backgroundColor: "#F3F4F6",
    position: "relative",
  },
  mediaImg: { width: "100%", height: "100%" },

  // Overlay başlık
  overlay: { position: "absolute", left: 0, right: 0, bottom: 0, height: "45%" },
  overlayTitle: {
    position: "absolute",
    left: hs(8),
    right: hs(8),
    bottom: hs(8),
    color: "#fff",
    fontWeight: "800",
    fontSize: fs(18),
  },

  // Alt meta şeridi
  meta: {
    paddingHorizontal: hs(8),
    paddingVertical: hs(10),
    backgroundColor: "#F7F7F7",
  },
  metaTitle: { fontSize: fs(14), fontWeight: "700", color: "#111827" },
  metaCat: { marginTop: hs(2), fontSize: fs(12), color: "#6B7280", fontWeight: "600" },
}));
