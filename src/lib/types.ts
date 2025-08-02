export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  questionIds: string[];
  imageUrl: string;
}

export type UserAnswers = Record<string, string>;

export interface TestAttempt {
    id: string;
    testId: string;
    date: string;
    score: number;
    totalQuestions: number;
    status: 'completed' | 'in-progress';
    answers?: UserAnswers;
}
