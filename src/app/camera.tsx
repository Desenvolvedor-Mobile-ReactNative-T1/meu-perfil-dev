import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CHAVES } from "../chaves";

export default function Camera() {
  const camera = useRef<CameraView>(null);
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [pronta, setPronta] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);

  async function tirarFoto() {
    if (!pronta) {
      return;
    }

    const resultado = await camera.current?.takePictureAsync();
    if (resultado?.uri) {
      setFoto(resultado.uri);
    }
  }

  async function usarFoto() {
    if (!foto) {
      return;
    }

    await AsyncStorage.setItem(CHAVES.foto, foto);
    router.back();
  }

  if (!permissao) {
    return <View style={styles.tela} />;
  }

  if (!permissao.granted) {
    return (
      <View style={styles.tela}>
        <Text style={styles.texto}>
          Precisamos da câmera para trocar a foto do perfil.
        </Text>
        <Pressable style={styles.botao} onPress={pedirPermissao}>
          <Text style={styles.botaoTexto}>Permitir câmera</Text>
        </Pressable>
      </View>
    );
  }

  if (foto) {
    return (
      <View style={styles.tela}>
        <Image source={{ uri: foto }} style={styles.preview} />
        <Pressable style={styles.botao} onPress={usarFoto}>
          <Text style={styles.botaoTexto}>Usar esta foto</Text>
        </Pressable>
        <Pressable style={styles.botaoSecundario} onPress={() => setFoto(null)}>
          <Text style={styles.botaoTexto}>Tirar outra</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.tela}>
      <CameraView
        ref={camera}
        style={styles.camera}
        facing="front"
        onCameraReady={() => setPronta(true)}
      />
      <Pressable style={styles.botao} onPress={tirarFoto}>
        <Text style={styles.botaoTexto}>Tirar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#111111",
    justifyContent: "flex-end",
    gap: 12,
    padding: 16,
  },
  camera: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  preview: {
    flex: 1,
    borderRadius: 16,
  },
  texto: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  botao: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#2f9e44",
  },
  botaoSecundario: {
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#1a2332",
  },
  botaoTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
