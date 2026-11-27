import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import dados from "../../data";
import { BotaoAcao } from "../../components/BotaoAcao";
import { useFavoritos } from "../../context/FavoritosContext";

export default function Habilidade() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numero = Number(id);
  const habilidade = dados.find((item) => item.id === numero);

  const { alternarFavorito, isFavorite } = useFavoritos();
  const favorito = isFavorite(numero);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{habilidade?.name ?? "Habilidade"}</Text>
      <Text style={styles.detail}>
        {habilidade?.detalhe ?? "Sem detalhes para essa habilidade."}
      </Text>
      <BotaoAcao style={styles.botao} onPress={() => alternarFavorito(numero)}>
        <Text style={styles.botaoTexto}>
          {favorito ? "★ Remover" : "★ Favoritar"}
        </Text>
      </BotaoAcao>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#e7f3fb",
  },
  title: {
    color: "#1a2332",
    fontSize: 28,
    fontWeight: "700",
  },
  detail: {
    marginTop: 8,
    color: "#3d6d86",
    fontSize: 16,
    lineHeight: 24,
  },
  botao: {
    marginTop: 24,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#2f9e44",
  },
  botaoTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
