import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      min: 0,
      max: 999999,
    },
    titulo: {
      type: String,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    responsavel: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    diasRestantes: {
      type: String,
      required: true,
    },
    progresso: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        'Iniciado',
        'Em andamento',
        'Finalização',
        'Finalizado',
        'Excluido',
      ],
      default: 'Iniciado',
    },
    finishedAt: { type: String },
    deletedAt: { type: String },
  },
  { timestamps: true },
);

export const Service = mongoose.model('Service', ServiceSchema);
