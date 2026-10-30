import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const skills = [
  { id: 1, name: "React Native", level: "Avançado" },
  { id: 2, name: "UI / UX", level: "Intermediário" },
];

export default function Habilidades() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.subtitle}>
        Toque em uma habilidade para ver o detalhe.
      </Text>

      {skills.map((skill) => (
        <Link key={skill.id} href={`/habilidades/${skill.id}`} asChild>
          <Pressable style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{skill.name.slice(0, 1)}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{skill.name}</Text>
              <Text style={styles.level}>{skill.level}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        </Link>
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
