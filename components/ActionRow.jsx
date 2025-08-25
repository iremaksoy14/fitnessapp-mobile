// components/ActionRow.jsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { makeStyles } from "../helper/makeStyles";
import { theme } from "../helper/theme";
const ActionRow = ({ label, hint, onPress, right, style }) => {
  const s = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[s.row, style]}
      hitSlop={{ top: s._hs(6), bottom: s._hs(6), left: s._hs(6), right: s._hs(6) }}
    >
      <View style={{ flex: 1 }}>
        <Text style={s.rowLabel} allowFontScaling>
          {label}
        </Text>
        {hint ? (
          <Text style={s.rowHint} allowFontScaling>
            {hint}
          </Text>
        ) : null}
      </View>

      {right ?? <Text style={s.rowChevron}>›</Text>}
    </TouchableOpacity>
  );
};

export default ActionRow;

const useStyles = makeStyles(({ hs, fs }) => ({
  // Not: hitSlop sayısal istediği için hs'i component içinde kullanabilmek adına
  // küçük bir yardımcıyı expose ediyoruz:
  _hs: (n) => hs(n),

  row: {
    paddingHorizontal: hs(16),
    paddingVertical: hs(14),
    flexDirection: "row",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: fs(15),
    fontWeight: "600",
    color: theme.colors.darkGray,
  },
  rowHint: {
    fontSize: fs(12),
    color: theme.colors.gray,
    marginTop: hs(2),
  },
  rowChevron: {
    fontSize: fs(22),
    color: theme.colors.error,
    marginLeft: hs(12),
  },
}));
