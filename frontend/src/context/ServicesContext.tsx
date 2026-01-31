import { createContext, useContext, useState, useEffect } from 'react';
import type { Service } from '../types/Service';
import * as api from '../api'; // Arquivo que centraliza chamadas à API

interface ServicesContextType {
  services: Service[];
  addService: (service: Service) => Promise<void>;
  updateServiceProgress: (id: string, newProgress: number) => Promise<void>;
  finalizeService: (id: string) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | null>(null);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  // Carregar serviços do backend ao iniciar
  useEffect(() => {
    async function loadServices() {
      const data = await api.getServices();

      setServices(data);
    }
    loadServices();
  }, []);

  async function addService(service: Service) {
    const newService = await api.addService(service);
    setServices((prev) => [...prev, newService]);
  }

  async function updateServiceProgress(id: string, newProgress: number) {
    const updated = await api.updateService(id, { progresso: newProgress });
    setServices((prev) => prev.map((s) => (s.id === Number(id) ? updated : s)));
  }

  async function finalizeService(id: string) {
    try {
      const updated = await api.finalizeService(id);
      if (!updated) {
        alert('Erro: serviço não encontrado');
        return;
      }
      setServices((prev) =>
        prev.map((s) => (s.id === Number(id) ? updated : s)),
      );
    } catch (err) {
      console.error(err);
      alert('Erro ao finalizar serviço');
    }
  }

  async function deleteService(id: string) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja apagar este serviço?',
    );
    if (!confirmDelete) return;

    await api.deleteService(id);
    setServices((prev) => prev.filter((s) => s.id !== Number(id)));
  }

  return (
    <ServicesContext.Provider
      value={{
        services,
        addService,
        updateServiceProgress,
        finalizeService,
        deleteService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context)
    throw new Error('useServices must be used within ServicesProvider');
  return context;
}
