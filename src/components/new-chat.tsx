import "./new-chat.scss";
import { FormEvent, useState } from "react";
import { Conversation } from "@/types/types";

type ChatParameter = {
  sendChatMessage: (message: string) => Promise<void>;
  conversation: Conversation;
};

export function NewChat({ sendChatMessage, conversation }: ChatParameter) {
  const [message, setMessage] = useState("");

  async function submitForm(e: FormEvent) {
    console.log("formevent", e);
    e.preventDefault();
    await sendChatMessage(message);
    setMessage("");
  }

  return (
    <div className="center">
      {/*<div className="contacts">*/}
      {/*  <i className="fas fa-bars fa-2x"></i>*/}
      {/*  <h2>Contacts</h2>*/}
      {/*  <div className="contact">*/}
      {/*    <div className="pic rogers"></div>*/}
      {/*    <div className="badge">14</div>*/}
      {/*    <div className="name">Steve Rogers</div>*/}
      {/*    <div className="message">That is America's ass 🇺🇸🍑</div>*/}
      {/*  </div>*/}
      {/*  <div className="contact">*/}
      {/*    <div className="pic stark"></div>*/}
      {/*    <div className="name">Tony Stark</div>*/}
      {/*    <div className="message">*/}
      {/*      Uh, he's from space, he came here to steal a necklace from a wizard.*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="contact">*/}
      {/*    <div className="pic banner"></div>*/}
      {/*    <div className="badge">1</div>*/}
      {/*    <div className="name">Bruce Banner</div>*/}
      {/*    <div className="message">There's an Ant-Man *and* a Spider-Man?</div>*/}
      {/*  </div>*/}
      {/*  <div className="contact">*/}
      {/*    <div className="pic thor"></div>*/}
      {/*    <div className="name">Thor Odinson</div>*/}
      {/*    <div className="badge">3</div>*/}
      {/*    <div className="message">I like this one</div>*/}
      {/*  </div>*/}
      {/*  <div className="contact">*/}
      {/*    <div className="pic danvers"></div>*/}
      {/*    <div className="badge">2</div>*/}
      {/*    <div className="name">Carol Danvers</div>*/}
      {/*    <div className="message">*/}
      {/*      Hey Peter Parker, you got something for me?*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="chat">
        <div className="contact bar">
          <div
            className="pic"
            style={{
              backgroundImage: 'url("/tim.svg")',
            }}
          ></div>
          <div className="name">{conversation.chatPartner.name}</div>
        </div>
        <div className="messages" id="chat">
          <div className="time">Today at 11:41</div>
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
