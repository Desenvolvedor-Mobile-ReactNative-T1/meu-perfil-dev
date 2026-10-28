import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e7f3fb",
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
    gap: 16,
  },
  header: {
    alignItems: "center",
    paddingTop: 8,
  },
  photo: {
    width: 120,
    height: 120,
    marginBottom: 16,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  name: {
    color: "#1a2332",
    fontSize: 28,
    fontWeight: "700",
  },
  role: {
    marginTop: 4,
    color: "#3d6d86",
    fontSize: 16,
  },
  status: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusOn: {
    backgroundColor: "#b7ef8a",
  },
  statusOff: {
    backgroundColor: "#ffd56a",
  },
  statusText: {
    color: "#1a2332",
    fontSize: 13,
    fontWeight: "700",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#1a2332",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionTitleSpaced: {
    marginBottom: 12,
  },
  link: {
    color: "#0b7ec2",
    fontSize: 14,
    fontWeight: "700",
  },
  bio: {
    color: "#3e5566",
    fontSize: 15,
    lineHeight: 23,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skill: {
    borderRadius: 999,
    backgroundColor: "#c5e8ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  skillText: {
    color: "#0b5f96",
    fontSize: 14,
    fontWeight: "600",
  },
  actions: {
    gap: 12,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfButton: {
    flex: 1,
    minHeight: 76,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 14,
  },
  halfValue: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  halfLabel: {
    marginTop: 2,
    color: "#e8f6ff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  contactButton: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#0b7ec2",
  },
  contactButtonPressed: {
    backgroundColor: "#085f94",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonTextDark: {
    color: "#1a2332",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonRecommendations: {
    backgroundColor: "#0a5f8f",
  },
  buttonUnavailable: {
    backgroundColor: "#f1d380",
  },
  buttonAvailable: {
    backgroundColor: "#68c387",
  },
});

export default styles;
