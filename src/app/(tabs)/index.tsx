import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Alert,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Linking,
  Share,
} from "react-native";

import Header from "../../components/Header";
import styles from "../../styles/index";
import { useEffect, useState } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { CHAVES } from "../../chaves";

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
  const wpp = "5519999999999";
  const githubUrl = "https://github.com/MatheusNadai";
  const fotoGithub = "https://github.com/MatheusNadai.png";
  const email = "matheus@gmail.com";
  const [foto, setFoto] = useState(fotoGithub);
  const skills = [
    { id: 1, name: "React Native" },
    { id: 2, name: "Ui / UX" },
  ];

  const handleRecommendations = async () => {
    if (recommendations === 10) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRecommendations(recommendations + 1);
  };

  const handleAvailable = async () => {
    await Haptics.selectionAsync();
    await AsyncStorage.setItem(
      "@meuperfildev:disponibilidade",
      JSON.stringify(!available),
    );
    setAvailable(!available);
  };

  const getStorage = async () => {
    const avaiableResult = await AsyncStorage.getItem(
      "@meuperfildev:disponibilidade",
    );

    if (avaiableResult) {
      setAvailable(JSON.parse(avaiableResult));
    }
  };

  const handleShowSkill = () => {
    setShowSkill(!showSkills);
  };

  async function abrirLink(url: string) {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Não foi possível abrir o link.");
    }
  }

  async function compartilharPerfil() {
    try {
      await Share.share({
        message: `Conheça meu perfil: ${githubUrl}`,
        url: githubUrl,
      });
    } catch {
      Alert.alert("Não foi possível compartilhar.");
    }
  }

  async function lerFoto() {
    const salva = await AsyncStorage.getItem(CHAVES.foto);
    setFoto(salva ?? fotoGithub);
  }

  useEffect(() => {
    getStorage();
  }, []);

  // useFocusEffect roda a função quando esta tela aparece de novo.
  // Assim, a foto salva na câmera entra no perfil ao voltar.
  useFocusEffect(() => {
    lerFoto();
  });

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Header />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Image source={{ uri: foto }} style={styles.photo} />
          <Pressable
            accessibilityRole="button"
            style={styles.trocarFotoButton}
            onPress={() => router.push("/camera")}
          >
            <Ionicons name="camera" size={18} color="#ffffff" />
            <Text style={styles.buttonText}>TROCAR FOTO</Text>
          </Pressable>
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
                <Link key={el.id} href={`/habilidade/${el.id}`}>
                  <View style={styles.skill}>
                    <Text style={styles.skillText}>{el.name}</Text>
                  </View>
                </Link>
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
            onPress={() => router.push("/recados")}
            style={({ pressed }) => [
              styles.contactButton,
              pressed && styles.contactButtonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Entrar na tela de Recados</Text>
          </Pressable>
        </View>
        {/* ----------------------------------------------------------- SEÇÃO FALE COMIGO*/}
        <Text style={styles.sectionTitle}>Fale comigo</Text>
        <Pressable
          accessibilityRole="button"
          style={styles.emailButton}
          onPress={() => abrirLink(`mailto:${email}`)}
        >
          <Text style={styles.buttonText}>MANDAR E-MAIL</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={styles.whatsappButton}
          onPress={() => abrirLink(`https://wa.me/${wpp}`)}
        >
          <Text style={styles.buttonTextDark}>CHAMAR NO WHATSAPP</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={styles.githubButton}
          onPress={() => abrirLink(githubUrl)}
        >
          <Text style={styles.buttonText}>ABRIR MEU GITHUB</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={styles.shareButton}
          onPress={compartilharPerfil}
        >
          <Text style={styles.buttonText}>COMPARTILHAR MEU PERFIL</Text>
        </Pressable>

        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          Explore
        </Text>
        <Pressable
          accessibilityRole="button"
          style={styles.exploreButton}
          onPress={() => router.push("/recados")}
        >
          <Ionicons name="chatbubbles" size={18} color="#ffffff" />
          <Text style={styles.buttonText}>MURAL DE RECADOS</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          style={styles.exploreButton}
          onPress={() => router.push("/mapa")}
        >
          <Ionicons name="location" size={18} color="#ffffff" />
          <Text style={styles.buttonText}>ONDE ME ENCONTRAR</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
