// components/SectionArea.jsx
import React from "react";
import { View, Text } from "react-native";
import { makeStyles } from "../helper/makeStyles";
import { theme } from "../helper/theme";
const SectionArea = ({ title, right, children, style, contentStyle }) => {
  const s = useStyles();

  return (
    <View style={[s.section, style]}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>{title}</Text>
        {right}
      </View>
      <View style={contentStyle}>{children}</View>
    </View>
  );
};

const useStyles = makeStyles(({ hs, fs }) => ({
  section: { marginTop: hs(18) },
  sectionHeader: {
    paddingHorizontal: hs(2),
    marginBottom: hs(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: fs(16), fontWeight: "700", color: theme.colors.darkGray },
}));

export default SectionArea;
