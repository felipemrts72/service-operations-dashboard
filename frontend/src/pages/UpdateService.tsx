import { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import { useServices } from '../context/ServicesContext';
import type { Service } from '../types/Service';

export default function UpdateService() {
  const { services, finalizeService, deleteService } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Filtra serviços ativos (status diferente de "Excluido")
  const activeServices = services
    .filter((s) => s.status !== 'Excluido')
    .sort((a, b) => {
      const aFinalizado = a.status === 'Finalizado';
      const bFinalizado = b.status === 'Finalizado';
      if (aFinalizado && !bFinalizado) return 1;
      if (!aFinalizado && bFinalizado) return -1;
      return a.id - b.id;
    });

  // Filtra serviços excluídos (apenas status === "Excluido")
  const deletedServices = services
    .filter((s) => s.status === 'Excluido')
    .sort((a, b) => a.id - b.id);

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

      <main
        style={{
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Serviços ativos */}
        <section>
          <h2>Serviços Ativos</h2>
          {activeServices.length === 0 && (
            <p style={{ color: '#6b7280' }}>Nenhum serviço ativo</p>
          )}
          {activeServices.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              style={{
                padding: 12,
                marginBottom: 8,
                borderRadius: 8,
                cursor: 'pointer',
                background:
                  selectedService?.id === service.id
                    ? '#2563eb'
                    : service.status === 'Finalizado'
                      ? '#4eba609d'
                      : '#ffffff',
                color:
                  selectedService?.id === service.id ? '#ffffff' : '#1f2933',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}
            >
              <strong>#{service.id}</strong> — {service.cliente}
              <div>Responsável: {service.responsavel}</div>
              <div>Progresso: {service.progresso}%</div>
              <div>Status: {service.status}</div>
            </div>
          ))}
        </section>

        {/* Serviços excluídos */}
        <section>
          <h2>Serviços Excluídos (Auditoria)</h2>
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
        </section>
      </main>

      {/* Modal de edição */}
      {selectedService && selectedService.status !== 'Excluido' && (
        <div
          onClick={() => setSelectedService(null)} // fechar modal clicando no fundo
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar no modal
            style={{
              background: '#ffffff',
              padding: 24,
              borderRadius: 12,
              width: '400px',
              maxWidth: '90%',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
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
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button
                  onClick={handleFinalize}
                  style={{
                    flex: 1,
                    background: '#e74c3c',
                    color: '#ffffff',
                    padding: '10px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                  }}
                >
                  Finalizar serviço
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    flex: 1,
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
