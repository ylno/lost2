import "./new-chat.scss";
import { FormEvent, useEffect, useState } from "react";
import { Conversation } from "@/types/types";

type ChatParameter = {
  sendChatMessage: (message: string) => Promise<void>;
  conversation: Conversation;
};

export function NewChat({ sendChatMessage, conversation }: ChatParameter) {
  const [message, setMessage] = useState("");
  const [firstDate, setFirstDate] = useState<Date | null>();

  async function submitForm(e: FormEvent) {
    console.log("formevent", e);
    e.preventDefault();
    await sendChatMessage(message);
    setMessage("");
  }

  useEffect(() => {
    if (conversation.messages.length > 0) {
      setFirstDate(new Date(conversation.messages[0].created.toDate()));
    }
  }, [conversation]);

  return (
    <div className="center">
      <div className="chat">
        <div className="contact bar">
          <div
            className="pic"
            style={{
              backgroundImage: `url("${conversation.chatPartner.avatar}")`,
            }}
          ></div>
          <div className="name">{conversation.chatPartner.name}</div>
        </div>
        <div className="messages" id="chat">
          {firstDate && (
            <div className="time">{firstDate.toLocaleString()}</div>
          )}
          {conversation.messages.map((message) => (
            <div
              className={`message ${message.sender === conversation.chatOwner.id ? "outgoing" : "incoming"}`}
              key={message.id}
            >
              {message.message}
            </div>
          ))}

          {/*<div className="message stark">*/}
          {/*  <div className="typing typing-1"></div>*/}
          {/*  <div className="typing typing-2"></div>*/}
          {/*  <div className="typing typing-3"></div>*/}
          {/*</div>*/}
        </div>
        <div className="input">
          <i className="fas fa-camera"></i>
          <i className="far fa-laugh-beam"></i>
          <form onSubmit={submitForm}>
            <input
              value={message}
              placeholder="Type your message here!"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
          <i className="fas fa-microphone"></i>
        </div>
      </div>
    </div>
  );
}
