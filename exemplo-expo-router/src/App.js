import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function CardapioScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Cappuccino"
        onPress={() => navigation.navigate("Produto", { id: 2 })}
      />
    </View>
  );
}

function ProdutoScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produto {route.params.id}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cardapio" component={CardapioScreen} />
        <Stack.Screen name="Produto" component={ProdutoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
