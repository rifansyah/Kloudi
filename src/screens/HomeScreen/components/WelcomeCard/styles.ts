import { StyleSheet } from "react-native";

export default StyleSheet.create({
  welcomeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  welcomeEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  welcomeCardContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  welcomeSubtitle: {
    fontSize: 12,
  },
});
