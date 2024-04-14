import { Timestamp } from "@google-cloud/firestore";

export type CacheSession = {
  id: string;
  chatCoonversation: any[];
  state: any;
  created: Timestamp;
};

export type StoredChatMessage = {
  sender: string;
  created: Timestamp;
  message: string;
};
