import { generateEMails } from "@/lib/frontend/data";
import { Email } from "@/lib/frontend/types";

export class MailService {
  storage = new Map<string, Email[]>();

  getMailsByFolder(activeFolder: string) {
    console.log("getting emails from backend", activeFolder);
    if (this.storage.has(activeFolder)) {
      console.log("cache hit");
      return this.storage.get(activeFolder);
    } else {
      console.log("cache miss");
      this.storage.set(activeFolder, generateEMails());
      return this.storage.get(activeFolder);
    }
  }
}

export const mailService = new MailService();
