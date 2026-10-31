import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { headerOptions } from "../styles/header";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="habilidade/[id]"
          options={{
            title: "Habilidade",
            ...headerOptions,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
