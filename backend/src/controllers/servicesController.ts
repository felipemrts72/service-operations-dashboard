import { Request, Response } from 'express';
import { Service } from '../models/Service';

// ===============================
// Listar todos
// ===============================
export async function getServices(req: Request, res: Response) {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
}

// ===============================
// Adicionar
// ===============================
export async function addService(req: Request, res: Response) {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.json(newService);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar serviço', error });
  }
}

// ===============================
// Atualizar (usa _id do Mongo)
// ===============================
export async function updateService(req: Request, res: Response) {
  try {
    const { progresso, ...rest } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    if (progresso !== undefined) {
      service.progresso = progresso;
    }

    Object.assign(service, rest);

    await service.save();

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar serviço', error });
  }
}

// ===============================
// Finalizar serviço (usa _id)
// ===============================
export async function finalizeService(req: Request, res: Response) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Finalizado',
        finishedAt: new Date(),
        progresso: 100,
      },
      { new: true },
    );

    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao finalizar serviço', error });
  }
}

// ===============================
// Deletar (soft delete - usa _id)
// ===============================
export async function deleteService(req: Request, res: Response) {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Excluido',
        deletedAt: new Date(),
      },
      { new: true },
    );

    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir serviço', error });
  }
}
