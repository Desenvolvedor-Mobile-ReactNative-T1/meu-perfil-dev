import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: "Início" }} />
        <Drawer.Screen
          name="cardapio"
          options={{ title: "Cardápio", headerShown: false }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}
