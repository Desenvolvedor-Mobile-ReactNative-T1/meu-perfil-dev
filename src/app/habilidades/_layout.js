import { Stack } from "expo-router";

export default function HabilidadesLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#1a2332",
        headerStyle: { backgroundColor: "#ffffff" },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Habilidades", headerShown: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Habilidade", headerShown: true }}
      />
    </Stack>
  );
}
