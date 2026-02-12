export interface Service {
  _id: string;
  id: number;
  titulo: string;
  cliente: string;
  responsavel: string;
  sector: string;
  diasRestantes: string;
  progresso: number;
  status: string;
  finishedAt?: string;
  deletedAt?: string;
}

/* 👇 CRIE ISSO AQUI */
export type CreateServiceDTO = Omit<Service, '_id'>;
