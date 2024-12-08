import type { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "@/services/api/ApiService";

const START_CODE = process.env.START_CODE;

type StartData = {
  code: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code } = req.body as StartData;

  console.log("server function, submitted code:", code);

  if (START_CODE && code.toLowerCase() === START_CODE) {
    const cacheSession = await apiService.startSession();
    console.log("cacheSession created", cacheSession);
    return res.status(200).json(cacheSession);
  } else {
    const cacheSession = await apiService.getSession(code);
    console.log("cacheSession loaded", cacheSession);
    if (cacheSession) {
      return res.status(200).json(cacheSession);
    } else {
      return res.status(404).send("no such session");
    }
  }

  res.status(404).json({});
}
