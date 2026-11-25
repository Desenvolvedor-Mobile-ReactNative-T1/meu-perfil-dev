import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import type { RecadoLocal } from "../services/banco";
import { BotaoAcao } from "./BotaoAcao";

type CartaoRecadoProps = {
  recado: RecadoLocal;
  onApagar: () => void;
};

export function CartaoRecado({ recado, onApagar }: CartaoRecadoProps) {
  const progresso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progresso, {
      toValue: 1,
      duration: 450,
      useNativeDriver: true,
    }).start();
  }, [progresso]);

  const subir = progresso.interpolate({
    inputRange: [0, 1],
    outputRange: [28, 0],
  });

  const aparecer = progresso.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.cartao,
        {
          opacity: aparecer,
          transform: [{ translateY: subir }],
        },
      ]}
    >
      <View style={styles.texto}>
        <Text style={styles.titulo}>
          {recado.nome} · {recado.tipo}
        </Text>
        <Text style={styles.mensagem}>{recado.mensagem}</Text>
        {recado.pendente ? (
          <View style={styles.pendente}>
            <Ionicons name="cloud-offline-outline" size={14} color="#8a6a00" />
            <Text style={styles.pendenteTexto}>aguardando envio</Text>
          </View>
        ) : null}
      </View>
      <BotaoAcao onPress={onApagar}>
        <Ionicons name="close" size={18} color="#6b7280" />
      </BotaoAcao>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e4eadf",
    backgroundColor: "#f7faf4",
  },
  texto: {
    flex: 1,
    gap: 4,
  },
  titulo: {
    color: "#1a2332",
    fontSize: 15,
    fontWeight: "700",
  },
  mensagem: {
    color: "#3a3a3a",
    fontSize: 15,
  },
  pendente: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  pendenteTexto: {
    color: "#8a6a00",
    fontSize: 13,
  },
});
