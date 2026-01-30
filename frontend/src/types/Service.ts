import type { Sector } from "./Sector";

export type Service = {
  id: number;
  titulo: string;
  cliente: string;
  responsavel: string;
  sector: Sector; // sempre um dos setores válidos
  diasRestantes: number;
  progresso: number; // 0 a 100
  status: "Iniciado" | "Em andamento" | "Finalização" | "Finalizado";
};
