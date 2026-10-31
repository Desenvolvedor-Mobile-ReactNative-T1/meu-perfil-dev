import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const iniciais = ["Muito bom", "Parabéns"];

export default function Recados() {
  const navigation = useNavigation();
  const recados = iniciais;

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarBadge: recados.length > 0 ? recados.length : undefined,
    });
  }, [navigation, recados.length]);

  const quantidade =
    recados.length === 1 ? "1 recado" : `${recados.length} recados`;

  return (
    <View style={styles.screen}>
      <View style={styles.countRow}>
        <View style={styles.countIcon}>
          <Ionicons name="chatbubbles-outline" size={18} color="#1a2332" />
        </View>
        <Text style={styles.countText}>{quantidade}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {recados.map((recado, index) => (
          <Text key={`${recado}-${index}`} style={styles.recado}>
            {recado}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  countRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  countIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#f2f4f6",
  },
  countText: {
    color: "#1a2332",
    fontSize: 18,
    fontWeight: "700",
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 18,
  },
  recado: {
    color: "#3a3a3a",
    fontSize: 15,
  },
});
