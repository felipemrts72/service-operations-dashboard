import type { Service } from "../types/Service";

export const services: Service[] = [
  {
    id: "1015",
    cliente: "Deu errado Silva",
    responsavel: "João",
    sector: "Torno",
    progresso: 70,
    diasRestantes: 7,
    status: "Em andamento"
  },
  {
    id: "1016",
    cliente: "Agro Peerrças MT",
    responsavel: "Carlos",
    sector: "Fabricacao",
    progresso: 25,
    diasRestantes: 12,
    status: "Iniciado"
  },
  {
    id: "1017",
    cliente: "Fazendaaaaa Santa Rita",
    responsavel: "Pedro",
    sector: "Plasma",
    progresso: 90,
    diasRestantes: -3,
    status: "Finalização"
  }
];