import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo ao meu perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "rgb(121, 181, 249)",
    alignItems: "center",
    justifyContent: "center",
  },
});
