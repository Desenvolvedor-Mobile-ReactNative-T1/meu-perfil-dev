import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Habilidade() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Habilidade {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7f3fb",
  },
  title: {
    color: "#1a2332",
    fontSize: 24,
    fontWeight: "700",
  },
});
