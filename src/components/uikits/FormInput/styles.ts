import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputArea: {
    flex: 1,
    justifyContent: "center",
  },
  labelContainer: {
    position: "absolute",
    left: 12,
    top: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 8,
  },
  toggleButton: {
    padding: 8,
  },
  toggleIcon: {
    fontSize: 18,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
    marginLeft: 4,
  },
});
