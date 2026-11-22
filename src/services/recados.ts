import { api } from "./api";

export type Recado = {
  id: number;
  nome: string;
  email: string;
  querResposta: boolean;
  mensagem: string;
  tipo: "Elogio" | "Sugestão" | "Proposta";
};

export type NovoRecado = Omit<Recado, "id">;

export async function criarRecado(recado: NovoRecado) {
  const { data } = await api.post<Recado>("/recados", recado);
  return data;
}

export async function listarRecados() {
  const result = await api.get<Recado[]>("/recados");
  return result.data;
}

export async function apagarRecado(id: number) {
  await api.delete(`/recados/${id}`);
}
