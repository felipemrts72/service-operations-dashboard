import { useEffect, useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import ServiceCard from '../components/ServiceCard';
import { useServices } from '../context/ServicesContext';
import { sectors, type Sector } from '../types/Sector';
import type { Service } from '../types/Service';

type Mode = 'auto' | 'manual';

function isAfterCutTime() {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  const cutMorning = 11 * 60; // 11:00
  const cutAfternoon = 17 * 60 + 45; // 17:45

  return (
    (totalMinutes >= cutMorning && totalMinutes < 13 * 60) ||
    totalMinutes >= cutAfternoon
  );
}

function shouldShowService(service: Service, hideFinalized: boolean) {
  if (service.status === 'Excluido') return false;
  if (hideFinalized && service.status === 'Finalizado') return false;
  return true;
}

export default function TvDashboard() {
  const [mode, setMode] = useState<Mode>('auto');
  const [currentSectorIndex, setCurrentSectorIndex] = useState(0);
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const { services } = useServices();

  /* ⏰ Regra de horário */
  const hideFinalized = isAfterCutTime();

  const timeFilteredServices = services
    .filter((service) => shouldShowService(service, hideFinalized))
    .sort((a, b) => a.diasRestantes - b.diasRestantes);

  /* 🔁 Modo automático: troca de setor a cada 30s */
  useEffect(() => {
    if (mode !== 'auto') return;

    const interval = setInterval(() => {
      setCurrentSectorIndex((prev) => (prev + 1) % sectors.length);
    }, 30000);

    return () => clearInterval(interval);
  }, [mode]);

  /* 🔄 Atualiza lista de serviços a cada 10s */
  useEffect(() => {
    const interval = setInterval(() => {
      // Força atualização do componente
      setCurrentSectorIndex((prev) => prev); // dispara re-render
    }, 10000); // 10 segundos

    return () => clearInterval(interval);
  }, []);

  const sectorToShow = mode === 'auto' ? sectors[currentSectorIndex] : null;

  const filteredServices =
    mode === 'auto'
      ? timeFilteredServices.filter(
          (service) => service.sector === sectorToShow,
        )
      : timeFilteredServices.filter((service) =>
          selectedSectors.includes(service.sector),
        );

  function toggleSector(sector: Sector) {
    setMode('manual');

    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector],
    );
  }

  function backToAutoMode() {
    setMode('auto');
    setSelectedSectors([]);
    setCurrentSectorIndex(0);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8' }}>
      <HeaderBar title="Calendário de Serviços" />

      {/* Painel de controle */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          background: '#e5e7eb',
          flexWrap: 'wrap',
        }}
      >
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => toggleSector(sector)}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              background: selectedSectors.includes(sector)
                ? '#2563eb'
                : '#ffffff',
              color: selectedSectors.includes(sector) ? '#ffffff' : '#1f2933',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            }}
          >
            {sector}
          </button>
        ))}

        {mode === 'manual' && (
          <button
            onClick={backToAutoMode}
            style={{
              marginLeft: 16,
              padding: '8px 16px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              background: '#16a34a',
              color: '#ffffff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            ▶️ Voltar ao modo automático
          </button>
        )}
      </div>

      {mode === 'auto' && sectorToShow && (
        <h1
          style={{
            textAlign: 'center',
            margin: '16px 0',
            fontSize: 32,
            fontWeight: 700,
            color: '#1f2933',
          }}
        >
          SETOR: {sectorToShow.toUpperCase()}
        </h1>
      )}

      <main
        style={{
          padding: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
          gap: 16,
        }}
      >
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </main>
    </div>
  );
}
