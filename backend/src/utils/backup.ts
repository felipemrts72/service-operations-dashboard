import fs from "fs";
import path from "path";
import { Service } from "../models/Service";
import cron from "node-cron";

export function setupBackup() {
  const backupTimes = ["0 8 * * *", "0 11 * * *", "0 15 * * *", "0 18 * * *"];

backupTimes.forEach(time => {
  cron.schedule(time, async () => {
    const services = await Service.find();

    // Garante que a pasta backups exista
    const fileName = path.join(__dirname, "../../backups", `backup_${Date.now()}.json`);
    fs.mkdirSync(path.dirname(fileName), { recursive: true });

    // Salva o backup
    fs.writeFileSync(fileName, JSON.stringify(services, null, 2));
    console.log("Backup realizado:", fileName);

    // Aqui depois podemos adicionar envio para Google Drive / Atlas
  });
});

}
