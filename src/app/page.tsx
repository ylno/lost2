"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [code, setCode] = useState("");

  async function sendCode() {
    console.log("Sending code", code);
    await axios.post("api/start", { code: code });
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
