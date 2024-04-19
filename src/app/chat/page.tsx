"use client";
import GCChatProvider from "@/components/chat-provider";
import { NewChat } from "@/components/new-chat";
import { useEffect, useState } from "react";
import { Conversation, StoredChatMessage } from "@/types/types";
import { Timestamp } from "@google-cloud/firestore";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { frontendService } from "@/lib/frontend/FrontendService";
import { firestoreDb } from "@/lib/frontend/Firebase";
import { nanoid } from "nanoid";

const emptyConversation: Conversation = {
  chatOwner: {
    name: "Geochacher",
    id: "You",
    avatar: "",
  },
  chatPartner: {
    name: "Tim",
    id: "Tim",
    avatar: "/tim.svg",
  },
  messages: [],
};

export default function ChatPage() {
  const [conversation, setConversation] = useState<Conversation>();

  useEffect(() => {
    const conv = emptyConversation;

    const cachesession = frontendService.getCachesession();
    const conversationId = cachesession;
    if (!cachesession || !conversationId) {
      throw new Error("no cachesession");
    }
    const collectionReference = collection(
      firestoreDb,
      `/cache-sessions/${cachesession}/chat`,
    );
    const queryRef = query(collectionReference, orderBy("created"));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const newMessages = snapshot
          .docChanges()
          .filter((change) => change.type === "added")
          .map((change) => change.doc.data() as StoredChatMessage);

        if (newMessages.length > 0) {
          setConversation((prevConversation) => ({
            ...(prevConversation || emptyConversation),
            messages: [...(prevConversation?.messages || []), ...newMessages],
          }));
        }
      });
    });
    setConversation(conv);

    return () => unsubscribe();
  }, []);

  async function sendChatMessage(message: string) {
    return frontendService.sendChatMessage(message, nanoid());
  }

  return (
    <div
      style={{
        display: "block",
        position: "relative",
        height: "100dvh",
        width: "100%",
      }}
    >
      {conversation && (
        <NewChat
          sendChatMessage={sendChatMessage}
          conversation={conversation}
        ></NewChat>
      )}
      {/*<GCChatProvider></GCChatProvider>*/}
    </div>
  );
}
