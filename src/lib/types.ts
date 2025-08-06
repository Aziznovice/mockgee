export interface Choice {
  id: string;
  text: string;
}

export interface Question {
  id:string;
  text: string;
  choices: Choice[];
  correctChoiceId: string;
  explanation: string;
  tags: string[];
  imageUrl?: string;
  groupId?: string; // Add groupId to associate with a QuestionGroup
}

// New Type: A group of questions that share a common reference
export interface QuestionGroup {
  id: string;
  referenceText?: string;
  referenceImageUrl?: string;
  questionIds: string[];
}

export interface Tag {
  id: string;
  name: string;
  questionCount?: number;
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
  duration?: number; // Duration in minutes
  
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
}
