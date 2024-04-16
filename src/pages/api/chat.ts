"use client";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "@/services/api/ApiService";

type ChatMessage = {
  chatsession: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { chatsession, message } = req.body as ChatMessage;

  try {
    await apiService.storeChatMessage(chatsession, message);
    return res.status(200);
  } catch (e) {
    console.log("error", e);
  }
  res.status(404).json({});
}
