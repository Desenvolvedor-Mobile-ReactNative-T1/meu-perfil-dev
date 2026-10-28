import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0b7ec2" },
          headerTintColor: "#fff",
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Início" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
