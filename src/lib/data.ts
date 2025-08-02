import type { Tag, Question, Test, TestAttempt, TestSession } from './types';

export const tags: Tag[] = [
  { id: 't1', name: 'JavaScript' },
  { id: 't2', name: 'React' },
  { id: 't3', name: 'CSS' },
  { id: 't4', name: 'General Knowledge' },
];

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'What is the output of `typeof null` in JavaScript?',
    choices: [
      { id: 'q1c1', text: 'null' },
      { id: 'q1c2', text: 'object' },
      { id: 'q1c3', text: 'undefined' },
      { id: 'q1c4', text: 'string' },
    ],
    correctChoiceId: 'q1c2',
    explanation: 'This is a historical bug in JavaScript. `typeof null` returns "object" for legacy reasons, though it is a primitive value.',
    tags: ['t1'],
  },
  {
    id: 'q2',
    text: 'Which hook is used to perform side effects in a React functional component?',
    choices: [
      { id: 'q2c1', text: 'useState' },
      { id: 'q2c2', text: 'useContext' },
      { id: 'q2c3', text: 'useEffect' },
      { id: 'q2c4', text: 'useReducer' },
    ],
    correctChoiceId: 'q2c3',
    explanation: '`useEffect` is used for side effects like data fetching, subscriptions, or manually changing the DOM in React components.',
    tags: ['t2'],
  },
  {
    id: 'q3',
    text: 'What does CSS stand for?',
    choices: [
      { id: 'q3c1', text: 'Cascading Style Sheets' },
      { id: 'q3c2', text: 'Creative Style Sheets' },
      { id: 'q3c3', text: 'Computer Style Sheets' },
      { id: 'q3c4', text: 'Colorful Style Sheets' },
    ],
    correctChoiceId: 'q3c1',
    explanation: 'CSS stands for Cascading Style Sheets. It is used to describe the presentation of a document written in a markup language like HTML.',
    tags: ['t3'],
  },
  {
    id: 'q4',
    text: 'What is the capital of Japan?',
    choices: [
      { id: 'q4c1', text: 'Beijing' },
      { id: 'q4c2', text: 'Seoul' },
      { id: 'q4c3', text: 'Tokyo' },
      { id: 'q4c4',text: 'Bangkok' },
    ],
    correctChoiceId: 'q4c3',
    explanation: 'Tokyo is the capital and largest city of Japan.',
    tags: ['t4'],
  },
  {
    id: 'q5',
    text: 'Which CSS property is used to create space between the element\'s border and its content?',
    choices: [
      { id: 'q5c1', text: 'margin' },
      { id: 'q5c2', text: 'padding' },
      { id: 'q5c3', text: 'border-spacing' },
      { id: 'q5c4', text: 'outline' },
    ],
    correctChoiceId: 'q5c2',
    explanation: 'The `padding` property is used to create space around an element\'s content, inside of any defined borders.',
    tags: ['t3'],
  },
];

export const tests: Test[] = [
  {
    id: '1',
    title: 'Web Development Basics',
    description: 'A quick mock test to test your foundational knowledge of web development technologies.',
    allQuestionIds: ['q1', 'q2', 'q3', 'q5'],
    imageUrl: 'https://placehold.co/600x400',
  },
  {
    id: '2',
    title: 'General Knowledge Challenge',
    description: 'How well do you know the world? Test your general knowledge with these questions.',
    allQuestionIds: ['q4'],
    imageUrl: 'https://placehold.co/600x400',
  },
];

export const testSessions: TestSession[] = [
    // Two different sessions for the same test topic
    { id: 's1', testId: '1', questionIds: ['q1', 'q2', 'q3', 'q5'], startedDate: '2024-07-18T09:00:00Z' },
    { id: 's2', testId: '1', questionIds: ['q5', 'q1', 'q2', 'q3'], startedDate: '2024-07-21T11:00:00Z' },
    { id: 's3', testId: '2', questionIds: ['q4'], startedDate: '2024-07-19T14:30:00Z' },
    // A session that is still in progress
    { id: 's4', testId: '2', questionIds: ['q4'], startedDate: '2024-07-22T11:00:00Z' },
];

export const testAttempts: TestAttempt[] = [
    // Attempts for session 1
    { id: 'att1', sessionId: 's1', date: '2024-07-18T09:00:00Z', score: 2, totalQuestions: 4, status: 'completed' },
    { id: 'att2', sessionId: 's1', date: '2024-07-20T10:00:00Z', score: 3, totalQuestions: 4, status: 'completed' },
    // Attempt for session 2
    { id: 'att3', sessionId: 's2', date: '2024-07-21T11:00:00Z', score: 4, totalQuestions: 4, status: 'completed' },
    // Attempt for session 3
    { id: 'att4', sessionId: 's3', date: '2024-07-19T14:30:00Z', score: 1, totalQuestions: 1, status: 'completed' },
    // In-progress attempt for session 4
    { id: 'att5', sessionId: 's4', date: '2024-07-22T11:00:00Z', score: 0, totalQuestions: 1, status: 'in-progress', answers: {} },
];


export const getTestById = (id: string) => tests.find(t => t.id === id);
export const getSessionById = (id: string) => testSessions.find(s => s.id === id);

// This function now needs a session ID
export const getQuestionsForSession = (sessionId: string) => {
    const session = getSessionById(sessionId);
    if (!session) return [];
    return questions.filter(q => session.questionIds.includes(q.id));
}

// In a real app, you'd generate a new session. For now, we'll just find the first one.
export const getOrCreateTestSession = (testId: string): TestSession | undefined => {
    // This logic is for demonstration. A real implementation would create a new session.
    return testSessions.find(s => s.testId === testId);
}


export const getQuestionsForTest = (testId: string) => {
    const test = getTestById(testId);
    if (!test) return [];
    // This is simplified. In reality, you'd use a session's questionIds.
    return questions.filter(q => test.allQuestionIds.includes(q.id));
}

export const getTestAttemptsForUser = () => {
    return testAttempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getSessionsForUser = () => {
    return testSessions.sort((a,b) => new Date(b.startedDate).getTime() - new Date(a.startedDate).getTime());
}

export const getAttemptsForSession = (sessionId: string) => {
    return testAttempts.filter(a => a.sessionId === sessionId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
