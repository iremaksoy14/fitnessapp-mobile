import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import exercisesData from "../data/exercises.js";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const spacing = 15;

//(totalwidth-(spacing*(numColumns+1)))/numColumns
const itemWidth = (screenWidth - spacing * 3) / 2; // 2 item + 3 spacing

export default function HomeScreen({ navigation }) {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setExercises(exercisesData);
  }, []);

  const renderExercise = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ExerciseDetail", { exercise: item })
        }
        style={styles.card}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Kategoriler</Text> */}
      <FlatList
        data={exercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "center",gap:spacing}}
        // contentContainerStyle={{padding:10}}
        // contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    // marginBottom: 15,
    // backgroundColor: "#f5f5f5",
    // borderRadius: 8,
    // borderColor: "#f6f6f6",
    // borderWidth: 1,
    // overflow: "hidden",
    // flex: 1,
    width: itemWidth,
    marginBottom: spacing,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
  height:160,
  
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: { fontSize: 18, fontWeight: "bold", padding: 8 },
  category: {
    fontSize: 14,
    color: "gray",
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
