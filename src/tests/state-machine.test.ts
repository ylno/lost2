import { describe, expect, it } from "@jest/globals";
import { createActor } from "xstate";
import { stateMachine } from "@/services/api/StateMachine";

describe("test state machine", () => {
  it("initialization", () => {
    const actor = createActor(stateMachine);
    actor.start();
    actor.send({ type: "CORRECT_ANSWER" });

    const snapshot = actor.getSnapshot();
    const meta = snapshot.getMeta();
    console.log("context", snapshot.context);
    const sendAnswer = snapshot.context.answer;
    expect(sendAnswer).toBe(
      "Richtig! Nächste Frage: (Stage 2) Nenne die Hauptstadt von Deutschland.",
    );
  });

  it("wrong answer", () => {
    const actor = createActor(stateMachine);
    actor.start();
    actor.send({ type: "WRONG_ANSWER" });

    const snapshot = actor.getSnapshot();
    const sendAnswer = snapshot.context.answer;
    expect(sendAnswer).toBe(
      "Das war leider falsch. Versuchen Sie es nochmal: Was ist 2+2?",
    );
  });

  it("help message", () => {
    const actor = createActor(stateMachine);
    actor.start();
    actor.send({ type: "HELP", helpLevel: 0 });

    const snapshot = actor.getSnapshot();
    console.log("context", snapshot.context);
    const sendAnswer = snapshot.context.answer;
    expect(sendAnswer).toBe("Hilfe der Stufe 1");
    expect(snapshot.context.helpLevel).toEqual(1);
  });
});
