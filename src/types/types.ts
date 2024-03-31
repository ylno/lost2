import { Timestamp } from "@google-cloud/firestore";

export type CacheSession = {
  chatCoonversation: any[];
  state: any;
  created: Timestamp;
};
