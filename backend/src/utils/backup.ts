// ---------------------- BACKUP DIÁRIO LOCAL - MANTÉM ÚLTIMOS 7 ----------------------
import fs from 'fs';
import path from 'path';
import { Service } from '../models/Service';
import cron from 'node-cron';

export function setupBackup() {
  // Roda todo dia às 18h
  cron.schedule('0 18 * * *', async () => {
    try {
      const services = await Service.find();

      // Garante que a pasta backups exista
      const backupsDir = path.join(__dirname, '../../backups');
      fs.mkdirSync(backupsDir, { recursive: true });

      // Cria arquivo do backup
      const fileName = path.join(backupsDir, `backup_${Date.now()}.json`);
      fs.writeFileSync(fileName, JSON.stringify(services, null, 2));
      console.log('Backup local criado:', fileName);

      // --- Mantém apenas os últimos 7 arquivos ---
      const files = fs
        .readdirSync(backupsDir)
        .filter((f) => f.endsWith('.json'))
        .map((f) => ({
          name: f,
          time: fs.statSync(path.join(backupsDir, f)).mtime.getTime(),
        }))
        .sort((a, b) => b.time - a.time); // mais recente primeiro

      const filesToDelete = files.slice(7); // pega os que passam do 7º
      filesToDelete.forEach((f) => {
        fs.unlinkSync(path.join(backupsDir, f.name));
        console.log('Backup antigo removido:', f.name);
      });
      // -------------------------------------------
    } catch (err) {
      console.error('Erro ao gerar backup:', err);
    }
  });
}
// ---------------------- FIM BACKUP DIÁRIO LOCAL ----------------------
