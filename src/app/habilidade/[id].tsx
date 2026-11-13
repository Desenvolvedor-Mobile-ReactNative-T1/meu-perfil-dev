import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import dados from "../../data";

export default function Habilidade() {
  const { id } = useLocalSearchParams();
  const habilidade = dados.find((item) => String(item.id) === String(id));

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{habilidade?.name ?? "Habilidade"}</Text>
      <Text style={styles.detail}>
        {habilidade?.detalhe ?? "Sem detalhes para essa habilidade."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#e7f3fb",
  },
  title: {
    color: "#1a2332",
    fontSize: 28,
    fontWeight: "700",
  },
  detail: {
    marginTop: 8,
    color: "#3d6d86",
    fontSize: 16,
    lineHeight: 24,
  },
});
