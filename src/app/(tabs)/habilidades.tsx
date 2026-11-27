import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { BotaoAcao } from "../../components/BotaoAcao";
import dados from "../../data";
import { useFavoritos } from "../../context/FavoritosContext";

type HabilidadeProps = {
  nome: string;
  detalhe: string;
  favorito?: boolean;
  onPress: () => void;
};

function Habilidade({ nome, detalhe, favorito, onPress }: HabilidadeProps) {
  return (
    <BotaoAcao
      onPress={onPress}
      style={[styles.card, favorito && styles.cardFavorita]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{nome.slice(0, 1)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>
          {favorito ? "★ " : ""}
          {nome}
        </Text>
        <Text style={styles.level}>{detalhe}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </BotaoAcao>
  );
}

export default function Habilidades() {
  const { isFavorite } = useFavoritos();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.subtitle}>
        Toque em uma habilidade para abrir o detalhe por cima das abas.
      </Text>

      {dados.map((skill) => (
        <Habilidade
          key={skill.id}
          nome={skill.name}
          detalhe={skill.detalhe}
          favorito={isFavorite(skill.id)}
          onPress={() => router.push(`/habilidade/${skill.id}`)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e7f3fb",
  },
  content: {
    padding: 24,
    gap: 12,
  },
  subtitle: {
    marginBottom: 4,
    color: "#3d6d86",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  cardFavorita: {
    backgroundColor: "#d8f5df",
  },
  badge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#c5e8ff",
  },
  badgeText: {
    color: "#0b5f96",
    fontSize: 20,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#1a2332",
    fontSize: 17,
    fontWeight: "700",
  },
  level: {
    marginTop: 2,
    color: "#3d6d86",
    fontSize: 14,
  },
  chevron: {
    color: "#0b7ec2",
    fontSize: 28,
    fontWeight: "600",
  },
});
