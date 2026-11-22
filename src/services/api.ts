import axios from "axios";

// IPv4 desta máquina na Ethernet. Celular e computador na mesma rede.
// Se não conectar, troque pelo IP que aparecer em ipconfig.
export const api = axios.create({
  baseURL: "http://192.168.0.17:3000",
});
