import { describe, expect, it } from "@jest/globals";
import { createActor } from "xstate";
import { stateMachine } from "@/services/api/StateMachine";

describe("test state machine", () => {
  it("initialization", () => {
    const actor = createActor(stateMachine);
    actor.send({ type: "CORRECT_ANSWER" });

    const snapshot = actor.getSnapshot();
    const meta = snapshot.getMeta();
    console.log(meta);
    const sendAnswer = meta[`chat.${snapshot.value}`].message;
    expect(sendAnswer).toBe("Willkommen im Chat! (Stage 1) Was ist 2+2?");
  });
});
