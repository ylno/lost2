import { Timestamp } from "@google-cloud/firestore";

export type CacheSession = {
  id: string;
  chatCoonversation: any[];
  state: any;
  created: Timestamp;
};

export type StoredChatMessage = {
  id: string;
  sender: string;
  created: Timestamp;
  message: string;
};

export type Conversation = {
  messages: StoredChatMessage[];
  chatOwner: Person;
  chatPartner: Person;
};

export type Person = {
  id: string;
  name: string;
  avatar: string;
};
