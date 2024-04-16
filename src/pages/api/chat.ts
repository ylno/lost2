"use client";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "@/services/api/ApiService";

type ChatMessage = {
  sessionid: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("data", req.body);
  const { sessionid, message } = req.body as ChatMessage;

  try {
    await apiService.storeChatMessage(sessionid, message);
    return res.status(200).send({});
  } catch (e) {
    console.log("error", e);
  }
  res.status(404).json({});
}
