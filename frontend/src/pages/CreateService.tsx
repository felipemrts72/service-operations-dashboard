import { useState } from "react";
import HeaderBar from "../components/HeaderBar";
import { sectors, type Sector } from "../types/Sector";
import type { Service } from "../types/Service";
import { useServices } from "../context/ServicesContext";
import { useNavigate } from "react-router-dom";


export default function CreateService() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: "",
    titulo:"",
    cliente: "",
    responsavel: "",
    sector: sectors[0] as Sector,
    diasRestantes: ""
  });
  const { addService } = useServices();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  console.log(form.titulo)

  const newService: Service = {
    id: Number(form.id),
    titulo: form.titulo,
    cliente: form.cliente,
    responsavel: form.responsavel,
    sector: form.sector,
    diasRestantes: Number(form.diasRestantes),
    progresso: 0,
    status: "Iniciado"
  };

  try {
    await addService(newService); // Aguarda backend
    alert("Serviço lançado com sucesso!");
    navigate("/tv"); // Navega só depois do sucesso
  } catch (err) {
    console.error(err);
    alert("Erro ao criar serviço.");
  }
}

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6f8" }}>
      <HeaderBar title="Lançar Serviço" />

      <main
        style={{
          padding: 24,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 700,
            background: "#ffffff",
            padding: 24,
            borderRadius: 12,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16
          }}
        >
          <input
            name="id"
            placeholder="Número do serviço"
            value={form.id}
            onChange={handleChange}
            required
          />

          <input
            name="titulo"
            placeholder="Item/serviço à fazer"
            value={form.titulo}
            onChange={handleChange}
            required
          />

          <input
            name="cliente"
            placeholder="Cliente"
            value={form.cliente}
            onChange={handleChange}
            required
          />

          <input
            name="responsavel"
            placeholder="Responsável"
            value={form.responsavel}
            onChange={handleChange}
            required
          />

          <select name="sector" value={form.sector} onChange={handleChange}>
            {sectors.map(sector => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="diasRestantes"
            placeholder="Prazo (dias)"
            value={form.diasRestantes}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={{
              gridColumn: "1 / -1",
              padding: "12px 0",
              fontSize: 16,
              fontWeight: 700,
              background: "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Lançar serviço
          </button>
        </form>
      </main>
    </div>
  );
}
