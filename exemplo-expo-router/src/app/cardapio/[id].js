import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Produto() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Produto {id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef8ff",
  },
  titulo: {
    color: "#16324f",
    fontSize: 28,
    fontWeight: "700",
  },
});
