import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import servicesRouter from './routes/services';
import { setupBackup } from './utils/backup';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/services', servicesRouter);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => {
    console.log('Conectado ao MongoDB!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error('Erro ao conectar MongoDB:', err));

setupBackup();
