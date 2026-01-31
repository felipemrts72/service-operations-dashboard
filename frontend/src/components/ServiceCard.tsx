import ProgressBar from './ProgressBar';
import type { Service } from '../types/Service';

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  // Datas em timestamp
  const prazo = new Date(service.diasRestantes).getTime();
  const hoje = Date.now();

  // Atraso real
  const atrasado = hoje > prazo;

  // Diferença em dias
  const diffMs = prazo - hoje;
  const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Cor da barra
  let color = '#2ecc71'; // verde

  if (atrasado) {
    color = '#e74c3c'; // vermelho
  } else if (service.progresso >= 50) {
    color = '#f59e0b'; // laranja
  }

  return (
    <div
      style={{
        background: '#ffffff',
        padding: 16,
        borderRadius: 16,
        borderLeft: `6px solid ${atrasado ? '#e74c3c' : '#2ecc71'}`,
        boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#111827',
            marginBottom: 4,
          }}
        >
          #{service.id} - {service.titulo}
        </h2>

        <p style={{ fontSize: 14, color: '#374151' }}>
          <strong>Cliente:</strong> {service.cliente}
        </p>

        <p style={{ fontSize: 14, color: '#374151' }}>
          <strong>Responsável:</strong> {service.responsavel}
        </p>

        <p style={{ fontSize: 14, color: '#374151' }}>
          <strong>Status:</strong> {service.status}
        </p>
      </div>

      <ProgressBar value={service.progresso} color={color} />

      <p
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: 500,
          color: atrasado ? '#e74c3c' : '#111827',
        }}
      >
        {atrasado
          ? `Atrasado ${Math.abs(diasRestantes)} dias`
          : `Entrega em ${diasRestantes} dias`}
      </p>
    </div>
  );
}
