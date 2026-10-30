import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Meu Perfil Dev</Text>
      <Text style={styles.title}>Bem-vindo ao meu perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c2200b",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 18,
  },
  eyebrow: {
    color: "#d7f1ff",
    fontSize: 12,
    fontWeight: "700",
  },
  title: {
    marginTop: 4,
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
});
