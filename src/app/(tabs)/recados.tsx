import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { recadoSchema } from "../../schemas/recado";
import {
  apagarRecado,
  criarRecado,
  listarRecados,
  type Recado,
} from "../../services/recados";

type RecadoForm = z.infer<typeof recadoSchema>;

const tiposMensagem = ["Elogio", "Sugestão", "Proposta"] as const;

export default function Recados() {
  const navigation = useNavigation();
  const [recados, setRecados] = useState<Recado[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(false);

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

  const buscarRecados = async (puxando = false) => {
    try {
      if (puxando) {
        setAtualizando(true);
      }

      setErro(false);
      const dados = await listarRecados();
      setRecados(dados);
    } catch {
      setErro(true);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  };

  async function enviarRecado(dados: RecadoForm) {
    try {
      await criarRecado(dados);
      reset();
      await buscarRecados();
    } catch {
      setErro(true);
    }
  }

  async function removerRecado(id: number) {
    try {
      await apagarRecado(id);
      setRecados((lista) => lista.filter((recado) => recado.id !== id));
    } catch {
      setErro(true);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: recados.length > 0 ? recados.length : undefined,
    });
  }, [navigation, recados.length]);

  useEffect(() => {
    buscarRecados();
  }, []);

  const quantidade =
    recados.length === 1 ? "1 recado" : `${recados.length} recados`;

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#2f9e44" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text>Não foi possível carregar os recados.</Text>
        <Pressable
          style={styles.buttonSave}
          onPress={() => {
            setCarregando(true);
            buscarRecados();
          }}
        >
          <Text style={{ textAlign: "center" }}>Tentar de novo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.screen}
      data={recados}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ gap: 24, paddingBottom: 24 }}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={atualizando}
          onRefresh={() => buscarRecados(true)}
        />
      }
      ListHeaderComponent={
        <View>
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
          handleSubmit(enviarRecado)();
        }}
        style={styles.buttonSave}
      >
        <Text style={{ textAlign: "center" }}>Salvar</Text>
      </Pressable>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemTexto}>
            <Text style={styles.recado}>
              {item.nome} · {item.tipo}
            </Text>
            <Text style={styles.recado}>{item.mensagem}</Text>
          </View>
          <Pressable onPress={() => removerRecado(item.id)} hitSlop={8}>
            <Text>X</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12,
  },
  itemTexto: {
    flex: 1,
    gap: 4,
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
