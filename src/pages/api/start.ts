import type { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "@/services/api/ApiService";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("server function");
  res.status(200).json({ text: apiService.getText() });
}
