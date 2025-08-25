import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../helper/theme";
import { makeStyles } from "../helper/makeStyles";
const ProgressBar = ({ value = 0, max = 100 ,style}) => {
  const s = useStyles();
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));


  return (
    <View style={[s.progressTrack, style]}>
      <View style={[s.progressFill, { width: `${pct}%` }]} />
      <Text style={s.progressText} allowFontScaling>
        {pct}%
      </Text>
    </View>
  );
};

export default ProgressBar;



const useStyles = makeStyles(({ hs, fs }) => ({
  progressTrack: {
    height: hs(16),
    backgroundColor: theme.colors.secondary,
    borderRadius: hs(999),
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
  },
  progressFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.purple,
    borderRadius: hs(999),
  },
  progressText: {
    fontSize: fs(14),
    color: theme.colors.bg,
    textAlign: "center",
    fontWeight: "700",
  },
}));
