import { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import { useServices } from '../context/ServicesContext';
import type { Service } from '../types/Service';

function getActiveServices(services: Service[]): Service[] {
  return services.filter(
    (service): service is Service => !!service && service.status !== 'Excluido',
  );
}

function getDeletedServices(services: Service[]): Service[] {
  return services.filter(
    (service): service is Service => !!service && service.status === 'Excluido',
  );
}

function sortServicesByStatusAndId(services: Service[]): Service[] {
  return [...services].sort((a, b) => {
    const aFinalizado = a.status === 'Finalizado';
    const bFinalizado = b.status === 'Finalizado';

    // Finalizados sempre por último
    if (aFinalizado && !bFinalizado) return 1;
    if (!aFinalizado && bFinalizado) return -1;

    // Mesmo grupo → ordenar por id
    return a.id - b.id;
  });
}

export default function UpdateService() {
  const { services, finalizeService, deleteService } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const activeServices = sortServicesByStatusAndId(getActiveServices(services));
  const deletedServices = getDeletedServices(services);

  async function handleFinalize() {
    if (!selectedService) return;

    try {
      await finalizeService(selectedService.id);
      alert('Serviço finalizado');
      setSelectedService(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao finalizar serviço');
    }
  }

  async function handleDelete() {
    if (!selectedService) return;

    const ok = window.confirm('Tem certeza que deseja apagar este serviço?');
    if (!ok) return;

    try {
      await deleteService(selectedService.id);
      setSelectedService(null);
    } catch (err) {
      console.error(err);
      alert('Erro ao apagar serviço.');
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8' }}>
      <HeaderBar title="Atualizar Serviços" />

      <main style={{ padding: 24, display: 'flex', gap: 24 }}>
        {/* Lista de serviços */}
        <div style={{ flex: 1 }}>
          <h2>Serviços</h2>
          {activeServices.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                setSelectedService(service);
              }}
              style={{
                padding: 12,
                marginBottom: 8,
                borderRadius: 8,
                cursor: 'pointer',
                background:
                  selectedService?.id === service.id
                    ? '#2563eb'
                    : service?.status === 'Finalizado'
                      ? '#4eba609d'
                      : '#ffffffff',
                color:
                  selectedService?.id === service.id ? '#ffffff' : '#1f2933',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <strong>#{service.id}</strong> — {service.cliente}
              <div>Responsavel: {service.responsavel}</div>
              <div>Progresso: {service.progresso}%</div>
              <div>Status: {service.status}</div>
            </div>
          ))}
        </div>

        {/* Serviços excluídos */}
        <div style={{ flex: 1 }}>
          <h2>Serviços Excluídos</h2>

          {deletedServices.length === 0 && (
            <p style={{ color: '#6b7280' }}>Nenhum serviço excluído</p>
          )}

          {deletedServices.map((service) => (
            <div
              key={service.id}
              style={{
                padding: 12,
                marginBottom: 8,
                borderRadius: 8,
                background: '#fef2f2',
                color: '#7f1d1d',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <strong>#{service.id}</strong> — {service.cliente}
              <div>Progresso: {service.progresso}%</div>
              <div>Status: {service.status}</div>
            </div>
          ))}
        </div>
        {/* Painel de edição */}
        {selectedService && selectedService.status !== 'Excluido' && (
          <div
            onClick={() => {
              setSelectedService(null);
            }}
            style={{
              flex: 1,
              background: '#ffffff',
              padding: 16,
              borderRadius: 12,
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <h3>Editar Serviço #{selectedService.id}</h3>
            <p>
              <strong>Cliente:</strong> {selectedService.cliente}
            </p>
            <p>
              <strong>Responsável:</strong> {selectedService.responsavel}
            </p>
            <p>
              <strong>Progresso atual:</strong> {selectedService.progresso}%
            </p>

            {selectedService.status !== 'Finalizado' && (
              <>
                <button
                  onClick={handleFinalize}
                  style={{
                    marginTop: 12,
                    background: '#e74c3c',
                    color: '#ffffff',
                    padding: '10px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    marginRight: 5,
                  }}
                >
                  Finalizar serviço
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    marginTop: 12,
                    background: '#7f1d1d',
                    color: '#ffffff',
                    padding: '10px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Apagar serviço
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
