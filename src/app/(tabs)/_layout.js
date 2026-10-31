import { Tabs } from "expo-router/js-tabs";
import { Ionicons } from "@expo/vector-icons";
import { headerOptions } from "../../styles/header";

const icones = {
  index: "person",
  habilidades: "code-slash",
  recados: "chatbubbles",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        ...headerOptions,
        headerShown: false,
        tabBarActiveTintColor: "#2f9e44",
        tabBarInactiveTintColor: "#9aa0a6",
        tabBarIcon: ({ color, focused }) => (
          <Ionicons
            name={focused ? icones[route.name] : `${icones[route.name]}-outline`}
            color={color}
            size={24}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Perfil" }} />
      <Tabs.Screen
        name="habilidades"
        options={{ title: "Habilidades", headerShown: true }}
      />
      <Tabs.Screen
        name="recados"
        options={{
          title: "Recados",
          headerShown: true,
          headerTitle: "Mural de recados",
        }}
      />
    </Tabs>
  );
}
