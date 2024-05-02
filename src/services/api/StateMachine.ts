import { assign, createMachine } from "xstate";

type Context = {
  answer: string;
};

export const stateMachine = createMachine({
  id: "chat",
  initial: "stage1",
  context: {
    answer: "",
    helpLevel: 0,
  },
  states: {
    stage1: {
      on: {
        CORRECT_ANSWER: {
          target: "stage2",
          actions: assign({
            answer: ({ event }) =>
              "Richtig! Nächste Frage: (Stage 2) Nenne die Hauptstadt von Deutschland.",
            helpLevel: () => 0,
          }),
        },
        WRONG_ANSWER: {
          actions: assign({
            answer: ({ event }) =>
              "Das war leider falsch. Versuchen Sie es nochmal: Was ist 2+2?", // Nachricht für falsche Antwort
          }),
        },
        HELP: {
          actions: assign({
            answer: ({ event }) => {
              console.log("inside help: event", event.helpLevel);
              return [
                "Hilfe der Stufe 1",
                "Stufe 2",
                "Stufe 3",
                "Stufe 4",
                "Stufe 5",
              ][event.helpLevel && event.helpLevel >= 0 ? event.helpLevel : 0];
            },
            helpLevel: ({ event }) => {
              const helpLevel = event.helpLevel ? event.helpLevel : 0;
              console.log("helplevel event", helpLevel);
              helpLevel;
              return helpLevel < 4 ? helpLevel + 1 : helpLevel;
            },
          }),
        },
      },
      meta: {
        helpLevel: 0,
      },
    },
    stage2: {
      on: {
        CORRECT_ANSWER: {
          target: "stage3",
          actions: assign({
            answer: ({ event }) =>
              "Richtig. Die Hauptstadt ist Berlin. Wie ist mein Name?",
            helpLevel: () => 0,
          }),
        },
        WRONG_ANSWER: {
          target: "stage2",
          actions: assign({
            answer: ({ event }) =>
              "Das war leider falsch. Versuchen Sie es nochmal: Wie heißt die Hauptstadt von Deutschland?",
          }),
        },
        HELP: {
          actions: assign({
            answer: ({ event }) => {
              console.log("inside help: event", event.helpLevel);
              return [
                "Hilfe der Stufe 1",
                "Stufe 2",
                "Stufe 3",
                "Stufe 4",
                "Stufe 5",
              ][event.helpLevel && event.helpLevel >= 0 ? event.helpLevel : 0];
            },
            helpLevel: ({ event }) => {
              const helpLevel = event.helpLevel ? event.helpLevel : 0;
              console.log("helplevel event", helpLevel);
              helpLevel;
              return helpLevel < 4 ? helpLevel + 1 : helpLevel;
            },
          }),
        },
      },
      meta: {
        helpLevel: 0,
      },
    },
    stage3: {
      on: {
        CORRECT_ANSWER: {
          target: "success",
          actions: assign({
            answer: ({ event }) => "Richtig! Geschafft",
            helpLevel: () => 0,
          }),
        },
        WRONG_ANSWER: {
          target: "stage3",
          actions: assign({
            answer: ({ event }) =>
              "Nein, das ist nicht mein Name. Versuch es nochmal",
          }),
        },
        HELP: {
          actions: assign({
            answer: ({ event }) => {
              console.log("inside help: event", event.helpLevel);
              return [
                "Hilfe der Stufe 1",
                "Stufe 2",
                "Stufe 3",
                "Stufe 4",
                "Stufe 5",
              ][event.helpLevel && event.helpLevel >= 0 ? event.helpLevel : 0];
            },
            helpLevel: ({ event }) => {
              const helpLevel = event.helpLevel ? event.helpLevel : 0;
              console.log("helplevel event", helpLevel);
              helpLevel;
              return helpLevel < 4 ? helpLevel + 1 : helpLevel;
            },
          }),
        },
      },
      meta: {
        helpLevel: 0,
      },
    },
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
