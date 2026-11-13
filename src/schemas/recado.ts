import { z } from "zod";

export const recadoSchema = z
  .object({
    nome: z.string().min(3, "Digite seu nome"),
    tipo: z.enum(["Elogio", "Sugestão", "Proposta"], {
      message: "Escolha um tipo",
    }),
    mensagem: z.string().max(200, "Máximo de 200 caracteres"),
    querResposta: z.boolean(),
    email: z.string(),
  })
  .refine(
    (recado) => {
      if (!recado.querResposta) {
        return true;
      }

      return recado.email.length >= 5;
    },
    {
      message: "Digite seu email",
      path: ["email"],
    },
  );
