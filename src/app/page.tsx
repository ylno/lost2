"use client";
import { useState } from "react";
import { frontendService } from "@/lib/FrontendService";
import { router } from "next/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");

  async function sendCode() {
    const cacheSession = await frontendService.startCacheSession(code);
    if (cacheSession) {
      router.push("/chat");
    }
  }

  return (
    <div>
      Enter start code or your already started session code
      <div>
        <input onChange={(e) => setCode(e.target.value)} />
        <button onClick={sendCode}>send</button>
      </div>
    </div>
  );
}
