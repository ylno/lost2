import { firestore } from "@/lib/backend/FirebaseAdmin";
import { createActor, createMachine } from "xstate";
import { CacheSession } from "@/types/types";

export class ApiService {
  stateMachine: any;
  constructor() {
    this.stateMachine = createMachine({
      id: "chat",
      initial: "stage1",
      context: {
        answer: "",
      },
      states: {
        stage1: {
          on: {
            CORRECT_ANSWER: "stage2",
          },
          meta: {
            message: "Willkommen im Chat! (Stage 1) Was ist 2+2?",
          },
        },
        stage2: {
          on: {
            CORRECT_ANSWER: "stage3",
          },
          meta: {
            message:
              "Richtig! Nächste Frage: (Stage 2) Nenne die Hauptstadt von Deutschland.",
          },
        },
        stage3: {
          on: {
            CORRECT_ANSWER: "success",
            WRONG_ANSWER: "failure",
          },
          meta: {
            message:
              "Fast da! Letzte Frage: (Stage 3) Wie viele Kontinente gibt es?",
          },
        },
        success: {
          type: "final",
          meta: {
            message: "Glückwunsch! Alle Antworten waren richtig.",
          },
        },
        failure: {
          type: "final",
          meta: {
            message:
              "Leider war die letzte Antwort falsch. Versuche es nochmal!",
          },
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
    const documentSnapshot = await documentReference.get();
    if (!documentSnapshot.exists) {
      console.log("now such document");
      return null;
    }
    const data = {
      id: documentReference.id,
      ...documentSnapshot.data(),
    } as CacheSession;
    return data;
  }

  async startSession() {
    const countActor = createActor(this.stateMachine).start();

    countActor.subscribe((state) => {
      console.log(state);
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
        id: chatDocument.id,
        sender: "Tim",
        message: `Hallo, mein Name ist Tim. Meine Schwester ist entführt worden. Kannst du mir helfen sie zu finden? Hast du noch Freunde, die uns bei der Suche helfen können? Gib ihnen den Einstiegscode "${documentReference.id}" weiter, damit Sie hier untertützen können.`,
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

  async processChatMessage(sessionid: string, message: string, id: string) {
    try {
      console.log("storeChatMessage", sessionid, message);
      const sessionCollectionReference = firestore.collection("cache-sessions");
      //check if exists
      const sessionDocumentReference =
        sessionCollectionReference.doc(sessionid);
      const cacheSessionReference = await sessionDocumentReference.get();
      if (!cacheSessionReference.exists) {
        throw new Error("chat does not exist");
      }

      const cacheSession = cacheSessionReference.data() as CacheSession;
      console.log("cacheSession", JSON.parse(cacheSession.state));

      const actor = createActor(this.stateMachine, {
        snapshot: JSON.parse(cacheSession.state),
      }).start();
      console.log("actor restored");

      actor.subscribe((state) => {
        console.log("new state", state);
      });

      const userDocumentReference = sessionDocumentReference
        .collection("chat")
        .doc(id);
      await userDocumentReference.set({
        id: id,
        sender: "You",
        message: message,
        created: new Date(),
      });

      actor.send({ type: "CORRECT_ANSWER" });

      const snapshot = actor.getSnapshot();
      const meta = snapshot.getMeta();
      console.log(meta);
      const sendAnswer = meta[`chat.${snapshot.value}`].message;
      console.log(sendAnswer);

      const documentReference = sessionDocumentReference
        .collection("chat")
        .doc();
      await documentReference.set({
        id: documentReference.id,
        sender: "Tim",
        message: sendAnswer,
        created: new Date(),
      });

      await sessionDocumentReference.update({
        state: JSON.stringify(actor.getPersistedSnapshot()),
      });
    } catch (e) {
      console.log("error", e);
    }
  }
}

export const apiService = new ApiService();
