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
        background: 'linear-gradient(180deg, #ffffff, #f9fafb)',
        padding: 18,
        borderRadius: 18,
        borderLeft: `6px solid ${color}`,
        boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'transform .2s ease, box-shadow .2s ease',
      }}
    >
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: '#111827',
        }}
      >
        #{service.id} - {service.titulo}
      </h2>

      <div style={{ fontSize: 22, color: 'black' }}>
        <div>
          <strong>Cliente:</strong> {service.cliente}
        </div>
        <div>
          <strong>Responsável:</strong> {service.responsavel}
        </div>
        <div>
          <strong>Status:</strong> {service.status}
        </div>
      </div>

      <ProgressBar value={service.progresso} color={color} />

      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: atrasado ? '#ef4444' : '#111827',
        }}
      >
        {atrasado
          ? `Atrasado ${Math.abs(diasRestantes)} dias`
          : `Entrega em ${diasRestantes} dias`}
      </div>
    </div>
  );
}
