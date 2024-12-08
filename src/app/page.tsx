"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { frontendService } from "@/lib/frontend/FrontendService";
import "./page.scss";
import { FaRegPaperPlane } from "react-icons/fa6";
import { Spinner } from "@/components/spinner";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function checkSession() {
    const sessionId = localStorage.getItem("cacheSession");
    console.log("sessionid from localstorage", sessionId);
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
    setError("");

    checkSession()
      .then(() => {
        router.push("/chat");
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setError("");
  }, [code]);

  async function sendCode() {
    if (!code) {
      setError("Please Enter a code");
      return;
    }
    try {
      setError("");
      setSubmitting(true);
      const cacheSession = await frontendService.startCacheSession(code);
      console.log("cachesession", cacheSession);
      if (cacheSession) {
        router.push("/chat");
      }
    } catch (e) {
      console.log("error", e);
      setError("No session found with this code");
    } finally {
      setSubmitting(false);
    }
  }

  async function submitForm(e: FormEvent) {
    console.log("formevent", e);
    e.preventDefault();
    await sendCode();
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
        <form className="card-element form" onSubmit={submitForm}>
          <input
            className="msg-input"
            onChange={(e) => setCode(e.target.value)}
            disabled={submitting}
            placeholder="Enter code here..."
          />
          <button className={"form-item send"} disabled={submitting}>
            {!submitting ? <FaRegPaperPlane /> : <Spinner />}
          </button>
        </form>
        <ErrorMessage className="card-element">{error}</ErrorMessage>
      </div>
    </div>
  );
}

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  min-height: 20px;
`;
