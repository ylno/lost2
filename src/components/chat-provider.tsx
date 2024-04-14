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
import { GeocachingChatService } from "@/services/GeocachingChatService";
import { frontendService } from "@/lib/frontend/FrontendService";
import { collection, getDocs } from "firebase/firestore/lite";
import { firestoreDb } from "@/lib/frontend/Firebase";
import { StoredChatMessage } from "@/types/types";
import { sendMessage } from "next/dist/client/dev/error-overlay/websocket";

// Storage needs to generate id for messages and groups
const messageIdGenerator = () => nanoid();
const groupIdGenerator = () => nanoid();
const cachesession = frontendService.getCachesession();
if (!cachesession) {
  throw new Error("no_cache_session");
}

// Create serviceFactory
const serviceFactory = (storage: IStorage, updateState: UpdateState) => {
  console.log("servicefactory");
  return new GeocachingChatService(storage, updateState);
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
    firstName: "Geo",
    lastName: "Cacher",
    username: "You",
    email: "",
    avatar: tim.avatar,
    bio: "",
  }),
);

const conversation = new Conversation({
  id: cachesession,
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
