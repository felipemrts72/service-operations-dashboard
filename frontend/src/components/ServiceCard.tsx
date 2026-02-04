import type { Service } from '../types/Service';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const prazo = new Date(service.diasRestantes).getTime();
  const hoje = Date.now();

  const atrasado = hoje > prazo;

  const dias = Math.ceil((prazo - hoje) / (1000 * 60 * 60 * 24));

  const borderColor = atrasado ? '#ef4444' : '#22c55e';

  return (
    <div
      style={{
        background: '#ffffff',
        padding: 24,
        borderRadius: 18,
        borderLeft: `8px solid ${borderColor}`,
        boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: 800 }}>
        #{service.id} – {service.titulo}
      </h2>

      <div style={{ fontSize: 22 }}>
        <div>
          <strong>Cliente:</strong> {service.cliente}
        </div>
        <div>
          <strong>Responsável:</strong> {service.responsavel}
        </div>
      </div>

      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: atrasado ? '#ef4444' : '#16a34a',
        }}
      >
        {atrasado
          ? `ATRASADO ${Math.abs(dias)} dias`
          : `Entrega em ${dias} dias`}
      </div>
    </div>
  );
}
