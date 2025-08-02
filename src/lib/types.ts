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
