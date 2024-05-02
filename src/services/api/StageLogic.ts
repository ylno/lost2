type AnswerType = string | GeolocationPosition;

export interface StageCheck {
  checkCorrectAnswer(answer: AnswerType): boolean;
}

class StringCheck implements StageCheck {
  private correctAnswer: string;
  constructor(correctAnswer: string) {
    this.correctAnswer = correctAnswer;
  }
  checkCorrectAnswer(answer: string): boolean {
    return answer === this.correctAnswer;
  }
}

class GeolocationCheck implements StageCheck {
  private geolocationPosition: GeolocationPosition;
  constructor(geolocationPosition: GeolocationPosition) {
    this.geolocationPosition = geolocationPosition;
  }
  checkCorrectAnswer(answer: string): boolean {
    return (
      answer ===
      `${this.geolocationPosition.coords.latitude} ${this.geolocationPosition.coords.longitude}`
    );
  }
}

export const stageChecks: { [key: string]: StageCheck } = {
  stage1: new StringCheck("4"),
  stage2: new StringCheck("Berlin"),
  stage3: new StringCheck("Tim"),
  success: {
    checkCorrectAnswer(answer: string): boolean {
      return true;
    },
  },
};

interface Stage {
  state: string;
  checkInput: StageCheck;
  target: string;
  messageCorrect: string;
  messageWrong: string;
  helpMessages: string[];
}

export const StateMachineDefinition: Stage[] = [
  {
    state: "stage1",
    checkInput: new StringCheck("4"),
    target: "stage2",
    messageCorrect:
      "Richtig! Nächste Frage: (Stage 2) Nenne die Hauptstadt von Deutschland.",
    messageWrong: "Das war leider falsch. Versuche es nochmal: Was ist 2+2?",
    helpMessages: [
      "Stage1 Hilfe der Stufe 1",
      "Stage1 Stufe 2",
      "Stage1 Stufe 3",
      "Stage1 Stufe 4",
      "Stage1 Stufe 5",
    ],
  },
  {
    state: "stage2",
    checkInput: new StringCheck("Berlin"),
    target: "stage3",
    messageCorrect: "Richtig. Die Hauptstadt ist Berlin. Wie ist mein Name?",
    messageWrong:
      "Das war leider falsch. Versuche es nochmal: Wie heißt die Hauptstadt von Deutschland?",
    helpMessages: [
      "Stage2 Hilfe der Stufe 1",
      "Stage2 Stufe 2",
      "Stage2 Stufe 3",
      "Stage2 Stufe 4",
      "Stage2 Stufe 5",
    ],
  },

  {
    state: "stage3",
    checkInput: new StringCheck("Tim"),
    target: "success",
    messageCorrect: "Richtig! Geschafft",
    messageWrong: "Nein, das ist nicht mein Name. Versuch es nochmal",
    helpMessages: [
      "Stage3 Hilfe der Stufe 1",
      "Stage3 Stufe 2",
      "Stage3 Stufe 3",
      "Stage3 Stufe 4",
      "Stage3 Stufe 5",
    ],
  },
];
