import { assign, createMachine } from "xstate";
import { StateMachineDefinition } from "@/services/api/StageLogic";

type StateDefinition = {
  [key: string]: {
    on: {
      CORRECT_ANSWER: { target: string; actions: any };
      WRONG_ANSWER: { actions: any };
      HELP: { actions: any };
    };
    meta: { helpLevel: number };
  };
};

const states = StateMachineDefinition.reduce((acc, state) => {
  acc[state.state] = {
    on: {
      CORRECT_ANSWER: {
        target: state.target,
        actions: assign({
          answer: ({ event }) => state.messageCorrect,
          helpLevel: () => 0,
        }),
      },
      WRONG_ANSWER: {
        actions: assign({
          answer: ({ event }) => state.messageWrong,
        }),
      },
      HELP: {
        actions: assign({
          answer: ({ event }) => {
            console.log("inside help: event", event.helpLevel);
            return state.helpMessages[
              event.helpLevel && event.helpLevel >= 0 ? event.helpLevel : 0
            ];
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
  };
  return acc;
}, {} as StateDefinition);

export const stateMachine = createMachine({
  id: "chat",
  initial: "stage1",
  context: {
    answer: "",
    helpLevel: 0,
  },
  states: {
    ...states,

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
