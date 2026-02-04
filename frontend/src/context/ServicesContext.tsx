import { createContext, useContext, useState, useEffect } from 'react';
import type { Service } from '../types/Service';
import * as api from '../api';

interface ServicesContextType {
  services: Service[];
  reloadServices: () => Promise<void>;
  addService: (service: Service) => Promise<void>;
  finalizeService: (id: number) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | null>(null);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  async function reloadServices() {
    const data = await api.getServices();
    setServices(data);
  }

  // inicial
  useEffect(() => {
    reloadServices();
  }, []);

  async function addService(service: Service) {
    const newService = await api.addService(service);
    setServices((prev) => [...prev, newService]);
  }

  async function finalizeService(id: number) {
    const updated = await api.finalizeService(id);
    setServices((prev) => prev.map((s) => (s.id === Number(id) ? updated : s)));
  }

  async function deleteService(id: number) {
    // Chama backend
    await api.deleteService(id);

    // Atualiza localmente para status 'Excluido' e deletedAt
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: 'Excluido', deletedAt: Date.now().toString() }
          : s,
      ),
    );
  }

  return (
    <ServicesContext.Provider
      value={{
        services,
        reloadServices,
        addService,
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
    throw new Error('useServices tem de ser usado com ServicesProvider');
  return context;
}
