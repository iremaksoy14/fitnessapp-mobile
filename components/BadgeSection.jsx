import { View, StyleSheet, Text } from "react-native";
import { theme } from "../helper/theme";
import { makeStyles } from "../helper/makeStyles";

const Badge = ({ title, icon, itemWidth,style }) => {
  const s = useStyles();
  console.log("itemWidth", itemWidth);
  return (
    <View style={[s.badge, { width: itemWidth }, style]}>
      <View style={s.badgeIcon}>{icon || <Text style={s.emoji}>🏅</Text>}</View>
      <Text numberOfLines={1} style={s.badgeText} allowFontScaling>
        {title}
      </Text>
    </View>
  );
};

export default Badge;

const useStyles = makeStyles(({ hs, fs }) => ({
  badge: {
    backgroundColor: theme.colors.bg,
    borderRadius: hs(16),
    padding: hs(12),
    gap: hs(10),
    elevation: 1,
    shadowColor: theme.colors.dark,
    shadowOpacity: 0.05,
    shadowRadius: hs(6),
    shadowOffset: { width: 0, height: hs(2) },
  },
  badgeIcon: {
    width: hs(36),
    height: hs(36),
    borderRadius: hs(10),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.transparent,
  },
  emoji: { fontSize: fs(20) },
  badgeText: { fontWeight: "700", color: theme.colors.darkGray, fontSize: fs(14) },
}));
