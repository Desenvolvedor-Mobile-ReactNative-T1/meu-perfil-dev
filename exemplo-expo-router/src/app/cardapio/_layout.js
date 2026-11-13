import { DrawerToggleButton } from "expo-router/drawer";
import { Stack } from "expo-router";

export default function CardapioLayout() {
  return (
    <Stack screenOptions={{ animation: "slide_from_bottom" }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Cardápio",
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Stack.Screen name="[id]" options={{ title: "Produto" }} />
    </Stack>
  );
}
