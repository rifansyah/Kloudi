import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  barBackground: {
    flex: 1,
    height: 4,
    borderRadius: 9999,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 9999,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
    minWidth: 40,
    textAlign: "right",
  },
});
