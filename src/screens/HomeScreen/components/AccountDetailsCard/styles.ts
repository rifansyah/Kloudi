import { StyleSheet } from "react-native";

export default StyleSheet.create({
  detailsCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  detailsHeader: {
    padding: 12,
    borderBottomWidth: 1,
  },
  detailsTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
  },
  lastDetailRow: {
    borderBottomWidth: 0,
  },
  detailLabel: {
    fontSize: 11,
  },
  detailValue: {
    fontSize: 14,
  },
});
