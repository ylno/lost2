import { firestore } from "@/lib/FirebaseAdmin";
import { assign, createActor, createMachine, StateMachine } from "xstate";

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
  async getText() {
    await firestore
      .collection("cache-sessions")
      .doc()
      .set({ key1: "test1", created: new Date() });

    return "text from api";
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

    await firestore
      .collection("cache-sessions")
      .doc()
      .set({
        created: new Date(),
        state: JSON.stringify(countActor.getPersistedSnapshot()),
        chatConversation: [],
      });

    console.log(JSON.stringify(countActor.getPersistedSnapshot()));
  }
}

export const apiService = new ApiService();
