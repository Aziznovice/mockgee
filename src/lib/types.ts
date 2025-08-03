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
  imageUrl?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface TestSubject {
  id: string;
  name: string;
  tags: string[];
  questionCount: number;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  allQuestionIds: string[]; 
  
  // New structure for creating tests
  subjects?: TestSubject[];
  tags?: string[];
  questionCount?: number;
}

export type UserAnswers = Record<string, string>;

// A TestSession represents a specific instance of a test being taken
// with a specific set of questions.
export interface TestSession {
    id: string;
    testId: string;
    questionIds: string[];
    startedDate: string;
}

export interface TestAttempt {
    id: string;
    sessionId: string; // Links to TestSession instead of Test
    startedDate: string;
    completedDate: string;
    score: number;
    totalQuestions: number;
    status: 'completed' | 'in-progress';
    answers?: UserAnswers;
    duration?: string;
}
