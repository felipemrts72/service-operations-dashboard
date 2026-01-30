import { Request, Response } from "express";
import { Service } from "../models/Service";

// Listar todos
export async function getServices(req: Request, res: Response) {
  const services = await Service.find();
  res.json(services);
}

// Adicionar
export async function addService(req: Request, res: Response) {
console.log("req.body: ", req.body)

  const newService = new Service(req.body);
  await newService.save();
  res.json(newService);
}

// Atualizar progresso/dias
export async function updateService(req: Request, res: Response) {
  const serviceId = Number(req.params.id)

  if (Number.isNaN(serviceId )) {
    return res.status(400).json({message:"ID Invalido"})
  }

  const { progresso, ...rest } = req.body;

  const service = await Service.findOne({ id: serviceId });
  
  if (!service) return res.status(404).json({ message: "Serviço não encontrado" });

  if (progresso !== undefined) {
    service.progresso = progresso;

    // Atualiza o status automaticamente
    if (progresso >= 100) {
      service.status = "Finalizado";
    } else if (progresso > 0) {
      service.status = "Em andamento"; // padronizar com frontend
    }
  }

  Object.assign(service, rest);

  await service.save();
  res.json(service); // sempre retorna o serviço atualizado
}

// Finalizar serviço
export async function finalizeService(req: Request, res: Response) {

  const service = await Service.findOneAndUpdate(
    { id: req.params.id },
    { progresso: 100, status: "Finalizado" },
    { new: true } // <--- importante: retorna o serviço atualizado
  );

  if (!service) return res.status(404).json({ message: "Serviço não encontrado" });
  res.json(service);
}
// Deletar
export async function deleteService(req: Request, res: Response) {
  await Service.findOneAndDelete({ id: req.params.id });
  res.json({ message: "Serviço deletado" });
}


