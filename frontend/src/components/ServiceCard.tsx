import ProgressBar from "./ProgressBar";
import type { Service } from "../types/Service";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const atrasado = service.diasRestantes < 0;

  // Calcula porcentagem do tempo decorrido para colorir a barra
  const tempoTotal = service.diasRestantes + (atrasado ? 0 : 0); // assume diasRestantes = dias faltando
  let color = "#2ecc71"; // verde por padrão

  if (!atrasado) {
    // Se passou mais de 50% do prazo, fica laranja
    const percDecorrido = 1 - service.diasRestantes / (service.diasRestantes + service.progresso);
    if (percDecorrido >= 0.5) color = "#f59e0b"; // laranja
  } else {
    color = "#e74c3c"; // vermelho se atrasado
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: 16,
        borderRadius: 16,
        borderLeft: `6px solid ${atrasado ? "#e74c3c" : "#2ecc71"}`,
        boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <h2
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 4
          }}
        >
          #{service.id} - {service.titulo}
        </h2>
        <p style={{ fontSize: 14, color: "#374151" }}>
          <strong>Cliente:</strong> {service.cliente}
        </p>
        <p style={{ fontSize: 14, color: "#374151" }}>
          <strong>Responsável:</strong> {service.responsavel}
        </p>
        <p style={{ fontSize: 14, color: "#374151" }}>
          <strong>Status:</strong> {service.status}
        </p>
      </div>

      <ProgressBar value={service.progresso} color={color} />

      <p
        style={{
          marginTop: 8,
          fontSize: 14,
          fontWeight: 500,
          color: atrasado ? "#e74c3c" : "#111827"
        }}
      >
        {atrasado
          ? `Atrasado ${Math.abs(service.diasRestantes)} dias`
          : `Entrega em ${service.diasRestantes} dias`}
      </p>
    </div>
  );
}