type AnswerType = string | GeolocationPosition;

export interface StageCheck {
  checkCorrectAnswer(answer: string): boolean;
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
