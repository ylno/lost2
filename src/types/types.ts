import { Timestamp } from "@google-cloud/firestore";

export type CacheSession = {
  id: string;
  chatCoonversation: any[];
  state: any;
  created: Timestamp;
};
