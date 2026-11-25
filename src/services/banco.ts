import * as SQLite from "expo-sqlite";
import type { NovoRecado, Recado } from "./recados";

export type RecadoLocal = Recado & {
  pendente: boolean;
};

type Linha = {
  id: number;
  nome: string;
  email: string;
  querResposta: number;
  mensagem: string;
  tipo: Recado["tipo"];
  pendente: number;
};

let banco: SQLite.SQLiteDatabase | null = null;

async function abrir() {
  if (banco) {
    return banco;
  }

  banco = await SQLite.openDatabaseAsync("meuperfil.db");
  await banco.execAsync(`
    CREATE TABLE IF NOT EXISTS recados (
      id INTEGER PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      querResposta INTEGER NOT NULL,
      mensagem TEXT NOT NULL,
      tipo TEXT NOT NULL,
      pendente INTEGER NOT NULL DEFAULT 0
    );
  `);

  return banco;
}

function paraRecado(linha: Linha): RecadoLocal {
  return {
    id: linha.id,
    nome: linha.nome,
    email: linha.email,
    querResposta: linha.querResposta === 1,
    mensagem: linha.mensagem,
    tipo: linha.tipo,
    pendente: linha.pendente === 1,
  };
}

export async function salvarCache(recados: Recado[]) {
  const db = await abrir();
  await db.execAsync("DELETE FROM recados WHERE pendente = 0");

  for (const recado of recados) {
    await db.runAsync(
      `INSERT OR REPLACE INTO recados
        (id, nome, email, querResposta, mensagem, tipo, pendente)
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      recado.id,
      recado.nome,
      recado.email,
      recado.querResposta ? 1 : 0,
      recado.mensagem,
      recado.tipo,
    );
  }
}

export async function lerCache() {
  const db = await abrir();
  const linhas = await db.getAllAsync<Linha>(
    "SELECT * FROM recados ORDER BY pendente ASC, id ASC",
  );

  return linhas.map(paraRecado);
}

export async function salvarPendente(recado: NovoRecado) {
  const db = await abrir();

  await db.runAsync(
    `INSERT INTO recados
      (id, nome, email, querResposta, mensagem, tipo, pendente)
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
    -Date.now(),
    recado.nome,
    recado.email,
    recado.querResposta ? 1 : 0,
    recado.mensagem,
    recado.tipo,
  );
}

export async function apagarLocal(id: number) {
  const db = await abrir();
  await db.runAsync("DELETE FROM recados WHERE id = ?", id);
}

export async function listarPendentes() {
  const db = await abrir();
  const linhas = await db.getAllAsync<Linha>(
    "SELECT * FROM recados WHERE pendente = 1 ORDER BY id ASC",
  );

  return linhas.map(paraRecado);
}
