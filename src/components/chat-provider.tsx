"use client";

import {
  AutoDraft,
  BasicStorage,
  ChatMessage,
  ChatProvider,
  Conversation,
  ConversationRole,
  IStorage,
  MessageContentType,
  MessageDirection,
  MessageStatus,
  Participant,
  Presence,
  TextContent,
  TypingUsersList,
  UpdateState,
  User,
  UserStatus,
} from "@chatscope/use-chat";
import Chat from "./chat";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { ExampleChatService } from "@/services/ExampleChatService";

// Storage needs to generate id for messages and groups
const messageIdGenerator = () => nanoid();
const groupIdGenerator = () => nanoid();

// Create serviceFactory
const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
  console.log("servicefactory");
  return new ExampleChatService(storage, updateState);
};

const timUser = {
  name: "Tim",
  avatar: "/tim.svg",
};

const chatStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });

const tim = new User({
  id: timUser.name,
  presence: new Presence({ status: UserStatus.Available, description: "" }),
  firstName: "",
  lastName: "",
  username: timUser.name,
  email: "",
  avatar: timUser.avatar,
  bio: "",
});

chatStorage.addUser(
  new User({
    id: tim.username,
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    firstName: "",
    lastName: "",
    username: tim.username,
    email: "",
    avatar: tim.avatar,
    bio: "",
  }),
);

chatStorage.addUser(
  new User({
    id: "You",
    presence: new Presence({ status: UserStatus.Available, description: "" }),
    firstName: "asdas",
    lastName: "adsasd",
    username: "You",
    email: "",
    avatar: tim.avatar,
    bio: "",
  }),
);

const conversation = new Conversation({
  id: nanoid(),
  participants: [
    new Participant({
      id: "Tim",
      role: new ConversationRole([]),
    }),
    new Participant({
      id: "You",
      role: new ConversationRole([]),
    }),
  ],
  unreadCounter: 0,
  typingUsers: new TypingUsersList({ items: [] }),
  draft: "",
});
chatStorage.addConversation(conversation);
chatStorage.addMessage(
  new ChatMessage({
    id: nanoid(),
    direction: MessageDirection.Incoming,
    status: MessageStatus.Sent,
    senderId: "Tim",
    contentType: MessageContentType.TextHtml,
    content: "hallo Mate" as any,
  }),
  conversation.id,
);

chatStorage.setActiveConversation(conversation.id);

console.log("storage", chatStorage);

export default function GCChatProvider() {
  const [isWindowDefined, setIsWindowDefined] = useState(false);
  useEffect(() => {
    console.log("init", serviceFactory, window);
    setIsWindowDefined(typeof window !== "undefined");
  }, []);

  return (
    isWindowDefined && (
      <ChatProvider
        serviceFactory={serviceFactory}
        storage={chatStorage}
        config={{
          typingThrottleTime: 250,
          typingDebounceTime: 900,
          debounceTyping: true,
          autoDraft: AutoDraft.Save | AutoDraft.Restore,
        }}
      >
        <Chat></Chat>
      </ChatProvider>
    )
  );
}
