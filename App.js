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
  TouchableOpacity,
} from "react-native";

import Header from "./components/Header";
import { useState } from "react";

// App Meu Perfil Dev (Etapa 4 de 4): a versão final da semana
// Continue no mesmo projeto. A tela que você montou antes do intervalo agora ganha vida com o useState.

// Crie um contador de recomendações com useState: um botão "Recomendar" soma 1 e a tela mostra o total.
// Transforme disponivel em estado e crie um botão que alterna entre "Disponível" e "Indisponível".
// Crie um estado mostrarHabilidades e um botão "Mostrar habilidades" / "Esconder habilidades" que mostra ou esconde a lista (use &&).
// Confira que o Cabecalho, a foto, a bio e o Pressable de contato da parte 1 continuam funcionando.
// Tire um print do app final e envie no AVA junto com o App.js e a pasta components/.

// Desafio extra: não deixe o contador passar de 10 e mostre "Limite atingido!" quando chegar lá.

export default function App() {
  const [recommendations, setRecommendations] = useState(0);
  const [available, setAvailable] = useState(true);
  const [showSkills, setShowSkill] = useState(true);

  const name = "Matheus";
  const cargo = "Mentor";

  const email = "matheus@gmail.com";
  const skills = ["React Native", "JavaScript", "Git e Github", "UI/UX"];

  const handleRecommendations = () => {
    if (recommendations === 10) {
      Alert.alert("Limite Atingido!", "Você Recomendou o que podia");
      return;
    }

    setRecommendations(recommendations + 1);
  };

  const handleAvailable = () => {
    setAvailable(!available);
  };

  const handleShowSkill = () => {
    setShowSkill(!showSkills);
  };

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
          <Text style={styles.role}>
            {available ? "Disponivel" : "Indisponivel"}
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sobre mim</Text>
          <Text style={styles.bio} numberOfLines={3}>
            Desenvolvedor, entusiasta por tecnologia e por criar experiências
            digitais simples e acessíveis. Ensinando e montando a carreira de
            novos desenvolvedores
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => handleShowSkill()}
        >
          <Text>
            {showSkills ? "Ocultar Habilidades" : "Exibir Habilidades"}
          </Text>
        </TouchableOpacity>

        {showSkills
          ? skills.map((el) => (
              <View key={Math.random()} style={styles.skill}>
                <Text style={styles.skillText}>{el}</Text>
              </View>
            ))
          : null}

        <TouchableOpacity
          accessibilityRole="button"
          style={styles.buttonRecommendations}
          onPress={() => handleRecommendations()}
        >
          <Text style={styles.contactButtonText}>
            Recomendações {recommendations}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.buttonBase,
            available ? styles.buttonUnavailable : styles.buttonAvailable,
          ]}
          onPress={handleAvailable}
        >
          <Text style={styles.contactButtonText}>
            {available ? "Tornar Indisponível" : "Tornar Disponível"}
          </Text>
        </TouchableOpacity>

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
  buttonRecommendations: {
    backgroundColor: "#0d5277",
    padding: 16,
    width: "100%",
    color: "#ffffff",
    borderRadius: 12,
  },
  buttonBase: {
    marginTop: 12,
    padding: 16,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonUnavailable: {
    backgroundColor: "#e8cb7c",
  },
  buttonAvailable: {
    backgroundColor: "#a1f672",
  },
});
