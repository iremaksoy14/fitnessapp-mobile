import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useScale } from "../hooks/useScale";

export const makeStyles = (factory, options) => () => {
  const scale = useScale(options); // { hs, fs, vs, ms, width, height, isTablet }
  return useMemo(
    () => StyleSheet.create(factory(scale)),
    [
      scale.width, // kısa kenar (clamp sonrası)
      scale.height, // uzun kenar
      scale.isTablet,
    ]
  );
};
