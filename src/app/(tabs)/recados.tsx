import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { recadoSchema } from "../../schemas/recado";

type RecadoForm = z.infer<typeof recadoSchema>;

const tiposMensagem = ["Elogio", "Sugestão", "Proposta"] as const;

export default function Recados() {
  const navigation = useNavigation();
  const [recados, setRecados] = useState<RecadoForm[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RecadoForm>({
    resolver: zodResolver(recadoSchema),
    defaultValues: {
      nome: "",
      email: "",
      querResposta: false,
      mensagem: "",
      tipo: "Elogio",
    },
  });

  const querResposta = watch("querResposta");
  const mensagem = watch("mensagem");

  const handleSave = async (dados: RecadoForm) => {
    const newArray = [...recados, dados];

    await AsyncStorage.setItem(
      "@meuperfildev:recados",
      JSON.stringify(newArray),
    );

    setRecados(newArray);
    reset();
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

  return (
    <View style={styles.screen}>
      <View style={styles.countRow}>
        <View style={styles.countIcon}>
          <Ionicons name="chatbubbles-outline" size={18} color="#1a2332" />
        </View>
        <Text style={styles.countText}>{quantidade}</Text>
      </View>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Nome</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          </>
        )}
      />
      {errors.nome && (
        <Text style={{ color: "#e71b1b" }}>{errors.nome.message}</Text>
      )}

      <Controller
        control={control}
        name="tipo"
        render={({ field: { onChange, value } }) => (
          <View
            style={{ gap: 12, flexDirection: "row", paddingHorizontal: 12 }}
          >
            {tiposMensagem.map((tipo) => {
              const selecionado = value === tipo;

              return (
                <Pressable
                  key={tipo}
                  onPress={() => onChange(tipo)}
                  style={{
                    borderWidth: 1,
                    borderColor: "#000",
                    padding: 12,
                    borderRadius: 12,
                    backgroundColor: selecionado ? "green" : "white",
                  }}
                >
                  <Text style={{ color: selecionado ? "white" : "#000" }}>
                    {tipo}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      />
      {errors.tipo && (
        <Text style={{ color: "#e71b1b" }}>{errors.tipo.message}</Text>
      )}

      <Controller
        control={control}
        name="mensagem"
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Recado</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              maxLength={200}
            />
          </>
        )}
      />
      <Text>{mensagem.length}/200</Text>
      {errors.mensagem && (
        <Text style={{ color: "#e71b1b" }}>{errors.mensagem.message}</Text>
      )}

      <Controller
        control={control}
        name="querResposta"
        render={({ field: { onChange, value } }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Quer receber resposta?</Text>
            <Switch value={value} onValueChange={onChange} />
          </View>
        )}
      />

      {querResposta && (
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </>
          )}
        />
      )}
      {errors.email && (
        <Text style={{ color: "#e71b1b" }}>{errors.email.message}</Text>
      )}

      <Pressable
        onPress={() => {
          handleSubmit(handleSave)();
        }}
        style={styles.buttonSave}
      >
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
