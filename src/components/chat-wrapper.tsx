import { Chat } from "@/components/chat";
import { useEffect, useState } from "react";
import { Conversation } from "@/types/types";
import { Timestamp } from "@google-cloud/firestore";

export function ChatWrapper() {
  const [conversation, setConversation] = useState<Conversation | null>();

  useEffect(() => {
    setConversation({
      chatOwner: {
        name: "Michael",
        id: "You",
        avatar: "",
      },
      chatPartner: {
        name: "Tim",
        id: "Tim",
        avatar: "/tim.svg",
      },
      messages: [
        {
          id: "1",
          message: "Hallo, ich bin Tim",
          sender: "Tim",
          created: {
            seconds: 11111111,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
        {
          id: "2",
          message: "Hallo Tim, schön das wir zusammen kommen.",
          sender: "You",
          created: {
            seconds: 11111111,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
        {
          id: "3",
          message: "Das finde ich auch! Mal ein bisschen längerer Text",
          sender: "Tim",
          created: {
            seconds: 11111111,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
        {
          id: "4",
          message: "Was hast du für Pläne für das kommende Wochenende?",
          sender: "You",
          created: {
            seconds: 11111112,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
        {
          id: "5",
          message:
            "Ich dachte daran, in die Berge zu fahren und zu wandern. Hast du Lust, mitzukommen?",
          sender: "Tim",
          created: {
            seconds: 11111112,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
        {
          id: "6",
          message:
            "Das klingt großartig! Ich liebe Wandern, und das Wetter soll auch gut werden. Sollen wir Details morgen besprechen?",
          sender: "You",
          created: {
            seconds: 11111113,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
        {
          id: "7",
          message:
            "Perfekt, lass uns morgen nochmal darüber sprechen. Ich freue mich schon!",
          sender: "Tim",
          created: {
            seconds: 11111113,
            nanoseconds: 1111111111,
          } as Timestamp,
        },
      ],
    });
  }, []);

  if (!conversation) {
    return <></>;
  }

  return (
    <Chat
      conversation={conversation}
      sendChatMessage={async (message) => {
        console.log("send", message);
        return;
      }}
    ></Chat>
  );
}
