import { CacheSession } from "@/types/types";
import axios from "axios";

class FrontendService {
  async startCacheSession(code: string) {
    console.log("Sending code", code);
    const startResponse = (
      await axios.post("api/start", {
        code: code,
      })
    ).data as CacheSession;
    localStorage.setItem("cacheSession", startResponse.id);
    console.log("response", startResponse);
    return startResponse;
  }
}

export const frontendService = new FrontendService();
