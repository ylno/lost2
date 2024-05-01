import { assign, createMachine } from "xstate";

type Context = {
  answer: string;
};

export const stateMachine = createMachine({
  id: "chat",
  initial: "stage1",
  context: {
    answer: "",
  },
  states: {
    stage1: {
      on: {
        CORRECT_ANSWER: {
          target: "stage2",
          actions: assign({
            answer: ({ event }) =>
              "Richtig! Nächste Frage: (Stage 2) Nenne die Hauptstadt von Deutschland.",
          }),
        },
        WRONG_ANSWER: {
          actions: assign({
            answer: ({ event }) =>
              "Das war leider falsch. Versuchen Sie es nochmal: Was ist 2+2?", // Nachricht für falsche Antwort
          }),
        },
      },
    },
    stage2: {
      on: {
        CORRECT_ANSWER: {
          target: "stage3",
          actions: assign({
            answer: ({ event }) =>
              "Richtig. Die Hauptstadt ist Berlin. Wie ist mein Name?",
          }),
        },
        WRONG_ANSWER: {
          target: "stage2",
          actions: assign({
            answer: ({ event }) =>
              "Das war leider falsch. Versuchen Sie es nochmal: Wie heißt die Hauptstadt von Deutschland?",
          }),
        },
      },
    },
    stage3: {
      on: {
        CORRECT_ANSWER: {
          target: "success",
          actions: assign({
            answer: ({ event }) => "Richtig! Geschafft",
          }),
        },
        WRONG_ANSWER: {
          target: "stage3",
          actions: assign({
            answer: ({ event }) =>
              "Nein, das ist nicht mein Name. Versuch es nochmal",
          }),
        },
      },
    },
    // stage1: {
    //   on: {
    //     CORRECT_ANSWER: "stage2",
    //     WRONG_ANSWER: "stage1",
    //   },
    //   meta: {
    //     message: "Willkommen im Chat! (Stage 1) Was ist 2+2?",
    //   },
    // },

    success: {
      type: "final",
      meta: {
        answer: "Glückwunsch! Alle Antworten waren richtig.",
      },
    },
    failure: {
      type: "final",
      meta: {
        answer: "Leider war die letzte Antwort falsch. Versuche es nochmal!",
      },
    },
  },
});
