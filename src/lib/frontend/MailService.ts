import { emails } from "@/lib/frontend/data";

export class MailService {
  async getMails() {
    return emails;
  }
}

export const mailService = new MailService();
