import './CreateService.css';
import { useState } from 'react';
import HeaderBar from '../../components/HeaderBar';
import { sectors, type Sector } from '../../types/Sector';
import type { CreateServiceDTO } from '../../types/Service';
import { useServices } from '../../context/ServicesContext';

export default function CreateService() {
  const [form, setForm] = useState({
    id: '',
    titulo: '',
    cliente: '',
    responsavel: '',
    sector: sectors[0] as Sector,
    diasRestantes: '',
  });
  const { addService } = useServices();

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('antes de mandar: ', form.diasRestantes);
    console.log('Form Completo: ', form);

    const newService: CreateServiceDTO = {
      id: Number(form.id),
      titulo: form.titulo,
      cliente: form.cliente,
      responsavel: form.responsavel,
      sector: form.sector,
      diasRestantes: form.diasRestantes,
      progresso: 0,
      status: 'Iniciado',
      finishedAt: Date.now().toString(),
      deletedAt: Date.now().toString(),
    };

    try {
      await addService(newService); // Aguarda backend
      alert('Serviço lançado com sucesso!');
      console.log('Na função assincrona: ', newService.diasRestantes);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar serviço.');
    }
  }

  return (
    <div className="create-service">
      <HeaderBar title="Lançar Serviço" />

      <main className="create-service__main">
        <form onSubmit={handleSubmit} className="create-service__form">
          <input
            className="create-service__input"
            name="id"
            placeholder="Número do serviço"
            value={form.id}
            onChange={handleChange}
            required
          />

          <input
            className="create-service__input"
            name="titulo"
            placeholder="Item/serviço à fazer"
            value={form.titulo}
            onChange={handleChange}
            required
          />

          <input
            className="create-service__input"
            name="cliente"
            placeholder="Cliente"
            value={form.cliente}
            onChange={handleChange}
            required
          />

          <input
            className="create-service__input"
            name="responsavel"
            placeholder="Responsável"
            value={form.responsavel}
            onChange={handleChange}
            required
          />

          <select
            name="sector"
            value={form.sector}
            onChange={handleChange}
            className="create-service__select"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="diasRestantes"
            placeholder="Prazo (dias)"
            value={form.diasRestantes}
            onChange={handleChange}
            className="create-service__input"
          />

          <button type="submit" className="create-service__button">
            Lançar serviço
          </button>
        </form>
      </main>
    </div>
  );
}
