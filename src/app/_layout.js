import { Tabs } from "expo-router/js-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const icones = {
  index: "home",
  habilidades: "analytics",
  recados: "newspaper",
};

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#02a749",
          tabBarIcon: ({ color }) => (
            <Ionicons name={icones[route.name]} color={color} size={24} />
          ),
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Início" }} />
        <Tabs.Screen name="habilidades" options={{ title: "Habilidades" }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
