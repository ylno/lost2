"use client";
import { useEffect, useState } from "react";
import { frontendService } from "@/lib/FrontendService";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem("cacheSession");
    console.log("sessionid from loacalstorage", {
      sessionId: sessionId,
      code: code,
    });

    Promise.all([
      Promise.resolve(code != ""),
      Promise.resolve(sessionId),
      frontendService.startCacheSession(code),
    ])
      .then(() => {
        router.push("/chat");
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  async function sendCode() {
    const cacheSession = await frontendService.startCacheSession(code);
    if (cacheSession) {
      router.push("/chat");
    }
  }

  if (loading) {
    return <div>loading...</div>;
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
