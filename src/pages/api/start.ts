import type { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "@/services/api/ApiService";

const START_CODE = "start";

type StartData = {
  code: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { code } = req.body as StartData;

  console.log("server function, submitted code:", code);

  if (code === START_CODE) {
    const cacheSession = await apiService.startSession();
    console.log("cacheSession", cacheSession);
    return res.status(200).json(cacheSession);
  } else {
    //todo get a new session here
    console.log("not implemented yet");
  }

  res.status(404).json({});
}
