import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Alert,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";

import Header from "../components/Header";
import styles from "../styles/index";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// App Meu Perfil Dev (Etapa 4 de 4): a versão final da semana
// Continue no mesmo projeto. A tela que você montou antes do intervalo agora ganha vida com o useState.

// Crie um contador de recomendações com useState: um botão "Recomendar" soma 1 e a tela mostra o total.
// Transforme disponivel em estado e crie um botão que alterna entre "Disponível" e "Indisponível".
// Crie um estado mostrarHabilidades e um botão "Mostrar habilidades" / "Esconder habilidades" que mostra ou esconde a lista (use &&).
// Confira que o Cabecalho, a foto, a bio e o Pressable de contato da parte 1 continuam funcionando.
// Tire um print do app final e envie no AVA junto com o App.js e a pasta components/.

// Desafio extra: não deixe o contador passar de 10 e mostre "Limite atingido!" quando chegar lá.

export default function Index() {
  const [recommendations, setRecommendations] = useState(0);
  const [available, setAvailable] = useState(true);
  const [showSkills, setShowSkill] = useState(true);

  const name = "Matheus";
  const cargo = "Mentor";

  const email = "matheus@gmail.com";
  const skills = [
    { id: 1, name: "React Native" },
    { id: 2, name: "Ui / UX" },
  ];

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
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <Header />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300?img=41" }}
            style={styles.photo}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.role}>{cargo}</Text>
          <View
            style={[
              styles.status,
              available ? styles.statusOn : styles.statusOff,
            ]}
          >
            <Text style={styles.statusText}>
              {available ? "Disponível" : "Indisponível"}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
            Sobre mim
          </Text>
          <Text style={styles.bio} numberOfLines={3}>
            Desenvolvedor, entusiasta por tecnologia e por criar experiências
            digitais simples e acessíveis. Ensinando e montando a carreira de
            novos desenvolvedores
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={handleShowSkill}
            >
              <Text style={styles.link}>
                {showSkills ? "Ocultar" : "Exibir"}
              </Text>
            </TouchableOpacity>
          </View>
          {showSkills ? (
            <View style={styles.skills}>
              {skills.map((el) => (
                <View key={el.id} style={styles.skill}>
                  <Text style={styles.skillText}>{el.name}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.actions}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              accessibilityRole="button"
              style={[styles.halfButton, styles.buttonRecommendations]}
              onPress={handleRecommendations}
            >
              <Text style={styles.halfValue}>{recommendations}</Text>
              <Text style={styles.halfLabel}>Recomendações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessibilityRole="button"
              style={[
                styles.halfButton,
                available ? styles.buttonUnavailable : styles.buttonAvailable,
              ]}
              onPress={handleAvailable}
            >
              <Text
                style={available ? styles.buttonTextDark : styles.buttonText}
              >
                {available ? "Tornar indisponível" : "Tornar disponível"}
              </Text>
            </TouchableOpacity>
          </View>

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
            <Text style={styles.buttonText}>Entre em contato</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
