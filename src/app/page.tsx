"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { frontendService } from "@/lib/frontend/FrontendService";
import "./page.scss";
import { FaRegPaperPlane } from "react-icons/fa6";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  async function checkSession() {
    const sessionId = localStorage.getItem("cacheSession");
    console.log("sessionid from loacalstorage", sessionId);
    if (!sessionId) {
      throw new Error("no_session");
    }
    const cacheSession = await frontendService.startCacheSession(sessionId);
    if (cacheSession) {
      return cacheSession;
    } else {
      throw new Error("no_session");
    }
  }

  useEffect(() => {
    const sessionId = localStorage.getItem("cacheSession");
    console.log("sessionid from loacalstorage", {
      sessionId: sessionId,
      code: code,
    });

    checkSession()
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
    return (
      <div className="wrapper">
        <div className="card">
          <div className="card-element">loading...</div>
          <div className="card-element form"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="card">
        <div className="card-element">
          Enter start code or your already started session code
        </div>
        <div className="card-element form">
          <input
            className="msg-input"
            onChange={(e) => setCode(e.target.value)}
          />
          <button className={"form-item send"} onClick={sendCode}>
            <FaRegPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
