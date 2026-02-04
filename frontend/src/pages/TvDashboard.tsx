import { useEffect, useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import ServiceCard from '../components/ServiceCard';
import { useServices } from '../context/ServicesContext';
import { sectors, type Sector } from '../types/Sector';
import type { Service } from '../types/Service';

type Mode = 'auto' | 'manual';

export default function TvDashboard() {
  const { services, reloadServices } = useServices();
  const [mode, setMode] = useState<Mode>('auto');
  const [currentSectorIndex, setCurrentSectorIndex] = useState(0);
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);

  /* 🔁 Modo automático: troca de setor a cada 20s */
  useEffect(() => {
    if (mode !== 'auto') return;

    const interval = setInterval(() => {
      setCurrentSectorIndex((prev) => (prev + 1) % sectors.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [mode]);

  /* 🔄 Atualiza a lista de serviços do backend a cada 10s */
  useEffect(() => {
    const interval = setInterval(() => {
      reloadServices();
    }, 10000);

    return () => clearInterval(interval);
  }, [reloadServices]);

  const sectorToShow = mode === 'auto' ? sectors[currentSectorIndex] : null;

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
  const visibleServices = services.filter(
    (s) => s.status !== 'Excluido' && s.status !== 'Finalizado',
  );

  /* Agrupa serviços por setor */
  const servicesBySector: Record<string, Service[]> = {};
  sectors.forEach((s) => (servicesBySector[s] = []));
  visibleServices.forEach((s) => {
    servicesBySector[s.sector]?.push(s);
  });

  /* Ordena por data mais próxima */
  Object.values(servicesBySector).forEach((list) =>
    list.sort(
      (a, b) =>
        new Date(a.diasRestantes).getTime() -
        new Date(b.diasRestantes).getTime(),
    ),
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f8' }}>
      <HeaderBar title="TV de Serviços" />

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

      <main style={{ padding: 32 }}>
        {(mode === 'auto' && sectorToShow
          ? [sectorToShow]
          : selectedSectors
        ).map((sector) => {
          const list = servicesBySector[sector];
          if (!list || list.length === 0) return null;

          return (
            <section key={sector} style={{ marginBottom: 48 }}>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  marginBottom: 24,
                }}
              >
                SETOR: {sector.toUpperCase()}
              </h1>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
                  gap: 20,
                }}
              >
                {list.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
