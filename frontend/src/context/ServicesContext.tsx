import { createContext, useContext, useState, useEffect } from 'react';
import type { Service, CreateServiceDTO } from '../types/Service';
import * as api from '../api';

interface ServicesContextType {
  services: Service[];
  reloadServices: () => Promise<void>;
  addService: (service: CreateServiceDTO) => Promise<void>;
  finalizeService: (_id: string) => Promise<void>;
  deleteService: (_id: string) => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | null>(null);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  async function reloadServices() {
    const data = await api.getServices();
    setServices(data);
  }

  // Carrega inicialmente
  useEffect(() => {
    reloadServices();
  }, []);

  async function addService(service: CreateServiceDTO) {
    const newService = await api.addService(service);
    setServices((prev) => [...prev, newService]);
  }

  async function finalizeService(_id: string) {
    const updated = await api.finalizeService(_id);

    setServices((prev) => prev.map((s) => (s._id === _id ? updated : s)));
  }

  async function deleteService(_id: string) {
    await api.deleteService(_id);

    setServices((prev) =>
      prev.map((s) =>
        s._id === _id
          ? {
              ...s,
              status: 'Excluido',
              deletedAt: Date.now().toString(),
            }
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
  if (!context) {
    throw new Error('useServices deve ser usado dentro de ServicesProvider');
  }
  return context;
}
