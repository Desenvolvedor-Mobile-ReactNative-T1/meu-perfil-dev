import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Início</Text>
      <Text style={styles.texto}>Abra o menu e entre no Cardápio.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef8ff",
    padding: 24,
  },
  titulo: {
    color: "#16324f",
    fontSize: 28,
    fontWeight: "700",
  },
  texto: {
    marginTop: 8,
    color: "#52718b",
    fontSize: 16,
    textAlign: "center",
  },
});
