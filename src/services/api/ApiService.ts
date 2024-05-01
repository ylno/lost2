import { firestore } from "@/lib/backend/FirebaseAdmin";
import { createActor, createMachine } from "xstate";
import { CacheSession } from "@/types/types";
import { stateMachine } from "@/services/api/StateMachine";
import { stageChecks } from "@/services/api/StageLogic";

export class ApiService {
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
    const countActor = createActor(stateMachine).start();

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
        message: `Hallo, mein Name ist Tim. Meine Schwester ist entführt worden. Kannst du mir helfen sie zu finden? Hast du noch Freunde, die uns bei der Suche helfen können? Gib ihnen den Einstiegscode "${documentReference.id}" weiter, damit Sie hier untertützen können.\nWas ist 2+2?`,
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

      const actor = createActor(stateMachine, {
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

      const snapshotBefore = actor.getSnapshot();
      if (message.toLowerCase() === "hilfe") {
        console.log("HILFE");
        actor.send({ type: "HELP" });
      } else if (
        stageChecks[`${snapshotBefore.value}`].checkCorrectAnswer(message)
      ) {
        console.log("Correct answer");
        actor.send({ type: "CORRECT_ANSWER" });
      } else {
        console.log("wrong answer");
        actor.send({ type: "WRONG_ANSWER" });
      }

      const snapshot = actor.getSnapshot();
      const sendAnswer = snapshot.context.answer;
      console.log("will send this answer: ", sendAnswer);

      const documentReference = sessionDocumentReference
        .collection("chat")
        .doc();
      await documentReference.set({
        id: documentReference.id,
        sender: "Tim",
        message: sendAnswer || "Error",
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
