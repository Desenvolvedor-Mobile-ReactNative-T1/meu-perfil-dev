import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Recados() {
  const navigation = useNavigation();
  const [recado, setRecado] = useState("");
  const [recados, setRecados] = useState([]);
  const [erros, setErros] = useState({});

  const tiposMensagem = ["Elogio", "Critica", "Proposta"];

  const [form, setForm] = useState({
    nome: "",
    email: "",
    querReceberResposta: false,
    mensagem: "",
    tipo: "",
  });

  const validar = () => {
    let novosErros = {};

    if (form.nome.length < 3) {
      novosErros.nome = "Digite seu nome";
    }

    if (form.email.length < 5) {
      novosErros.email = "Digite seu email";
    }

    return novosErros;
  };

  const handleSave = async () => {
    const resultValidation = validar();
    setErros(resultValidation);

    if (Object.keys(resultValidation).length > 0) {
      return;
    }

    const newArray = [...recados, form];

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

  // troca SÓ o campo que mudou
  function updateForm(field, value) {
    setForm({ ...form, [field]: value });
  }

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

  return (
    <View style={styles.screen}>
      <View style={styles.countRow}>
        <View style={styles.countIcon}>
          <Ionicons name="chatbubbles-outline" size={18} color="#1a2332" />
        </View>
        <Text style={styles.countText}>{quantidade}</Text>
      </View>

      <View style={{ padding: 12 }}>
        <Text>Nome</Text>
        <TextInput
          style={styles.input}
          value={form.nome}
          onChangeText={(value) => updateForm("nome", value)}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(text) => updateForm("email", text)}
        />
        {erros.email && <Text style={{ color: "red" }}>{erros.email}</Text>}

        <View style={{ gap: 12, flexDirection: "row" }}>
          {tiposMensagem.map((value) => (
            <Pressable
              key={value}
              onPress={() => updateForm("tipo", value)}
              style={{
                borderWidth: 1,
                borderColor: "#000",
                padding: 12,
                borderRadius: 12,
                backgroundColor: form.tipo === value ? "green" : "white",
              }}
            >
              <Text style={{ color: form.tipo === value ? "white" : "#000" }}>
                {value}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text>Recado</Text>
        <TextInput
          style={styles.input}
          value={form.mensagem}
          onChangeText={(text) => updateForm("mensagem", text)}
          multiline
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Quer receber resposta?</Text>
          <Switch
            value={form.querReceberResposta}
            onValueChange={(value) => updateForm("querReceberResposta", value)}
          />
        </View>
      </View>

      <Pressable onPress={() => handleSave()} style={styles.buttonSave}>
        <Text style={{ textAlign: "center" }}>Salvar</Text>
      </Pressable>

      <ScrollView contentContainerStyle={styles.list}>
        {recados.map((recado, index) => (
          <Text key={`${recado}-${index}`} style={styles.recado}>
            {recado.nome}:{recado.mensagem}
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
