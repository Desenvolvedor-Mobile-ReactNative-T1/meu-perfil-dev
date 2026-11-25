import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { BotaoAcao } from "../../components/BotaoAcao";
import { CartaoRecado } from "../../components/CartaoRecado";
import { recadoSchema } from "../../schemas/recado";
import { lerCache, salvarCache } from "../../services/banco";
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
  const [offline, setOffline] = useState(false);

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

  // API primeiro. Sem o json-server, o banco local mostra os recados salvos.
  async function carregar(puxando = false) {
    if (puxando) {
      setAtualizando(true);
    }

    try {
      const dados = await listarRecados();
      await salvarCache(dados);
      setRecados(dados);
      setOffline(false);
    } catch {
      setRecados(await lerCache());
      setOffline(true);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  async function enviarRecado(dados: RecadoForm) {
    try {
      await criarRecado(dados);
      reset();
      await carregar();
    } catch {
      setOffline(true);
    }
  }

  async function removerRecado(id: number) {
    try {
      await apagarRecado(id);
      const lista = recados.filter((item) => item.id !== id);
      setRecados(lista);
      await salvarCache(lista);
    } catch {
      setOffline(true);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: recados.length > 0 ? recados.length : undefined,
    });
  }, [navigation, recados.length]);

  useEffect(() => {
    carregar();
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
          onRefresh={() => carregar(true)}
        />
      }
      ListHeaderComponent={
        <View>
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
                    <BotaoAcao
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
                    </BotaoAcao>
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

          <BotaoAcao
            onPress={() => {
              handleSubmit(enviarRecado)();
            }}
            style={styles.buttonSave}
          >
            <Text style={styles.buttonSaveText}>ENVIAR RECADO</Text>
          </BotaoAcao>

          {offline ? (
            <View style={styles.aviso}>
              <Ionicons name="cloud-offline" size={18} color="#8a6a00" />
              <Text style={styles.avisoTexto}>
                Sem conexão. Recados salvos.
              </Text>
              <BotaoAcao onPress={() => carregar()}>
                <Text style={styles.tentar}>Tentar de novo</Text>
              </BotaoAcao>
            </View>
          ) : null}

          <View style={styles.countRow}>
            <View style={styles.countIcon}>
              <Ionicons name="chatbubbles-outline" size={18} color="#1a2332" />
            </View>
            <Text style={styles.countText}>{quantidade}</Text>
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <CartaoRecado recado={item} onApagar={() => removerRecado(item.id)} />
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
  input: {
    margin: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
  },
  buttonSave: {
    padding: 14,
    margin: 12,
    backgroundColor: "#1c8ff5",
    borderRadius: 12,
    alignItems: "center",
  },
  buttonSaveText: {
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
  aviso: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#fff4cc",
  },
  avisoTexto: {
    flex: 1,
    color: "#6b5300",
    fontSize: 14,
  },
  tentar: {
    color: "#1c8ff5",
    fontWeight: "700",
  },
});
