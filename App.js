import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Pressable,
  Image,
  Button,
} from "react-native";

import Header from "./components/Header";
import { useState } from "react";

export default function App() {
  const [likes, setLikes] = useState(0);

  const name = "Matheus";
  const cargo = "Mentor";

  const email = "matheus@gmail.com";
  const skills = ["React Native", "JavaScript", "Git e Github", "UI/UX"];

  function addLikes() {
    setLikes(likes + 1);
  }

  return (
    <>
      <StatusBar />

      <Header />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 24 }}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300?img=41" }}
            style={styles.photo}
          />

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{cargo}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.bio} numberOfLines={3}>
            Desenvolvedora apaixonada por tecnologia e por criar experiências
            digitais simples e acessíveis. Estou sempre aprendendo e
            transformando ideias em aplicativos.
          </Text>
        </View>
        {skills.map((el) => (
          <View key={Math.random()} style={styles.skill}>
            <Text style={styles.skillText}>{el}</Text>
          </View>
        ))}
        <Button title="Curtir" onPress={addLikes} />
        <Text style={{ fontSize: 24 }}>{likes} curtidas</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert("Entre em contato", `Envie um e-mail para ${email}`)
          }
          style={({ pressed }) => [
            styles.contactButton,
            pressed && styles.contactButtonPressed,
          ]}
        >
          <Text style={styles.contactButtonText}>Entre em contato</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef8ff",
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingVertical: 12,
  },
  photo: {
    width: 132,
    height: 132,
    marginBottom: 18,
    borderRadius: 66,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  name: {
    color: "#16324f",
    fontSize: 28,
    fontWeight: "700",
  },
  role: {
    marginTop: 6,
    color: "#52718b",
    fontSize: 16,
  },
  card: {
    width: "100%",
    padding: 20,
    marginVertical: 20,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    marginBottom: 12,
    color: "#16324f",
    fontSize: 18,
    fontWeight: "700",
  },
  bio: {
    color: "#52677c",
    fontSize: 15,
    lineHeight: 23,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skill: {
    borderRadius: 16,
    backgroundColor: "#e4f4ff",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  skillText: {
    color: "#176b9c",
    fontSize: 14,
    fontWeight: "600",
  },
  contactButton: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#147db3",
  },
  contactButtonPressed: {
    backgroundColor: "#0d5277",
  },
  contactButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
