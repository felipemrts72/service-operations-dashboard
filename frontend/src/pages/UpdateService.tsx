import { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import { useServices } from '../context/ServicesContext';
import type { Service } from '../types/Service';

export default function UpdateService() {
  const { services, updateServiceProgress, finalizeService, deleteService } =
    useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newProgress, setNewProgress] = useState('');

  async function handleUpdate() {
    if (!selectedService) return;

    const progress = Number(newProgress);
    if (progress <= selectedService.progresso) {
      alert('O progresso deve ser maior que o atual');
      return;
    }

    try {
      await updateServiceProgress(selectedService.id, progress);
      alert('Progresso atualizado');
      setNewProgress('');
    } catch (err) {
      console.error(err);
      alert('Erro ao atualizar progresso.');
    }
  }

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
          {services
            .filter((service): service is Service => !!service) // remove null/undefined
            .map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  console.log(service);
                }}
                style={{
                  padding: 12,
                  marginBottom: 8,
                  borderRadius: 8,
                  cursor: 'pointer',
                  background:
                    selectedService?.id === service.id ? '#2563eb' : '#ffffff',
                  color:
                    selectedService?.id === service.id ? '#ffffff' : '#1f2933',
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
        {selectedService && (
          <div
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
                <input
                  type="number"
                  placeholder="Novo progresso (%)"
                  value={newProgress}
                  onChange={(e) => setNewProgress(e.target.value)}
                  style={{
                    marginTop: 12,
                    color: 'black',
                    padding: '8px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                    marginRight: 5,
                  }}
                />
                <button
                  onClick={handleUpdate}
                  style={{
                    marginTop: 12,
                    background: '#251d7fff',
                    color: '#ffffff',
                    padding: '10px',
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    marginRight: 5,
                  }}
                >
                  Atualizar progresso
                </button>
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
