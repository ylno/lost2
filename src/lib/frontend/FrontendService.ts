"use client";
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

  getCachesession() {
    return localStorage?.getItem("cacheSession");
  }

  async sendChatMessage(message: string) {
    console.log("send chat message");
    const axiosResponse = await axios.post("api/chat", {
      sessionid: this.getCachesession(),
      message: message,
    });
  }
}

export const frontendService = new FrontendService();
