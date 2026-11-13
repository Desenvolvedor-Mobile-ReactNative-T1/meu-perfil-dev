import { router } from "expo-router";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cardapio() {
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Cappuccino" onPress={() => router.push("/cardapio/2")} />
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
});
