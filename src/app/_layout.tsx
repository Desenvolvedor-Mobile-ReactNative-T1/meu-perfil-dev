import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { headerOptions } from "../styles/header";
import { ComponentProps } from "react";

type StackOptions = ComponentProps<typeof Stack.Screen>["options"];

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="habilidade/[id]"
          options={{
            title: "Habilidade",
            ...(headerOptions as StackOptions),
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
