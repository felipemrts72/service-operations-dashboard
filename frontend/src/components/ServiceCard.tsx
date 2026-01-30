import ProgressBar from "./ProgressBar";
import type { Service } from "../types/Service";


interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  const atrasado = service.diasRestantes < 0;
  console.log(service.titulo)
  return (
    <div
style={{
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    borderLeft: `8px solid ${atrasado ? "#e74c3c" : "#2ecc71"}`,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    height: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }}
    >
      <h2 >#{service.id} - {service.titulo}</h2>
      <p><strong>Cliente:</strong> {service.cliente}</p>
      <p><strong>Responsável:</strong> {service.responsavel}</p>
      <p><strong>Status:</strong> {service.status}</p>

      <ProgressBar value={service.progresso} />

      <p style={{ marginTop: 8 }}>
        {atrasado
          ? `Atrasado ${Math.abs(service.diasRestantes)} dias`
          : `Entrega em ${service.diasRestantes} dias`}
      </p>
    </div>
  );
}