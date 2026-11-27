import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CHAVES } from "../chaves";

type FavoritosContextType = {
  favoritos: number[];
  alternarFavorito: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritosContext = createContext<FavoritosContextType | null>(null);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    async function carregar() {
      const salvo = await AsyncStorage.getItem(CHAVES.favoritos);

      if (salvo) {
        setFavoritos(JSON.parse(salvo));
      }

      setPronto(true);
    }

    carregar();
  }, []);

  // Sem o pronto, a lista vazia do começo apaga o que já estava salvo.
  useEffect(() => {
    if (!pronto) {
      return;
    }

    AsyncStorage.setItem(CHAVES.favoritos, JSON.stringify(favoritos));
  }, [favoritos, pronto]);

  function isFavorite(id: number) {
    return favoritos.includes(id);
  }

  function alternarFavorito(id: number) {
    setFavoritos((atual) => {
      if (atual.includes(id)) {
        return atual.filter((item) => item !== id);
      }

      return [...atual, id];
    });
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, alternarFavorito, isFavorite }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);

  if (!context) {
    throw new Error("useFavoritos precisa estar dentro do FavoritosProvider");
  }

  return context;
}
