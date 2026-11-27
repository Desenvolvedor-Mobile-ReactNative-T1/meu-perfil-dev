import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { headerOptions } from "../styles/header";
import { ComponentProps } from "react";
import { FavoritosProvider } from "../context/FavoritosContext";

type StackOptions = ComponentProps<typeof Stack.Screen>["options"];

export default function Layout() {
  return (
    <SafeAreaProvider>
      <FavoritosProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="habilidade/[id]"
            options={{
              title: "Habilidade",
              ...(headerOptions as StackOptions),
            }}
          />
          <Stack.Screen
            name="camera"
            options={{
              presentation: "modal",
              title: "Câmera",
              ...(headerOptions as StackOptions),
            }}
          />
          <Stack.Screen
            name="mapa"
            options={{
              title: "Onde me encontrar",
              ...(headerOptions as StackOptions),
            }}
          />
        </Stack>
      </FavoritosProvider>
    </SafeAreaProvider>
  );
}
