// components/StatCard.jsx
import React from "react";
import { View, Text } from "react-native";
import { makeStyles } from "../helper/makeStyles";
import { theme } from "../helper/theme";
const StatCard = ({ label, value, sub, style }) => {
  const s = useStyles();
  return (
    <View style={[s.statCard, style]}>
      <Text style={s.statLabel}>{label}</Text>
      <Text style={s.statValue}>{value}</Text>
      {sub ? <Text style={s.statSub}>{sub}</Text> : null}
    </View>
  );
};

export default StatCard;

const useStyles = makeStyles(({ hs, fs }) => ({
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.bg,
    borderRadius: hs(16),
    padding: hs(14),
    elevation: 1,
    shadowColor: theme.colors.dark,
    shadowOpacity: 0.05,
    shadowRadius: hs(6),
    shadowOffset: { width: 0, height: hs(2) },
  },
  statLabel: { color: theme.colors.gray, fontSize: fs(12) },
  statValue: {
    marginTop: hs(6),
    fontSize: fs(16),
    fontWeight: "800",
    color: theme.colors.darkGray,
  },
  statSub: { color: "#94A3B8", marginTop: hs(2), fontSize: fs(12) },
}));
