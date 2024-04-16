import { firestore } from "@/lib/backend/FirebaseAdmin";
import { assign, createActor, createMachine, StateMachine } from "xstate";
import { CacheSession } from "@/types/types";

export class ApiService {
  stateMachine: any;
  constructor() {
    this.stateMachine = createMachine({
      context: {
        count: 0,
      },
      on: {
        INC: {
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
        DEC: {
          actions: assign({
            count: ({ context }) => context.count - 1,
          }),
        },
        SET: {
          actions: assign({
            count: ({ event }) => event.value,
          }),
        },
      },
    });
  }

  async getSession(id: string) {
    if (!id) {
      console.error("empty id", id);
      throw new Error("empty id");
    }
    const documentReference = firestore.collection("cache-sessions").doc(id);
    return (await documentReference.get()).data() as CacheSession;
  }

  async startSession() {
    const countActor = createActor(this.stateMachine).start();

    countActor.subscribe((state) => {
      console.log(state.context.count);
    });

    // countActor.send({ type: "INC" });
    // // logs 1
    // countActor.send({ type: "DEC" });
    // // logs 0
    // countActor.send({ type: "SET", value: 10 });
    // // logs 10

    try {
      const sessionCollectionReference = firestore.collection("cache-sessions");
      const documentReference = sessionCollectionReference.doc();
      await documentReference.set({
        created: new Date(),
        state: JSON.stringify(countActor.getPersistedSnapshot()),
        chatConversation: [],
      });
      const chatDocument = documentReference.collection("chat").doc();
      await chatDocument.set({
        sender: "Tim",
        message: "Hallo Freund",
        created: new Date(),
      });

      console.log(JSON.stringify(countActor.getPersistedSnapshot()));
      return {
        ...(await documentReference.get()).data(),
        id: documentReference.id,
      } as CacheSession;
    } catch (e) {
      console.log("git an error", e);
    }
  }

  async storeChatMessage(sessionid: string, message: string) {
    try {
      console.log("storeChatMessage", sessionid, message);
      const sessionCollectionReference = firestore.collection("cache-sessions");
      //check if exists
      const sessionDocumentReference =
        sessionCollectionReference.doc(sessionid);
      const documentSnapshot = await sessionDocumentReference.get();
      if (!documentSnapshot.exists) {
        throw new Error("chat does not exist");
      }
      await sessionDocumentReference.collection("chat").doc().set({
        sender: "You",
        message: message,
        created: new Date(),
      });
    } catch (e) {
      console.log("error", e);
    }
  }
}

export const apiService = new ApiService();
