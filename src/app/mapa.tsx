import { useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { BotaoAcao } from "../components/BotaoAcao";

const cidade = {
  latitude: -22.9099,
  longitude: -47.0626,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export default function Mapa() {
  const mapa = useRef<MapView>(null);

  async function irAteVoce() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permita a localização para ir até você.");
      return;
    }

    const posicao = await Location.getCurrentPositionAsync({});

    mapa.current?.animateToRegion({
      latitude: posicao.coords.latitude,
      longitude: posicao.coords.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  }

  return (
    <View style={styles.tela}>
      <MapView
        ref={mapa}
        style={styles.mapa}
        initialRegion={cidade}
        showsUserLocation
      >
        <Marker
          coordinate={{
            latitude: cidade.latitude,
            longitude: cidade.longitude,
          }}
          title="Campinas"
          description="Onde me encontrar"
        />
      </MapView>
      <BotaoAcao style={styles.botao} onPress={irAteVoce}>
        <Text style={styles.botaoTexto}>Ir até você</Text>
      </BotaoAcao>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  mapa: {
    flex: 1,
  },
  botao: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#2f80ed",
  },
  botaoTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
