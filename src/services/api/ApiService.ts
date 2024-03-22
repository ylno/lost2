import { firestore } from "@/lib/FirebaseAdmin";

export class ApiService {
  constructor() {}
  async getText() {
    await firestore
      .collection("cache-sessions")
      .doc()
      .set({ key1: "test1", created: new Date() });

    return "text from api";
  }
}

export const apiService = new ApiService();
