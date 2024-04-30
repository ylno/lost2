import { createMachine } from "xstate";

export const stateMachine = createMachine({
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
        message: "Leider war die letzte Antwort falsch. Versuche es nochmal!",
      },
    },
  },
});
