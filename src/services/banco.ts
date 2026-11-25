import * as SQLite from "expo-sqlite";
import type { Recado } from "./recados";

async function abrir() {
  const banco = await SQLite.openDatabaseAsync("meuperfil.db");

  await banco.execAsync(`
    CREATE TABLE IF NOT EXISTS recados (
      id INTEGER PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      querResposta INTEGER NOT NULL,
      mensagem TEXT NOT NULL,
      tipo TEXT NOT NULL
    );
  `);

  return banco;
}

export async function salvarCache(recados: Recado[]) {
  const banco = await abrir();

  await banco.execAsync("DELETE FROM recados");

  for (const recado of recados) {
    await banco.runAsync(
      "INSERT INTO recados (id, nome, email, querResposta, mensagem, tipo) VALUES (?, ?, ?, ?, ?, ?)",
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
  const banco = await abrir();
  const recados = await banco.getAllAsync<Recado>("SELECT * FROM recados");

  return recados.map((recado) => ({
    ...recado,
    querResposta: Boolean(recado.querResposta),
  }));
}
