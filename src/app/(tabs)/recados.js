import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Recados() {
  const navigation = useNavigation();
  const [recado, setRecado] = useState("");
  const [recados, setRecados] = useState([]);

  const handleSave = async () => {
    const newArray = [...recados, recado];

    await AsyncStorage.setItem(
      "@meuperfildev:recados",
      JSON.stringify(newArray),
    );

    setRecados(newArray);
  };

  const getStorage = async () => {
    const result = await AsyncStorage.getItem("@meuperfildev:recados");
    const storedRecados = result ? JSON.parse(result) : [];

    setRecados(storedRecados);
  };

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: recados.length > 0 ? recados.length : undefined,
    });
  }, [navigation, recados.length]);

  useEffect(() => {
    getStorage();
  }, []);

  const quantidade =
    recados.length === 1 ? "1 recado" : `${recados.length} recados`;

  console.log(recados);
  return (
    <View style={styles.screen}>
      <View style={styles.countRow}>
        <View style={styles.countIcon}>
          <Ionicons name="chatbubbles-outline" size={18} color="#1a2332" />
        </View>
        <Text style={styles.countText}>{quantidade}</Text>
      </View>

      <TextInput
        style={styles.input}
        value={recado}
        onChangeText={(text) => setRecado(text)}
      />

      <Pressable onPress={() => handleSave()} style={styles.buttonSave}>
        <Text style={{ textAlign: "center" }}>Salvar</Text>
      </Pressable>

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
  input: {
    margin: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
  },
  buttonSave: {
    padding: 12,
    margin: 12,
    backgroundColor: "rgba(43, 165, 252, 0.6)",
    borderRadius: 12,
  },
});
