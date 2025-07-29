import { StyleSheet, Text, View } from "react-native";
import Navigation from "./navigation/Navigation";
import { seedData } from "./utils/seedData";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
  
    seedData();
  }, []);

  return <Navigation />;
}

const styles = StyleSheet.create({});
