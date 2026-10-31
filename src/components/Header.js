import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { headerColor } from "../styles/header";

export default function Header() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Meu Perfil Dev</Text>
        <Text style={styles.title}>Bem-vindo ao meu perfil</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: headerColor,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 16,
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
