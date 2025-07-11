import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../utils/colors";

export const useThemeColors = () => {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkTheme : lightTheme;
};
